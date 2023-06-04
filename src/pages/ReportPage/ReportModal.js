    import React, { useState,useEffect } from 'react';
    import Button from 'react-bootstrap/Button';
    import Form from 'react-bootstrap/Form';
    import Modal from 'react-bootstrap/Modal';
    import { PlusSquareDotted, PencilFill } from 'react-bootstrap-icons';
    import { useReportCreateMutation, useReportUpdateMutation } from "../../store/api/reports";
    import { notificationActions } from "../../store/notification/notification-slice";
    import { useDispatch } from "react-redux";

    function ReportModal({ isEdit = false, data = {} }) {
        const [title, setTitle] = useState(data?.title);
        const [description, setDescription] = useState(data?.description );
        const [isFinal, setisFinal] = useState(data?.isFinal);
        const [isPublic, setisPublic] = useState(data?.isPublic);
        const dispatch = useDispatch();

        const [update] = useReportUpdateMutation();
        const [create] = useReportCreateMutation();

        const [show, setShow] = useState(false);
        useEffect(() => {
            console.log(data)
         }, []);
           
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const save = async () => {
            let response = null;
            if (data?.id) {
                const payload = {
                    id: data.id,
                    title,
                    description,
                    isFinal,
                    isPublic
                };
                console.log(payload)
             
                
                response = await update(payload);
            } else {
                const payload = {
                    title,
                    description,
                    isFinal,
                    isPublic
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
                    <span className="d-none d-md-block" >{isEdit ? "Düzenle" : "Rapor Ekle"}</span>
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Dönem {isEdit ? "Güncelle" : "Ekle"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            
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
                                    defaultValue={description || ''}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="isFinal">
  <Form.Check
    type="checkbox"
    label="Final"
    checked={isFinal || false}
    onChange={(e) => setisFinal(e.target.checked)}
    defaultChecked={isFinal || false}
    
  />
</Form.Group>

<Form.Group className="mb-3" controlId="isPublic">
  <Form.Check
    type="checkbox"
    label="Genel"
    checked={isPublic || false}
    onChange={(e) => setisPublic(e.target.checked)}
    defaultChecked={isPublic || false}

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
