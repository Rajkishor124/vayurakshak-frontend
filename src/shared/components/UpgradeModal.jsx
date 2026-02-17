export default function UpgradeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Upgrade Required</h2>
        <p className="text-gray-600 mb-6">
          This feature is available in higher subscription plans.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
