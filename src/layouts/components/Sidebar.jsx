import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { navigationItems } from "../navigation.config";
import useModal from "../../ui/modal/useModal";

export default function Sidebar() {
  const { role, subscriptionPlan } = useAuth();
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const visibleItems = navigationItems.filter((item) =>
    item.roles.includes(role),
  );

  const showUpgradeModal = () => {
    openModal({
      content: (
        <>
          <h2 className="text-xl font-semibold">Upgrade Required</h2>

          <p className="text-gray-600 mt-3">
            This feature is not available in your current plan.
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={closeModal} className="px-4 py-2 border rounded">
              Cancel
            </button>

            <button
              onClick={() => {
                closeModal();
                navigate("/subscription");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Upgrade Plan
            </button>
          </div>
        </>
      ),
    });
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h2 className="text-xl font-bold mb-8">VayuRakshak</h2>

      <nav className="space-y-3">
        {visibleItems.map((item) => {
          const isLocked = !item.plans.includes(subscriptionPlan);

          return (
            <div key={item.path}>
              {isLocked ? (
                <button
                  onClick={showUpgradeModal}
                  className="w-full text-left px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-700 flex justify-between items-center transition"
                >
                  <span>{item.label}</span>
                  <span className="text-sm">🔒</span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-700 text-slate-300"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
