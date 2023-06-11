import Button from "react-bootstrap/Button";
import {PencilFill, PlusSquareDotted} from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import {useGetAllGroupsQuery, useGroupCreateMutation} from "../../store/api/groups";
import {notificationActions} from "../../store/notification/notification-slice";
import {useDispatch} from "react-redux";
import {useGetAllSemesterCoursesQuery} from "../../store/api/semester_courses";

function GroupModal({ isEdit = false, groupData = {} }) {
    const { data, isLoading } = useGetAllSemesterCoursesQuery();
    const [create] = useGroupCreateMutation();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState(groupData?.title);
    const [description, setDescription] = useState(groupData?.description);
    const [semester_course, setSemesterCourse] = useState(groupData?.semester_course?.id);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const save = async () => {
        const payload = {
            title,
            description,
            semester_course,
        };
        const response = await create(payload);
        if (response.error) {
            dispatch(
                notificationActions.showMessage({
                    header: "Hata",
                    message: "Bir hata ile karşılaşıldı...",
                    variant: "danger",
                })
            );
        } else {
            dispatch(
                notificationActions.showMessage({
                    header: "Giriş",
                    message: "Başarı ile eklendi/güncellendi",
                    variant: "success",
                })
            );
        }
        setShow(false);
        console.log('data',data.results)
    }
    return (
        <>
            <Button
                className="mt-1 mx-auto"
                variant={isEdit ? "outline-primary" : "secondary"}
                onClick={handleShow}
            >
                {isEdit ? <PencilFill size={15}></PencilFill> : <PlusSquareDotted size={20} />}
                <span className="d-none d-md-block" >Grup Ekle</span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Grup Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="semester_course">
                            <Form.Label>SemesterCourse</Form.Label>
                            <Form.Select
                                aria-label="semester_course"
                                defaultValue={semester_course && semester_course}
                                onChange={(e) => setSemesterCourse(e.target.value)}
                            >

                                {!isLoading ? (
                                    <>
                                        <option value="">Lütfen Değer seçiniz</option>

                                        {data?.results.map((item, index) => (
                                            <option key={index} value={item.id}>
                                                {item.semester.year} - {item.semester.year + 1} /{" "}
                                                {item.course.title}
                                            </option>
                                        ))}
                                    </>
                                ) : null}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Başlık</Form.Label>
                            <Form.Control
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                value={title || ""}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Açıklama</Form.Label>
                            <Form.Control
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                defaultValue={description || ""}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={save}>
                        Ekle
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default GroupModal;