import { useState, useCallback } from "react";
import Modal from "./Modal";
import { ModalContext } from "./ModalContext";

export default function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);

  const openModal = useCallback(({ content }) => {
    setModalContent(() => content);
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Modal isOpen={!!modalContent} onClose={closeModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
}
