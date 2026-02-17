import { useState, useCallback } from "react";
import { ToastContext } from "./ToastContext";
import ToastContainer from "./ToastContainer";
import { registerToast } from "./toast-bridge";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => removeToast(id), 4000);
  }, []);

  // 🔥 Register global toast access
  registerToast(showToast);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
