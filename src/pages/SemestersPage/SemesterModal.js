import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { PlusSquareDotted, PencilFill } from 'react-bootstrap-icons';
import {useSemesterCreateMutation, useSemesterUpdateMutation} from "../../store/api/semesters";
import {notificationActions} from "../../store/notification/notification-slice";
import {useDispatch} from "react-redux";

function SemesterModal({ isEdit = false, data = {} }) {
    const [term, setTerm] = useState(data?.term);
    const [year, setYear] = useState(data?.year);
    const dispatch = useDispatch();

    const [update] = useSemesterUpdateMutation();
    const [create] = useSemesterCreateMutation();


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const save = async () => {
        let response = null;
        if (data?.id) {
            const payload = {
                id: data.id,
                term,
                year
            };
            response = await update(payload);
        } else {
            const payload = {
                term,
                year
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
                {isEdit ? <PencilFill size={15}></PencilFill> : <PlusSquareDotted size={20} />}
                <span className="d-none d-md-block" >{isEdit ? "Düzenle" : "Dönem Ekle"}</span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dönem {isEdit ? "Güncelle" : "Ekle"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="term">
                            <Form.Label>Dönem</Form.Label>
                            <Form.Select aria-label="term" value={term} onChange={(e) => setTerm(e.target.value)}>
                                <option value={0}>Güz</option>
                                <option value={1}>Bahar</option>
                                <option value={2}>Yaz</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="year"
                        >
                            <Form.Label>Yıl</Form.Label>
                            <Form.Control
                                onChange={(e) => setYear(e.target.value)}
                                type="number"
                                value={year || ''}
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

export default SemesterModal;
