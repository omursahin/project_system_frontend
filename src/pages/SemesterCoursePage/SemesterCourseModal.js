import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {PlusSquareDotted, PencilFill} from 'react-bootstrap-icons';
import {FormControl} from "react-bootstrap";
import {
    useReportCreateMutation,
    useReportUpdateMutation,
} from "../../store/api/reports";
import {useDispatch} from "react-redux";
import {notificationActions} from "../../store/notification/notification-slice";
import {useGetAllCoursesQuery} from "../../store/api/courses";
import useGetAllSemesters from "../../store/api/semesters";


function SemesterCourseModal({isEdit = false, SemesterCourseData = {}}) {
    const [year, setYear] = useState(SemesterCourseData?.year);
    const [term, setTerm] = useState(SemesterCourseData?.term?.id);
    const [courses, setCourses] = useState(SemesterCourseData?.courses?.id);
    const [max_group_size, setMax_group_size] = useState(SemesterCourseData?.max_group_size);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const [create] = useReportCreateMutation();
    const [update] = useReportUpdateMutation();

    const save = async () => {
        let response = null;
        if (SemesterCourseData?.id) {
            const payload = {
                id: SemesterCourseData.id,
                year: year,
                term: term,
                courses: courses,
                max_group_size: max_group_size,
            };
            response = await update(payload);
        } else {
            const payload = {
                year,
                term,
                courses,
                max_group_size,
            };
            response = await create(payload);
        }

        if (response.error) {
            dispatch(
                notificationActions.showMessage({
                    header: "Hata",
                    message: "Bir hata ile karşılaşıldı...",
                    variant: "danger"
                })
            );
        } else {
            dispatch(notificationActions.showMessage({
                    header: "Giriş",
                    message: "Başarı ile eklendi/güncellendi",
                    variant: "success"
                })
            );
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
                <span className="d-none d-md-block">{isEdit ? "Düzenle" : "Dönem Dersi Ekle"}</span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dönem Dersi {isEdit ? "Güncelle" : "Ekle"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="year"
                        >
                            <Form.Label>Yıl</Form.Label>
                            <FormControl
                                onChange={(e) => {
                                    setYear(e.target.value)
                                }}
                                type="number"
                                value={year || ''}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="term">
                            <Form.Label>Dönem</Form.Label>
                            <Form.Select aria-label="term"
                                         value={term || ''}
                                         onChange={(e) => {
                                             setTerm(e.target.value)
                                         }}>
                                <option value={0}>Güz</option>
                                <option value={1}>Bahar</option>
                                <option value={2}>Yaz</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="courses">
                            <Form.Label>Ders</Form.Label>
                            <Form.Control
                                aria-label="courses"
                                defaultValue={courses || ''}
                                onChange={(e) => {
                                    setCourses(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="max_group_size">
                            <Form.Label>Kontenjan</Form.Label>
                            <Form.Control
                                onChange={(e) => {
                                    setMax_group_size(e.target.value)
                                }}
                                type="number"
                                value={max_group_size || ''}
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
