import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { PlusSquareDotted } from 'react-bootstrap-icons';
import { notificationActions } from "../../store/notification/notification-slice";
import { useDispatch } from "react-redux";
import { useGroupMemberCreateMutation } from '../../store/api/group_members';

function GroupMemberAddModal({ groupId }) {
    // TODO: Fetch users from API
    const users = [{ name: "test", id: 1 }, { name: "test2", id: 2 }];

    const [memberId, setMemberId] = useState(null);
    const dispatch = useDispatch();

    const [create] = useGroupMemberCreateMutation();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const add = async () => {
        let response = null;

        const payload = {
            memberId,
            groupId
        };

        response = await create(payload);


        if (response.error) {
            dispatch(notificationActions.showMessage({
                header: "Hata",
                message: "Bir hata ile karşılaşıldı...",
                variant: "danger"
            }));
        } else {
            dispatch(notificationActions.showMessage({
                header: "Giriş",
                message: "Başarı ile eklendi",
                variant: "success"
            }));
        }
        setShow(false);
    };

    return (
        <>
            <Button
                variant={"primary"}
                onClick={handleShow}
                size={'sm'}
            >
                <PlusSquareDotted size={20} />
                <span className="d-none d-md-block" >Grup Üyesi Ekle</span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Grup Üyesi Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="groupMemberId">
                            <Form.Label>Kullanıcı</Form.Label>
                            <Form.Select aria-label="groupMemberId" value={memberId} onChange={(e) => setMemberId(e.target.value)}>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={add}>
                        Ekle
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default GroupMemberAddModal;
