import { useEffect, useRef, useState } from "react";

export default function Modal({
  isOpen,
  children,
  onClose,
  closeOnOutsideClick = true,
  closeOnEsc = true,
}) {
  const [visible, setVisible] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setTimeout(() => setVisible(false), 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (!closeOnOutsideClick) return;
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      onMouseDown={handleBackdropClick}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${
        visible ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"
      }`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-xl shadow-xl w-full max-w-md p-6 transform transition-all duration-200 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}