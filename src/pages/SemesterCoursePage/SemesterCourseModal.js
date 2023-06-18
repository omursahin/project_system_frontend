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
import {getSemesterType} from "../../helpers/typeConverters";

function SemesterCourseModal({isEdit = false, data = {}}) {

    const [show, setShow] = useState(false);
    const {data: semestersAll} = useGetAllSemestersQuery();
    const {data: coursesAll} = useGetAllCoursesQuery();

    const [term, setTerm] = useState(data?.term);
    const [course, setCourse] = useState(data?.course);

    const [maxGroupSize, setMaxGroupSize] = useState(data?.max_group_size);

    const dispatch = useDispatch();

    const [create] = useSemesterCoursesCreateMutation();
    const [update] = useSemesterCoursesUpdateMutation();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const save = async () => {
        let response = null;
        if (data?.id) {
            const payload = {
                id: data.id,
                semester:term,
                course,
                max_group_size:maxGroupSize
            };

            response = await update(payload);
        } else {
            const payload = {
                semester:term,
                course,
                max_group_size:maxGroupSize
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
                            <Form.Select aria-label="term" value={term}
                                         onChange={(e) => {
                                             setTerm(e.target.value)
                                         }}>
                                {semestersAll?.results.map((semester, index) => (
                                    <option key={index}
                                            value={semester.id}>{semester?.year}-{semester?.year + 1} /
                                        {getSemesterType(semester?.term)}</option>
                                ))}

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="course">
                            <Form.Label>Ders</Form.Label>
                            <Form.Select aria-label="course" value={course}
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
                                          value={maxGroupSize}
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
