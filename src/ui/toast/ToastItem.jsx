export default function ToastItem({ toast, onClose }) {
  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div
      className={`min-w-[250px] px-4 py-3 rounded-xl shadow-lg text-white 
      dark:shadow-black/50 
      slide-in 
      ${typeStyles[toast.type]}`}
    >
      <div className="flex justify-between items-center">
        <span>{toast.message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-sm font-bold opacity-80 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
