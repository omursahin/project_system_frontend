import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { PlusSquareDotted, PencilFill } from 'react-bootstrap-icons';

function ReportModal({ isEdit = false, data = {} }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const save = async () => {
        let response = null;
        if (data?.id) {
            // Güncelleme
            alert("Güncelleme")

        } else {
            // Yeni veri ekleme
            alert("Yeni veri ekleme")
        }

        // if (response.error) {
        //     dispatch(notificationActions.showMessage({
        //         header: "Hata",
        //         message: "Bir hata ile karşılaşıldı...",
        //         variant: "danger"
        //     }));
        // } else {
        //     dispatch(notificationActions.showMessage({
        //         header: "Giriş",
        //         message: "Başarı ile eklendi/güncellendi",
        //         variant: "success"
        //     }));
        // }
        setShow(false);
    };

    return (
        <>
            <Button
                variant={isEdit ? "outline-primary" : "primary"}
                onClick={handleShow}
            >
                {isEdit ? <PencilFill size={15}></PencilFill> : <PlusSquareDotted size={20} />}
                <span className="d-none d-md-block" >{isEdit ? "Düzenle" : "Rapor Ekle"}</span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dönem {isEdit ? "Güncelle" : "Ekle"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="term">
                            <Form.Label>Dönem</Form.Label>
                            <Form.Select aria-label="term" value={data?.term} onChange={(e) => {}}>
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
                                onChange={(e) => {}}
                                type="number"
                                value={data?.year || ''}
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

export default ReportModal;
