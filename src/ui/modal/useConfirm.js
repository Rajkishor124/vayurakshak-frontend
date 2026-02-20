import { useCallback } from "react";
import useModal from "./useModal";
import ConfirmModal from "./ConfirmModal";

const VARIANT_STYLES = {
  danger: {
    button: "bg-red-600 hover:bg-red-700",
    icon: "🗑️",
  },
  info: {
    button: "bg-blue-600 hover:bg-blue-700",
    icon: "ℹ️",
  },
  success: {
    button: "bg-green-600 hover:bg-green-700",
    icon: "✅",
  },
};

export default function useConfirm() {
  const { openModal, closeModal } = useModal();

  const confirm = useCallback(
    (options = {}) => {
      return new Promise((resolve) => {
        const {
          type = "danger",
          title = "Confirm Action",
          message = "Are you sure?",
          confirmText = "Confirm",
          cancelText = "Cancel",
        } = options;

        const variant = VARIANT_STYLES[type] || VARIANT_STYLES.danger;

        openModal({
          content: ConfirmModal({
            isOpen: true,
            title,
            message,
            icon: variant.icon,
            confirmText,
            cancelText,
            confirmClass: variant.button,
            onConfirm: () => {
              closeModal();
              resolve(true);
            },
            onCancel: () => {
              closeModal();
              resolve(false);
            },
          }),
        });
      });
    },
    [openModal, closeModal],
  );

  return confirm;
}
