import Modal from "./Modal";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  icon,
  confirmText,
  cancelText,
  confirmClass,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <p className="mt-3 text-gray-600">{message}</p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          {cancelText}
        </button>

        <button
          onClick={onConfirm}
          className={`px-4 py-2 text-white rounded transition ${confirmClass}`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
