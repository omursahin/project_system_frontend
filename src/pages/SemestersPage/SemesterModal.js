import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { PlusSquareDotted, PencilFill } from 'react-bootstrap-icons';

function SemesterModal({ isEdit = false, data = {} }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const save = () => {
        if (data?.id) {
            // TODO: Update
            alert('Update');
        } else {
            // TODO: Create
            alert('Save');
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
                            <Form.Select aria-label="term" value={data.term} onChange={(e) => { }}>
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
                                onChange={(e) => { }}
                                type="number"
                                value={data.year || ''}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={save}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SemesterModal;
