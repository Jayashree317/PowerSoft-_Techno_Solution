import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalWrapper = ({ title, show, onHide, children }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
  </Modal>
);

export default ModalWrapper;
