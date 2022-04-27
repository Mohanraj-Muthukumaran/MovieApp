import React from "react";
import { useState } from "react";
import Form from "./Form";
import Modal, { ModalBody, ModalHeader } from "../Modal/Modal";
import "./styles.css";

const FormButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className='add-button' onClick={() => setShowModal(true)}>
        ADD MOVIE
      </button>
      <Modal
        show={showModal}
        setShow={setShowModal}
        // hideCloseButton
      >
        <ModalHeader>
          <h3>Enter Movie Details</h3>
        </ModalHeader>
        <ModalBody>
          <Form close={() => setShowModal(false)} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FormButton;
