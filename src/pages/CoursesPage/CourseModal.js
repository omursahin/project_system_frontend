import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { PlusSquareDotted, PencilFill } from 'react-bootstrap-icons';
import {useDispatch} from "react-redux";

import {useCourseCreateMutation, useCourseUpdateMutation} from "../../store/api/courses";
import {notificationActions} from "../../store/notification/notification-slice";

function CourseModal({ isEdit = false, data = {} }) {

    const [code, setCode] = useState(data?.code);
    const [title, setTitle] = useState(data?.title);
    const [description, setDescription] = useState(data?.description);
    const dispatch = useDispatch();

    const [update] = useCourseUpdateMutation();
    const [create] = useCourseCreateMutation();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const save = async () => {
        let response = null;
        if (data?.id) {
            const payload = {
                id: data.id,
                code,
                title,
                description
            };
            response = await update(payload);
        } else {
            const payload = {
                code,
                title,
                description
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
                <span className="d-none d-md-block" >{isEdit ? "Düzenle" : "Ders Ekle"}</span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dönem {isEdit ? "Güncelle" : "Ekle"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group
                            className="mb-3"
                            controlId="code"
                        >
                            <Form.Label>Kod</Form.Label>
                            <Form.Control
                                onChange={(e) => setCode(e.target.value)}
                                type="text"
                                value={code || ''}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="title"
                        >
                            <Form.Label>Başlık</Form.Label>
                            <Form.Control
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                value={title || ''}
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="description"
                        >
                            <Form.Label>Açıklama</Form.Label>
                            <Form.Control
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                value={description || ''}
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

export default CourseModal;
