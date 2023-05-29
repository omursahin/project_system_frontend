import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({
  variant = 'danger',
  btn,
  title = 'Onaylıyor musun?',
  body = '',
  closeText = 'Vazgeç',
  confirmText = 'Onayla',
  onClose = () => {},
  onConfirm = () => {},
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant={variant} onClick={() => setShow(true)}>
        {btn}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{body}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => {
              handleClose();
              onClose();
            }}
            variant="secondary"
          >
            {closeText}
          </Button>
          <Button
            onClick={() => {
              handleClose();
              onConfirm();
            }}
            variant="primary"
          >
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
