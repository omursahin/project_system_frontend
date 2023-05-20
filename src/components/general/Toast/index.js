import {Toast, ToastContainer} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export const ToastMessage = () => {

    const notification = useSelector((state) => state.notification.notification);
    const [showMessage, setShowMessage] = useState(true);
    const toggleShowMessage = () => setShowMessage(!showMessage);

    useEffect(() => {
        if(notification){
            setShowMessage(true);
        }
    }, [notification]);

    return notification && (
        <ToastContainer className="p-3" position={`${notification.vertical}-${notification.horizontal}`}>
            <Toast show={showMessage} onClose={toggleShowMessage} bg={notification.variant.toLowerCase()}
                   autohide>
                <Toast.Header closeButton={true}>
                    <strong className="me-auto">{notification.header}</strong>
                </Toast.Header>
                <Toast.Body>{notification.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
