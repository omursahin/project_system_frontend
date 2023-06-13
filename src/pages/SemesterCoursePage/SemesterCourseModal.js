import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {PlusSquareDotted, PencilFill} from 'react-bootstrap-icons';
import {useGetAllSemestersQuery} from "../../store/api/semesters";
import {useGetAllCoursesQuery} from "../../store/api/courses";
import {useDispatch} from "react-redux";
import {notificationActions} from "../../store/notification/notification-slice";
import {FormLabel} from "react-bootstrap";
import {useSemesterCoursesCreateMutation, useSemesterCoursesUpdateMutation} from "../../store/api/semester_courses";

function SemesterCourseModal({isEdit = false, data = {}}) {

    const [show, setShow] = useState(false);
    const {data: semesters} = useGetAllSemestersQuery();
    const {data: coursesAll} = useGetAllCoursesQuery();

    const [term, setTerm] = useState(data?.term);
    const [course, setCourse] = useState(data?.course);
    const [max_group_size, setMaxGroupSize] = useState(data?.max_group_size);

    const dispatch = useDispatch();

    const [create] = useSemesterCoursesCreateMutation();
    const [update] = useSemesterCoursesUpdateMutation();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getSemesterType = (id) => {
        if (id === 0) {
            return "Güz";
        } else if (id === 1) {
            return "Bahar";
        } else if (id === 2) {
            return "Yaz";
        } else {
            return "Tanımsız Dönem";
        }
    }
    const save = async () => {
        let response = null;
        if (data?.id) {
            const payload = {
                id: data.id,
                term,
                course,
                max_group_size
            };
            response = await update(payload);
        } else {
            const payload = {
                term,
                course,
                max_group_size
            };
            response = await create(payload);
        }

        if (response.error) {
            dispatch(notificationActions.showMessage({
                header: "Hata",
                message: "Bir hata ile karşılaşıldı...",
                variant: "danger"
            }));
        } else {
            dispatch(notificationActions.showMessage({
                header: "Giriş",
                message: "Başarı ile eklendi/güncellendi",
                variant: "success"

            }));
        }
        setShow(false);
    };

    return (
        <>
            <Button
                variant={isEdit ? "outline-primary" : "primary"}
                onClick={handleShow}
            >
                {isEdit ? <PencilFill size={15}></PencilFill> : <PlusSquareDotted size={20}/>}
                <span className="d-none d-md-block">{isEdit ? "Düzenle" : "Ders Ekle"}</span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dönem {isEdit ? "Güncelle" : "Ekle"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="term">
                            <Form.Label>Dönem</Form.Label>
                            <Form.Select aria-label="term" value={data?.term}
                                         onChange={(e) => {
                                             setTerm(e.target.value)
                                         }}>
                                {semesters?.results.map((semester, index) => (
                                    <option key={index}
                                            value={semester.id}>{semester?.year}-{semester?.year + 1} /
                                        {getSemesterType(semester?.term)}</option>
                                ))}

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="course">
                            <Form.Label>Ders</Form.Label>
                            <Form.Select aria-label="course" value={data?.course}
                                         onChange={(e) => {
                                             setCourse(e.target.value)
                                         }}>
                                {coursesAll?.results.map((course, index) => (
                                    <option key={index} value={course?.id}>{course?.title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="max_group_size">
                            <FormLabel>Kontenjan</FormLabel>
                            <Form.Control type="number"
                                          value={data?.max_group_size}
                                          onChange={(e) => {
                                              setMaxGroupSize(e.target.value)
                                          }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={save}>
                        {isEdit ? "Güncelle" : "Ekle"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SemesterCourseModal;
