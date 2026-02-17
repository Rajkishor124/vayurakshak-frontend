import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import { navigationItems } from "../navigation.config";
import UpgradeModal from "../../shared/components/UpgradeModal";

export default function Sidebar() {
  const { role, subscriptionPlan } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const visibleItems = navigationItems.filter((item) =>
    item.roles.includes(role),
  );

  return (
    <>
      <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8">VayuRakshak</h2>

        <nav className="space-y-3">
          {visibleItems.map((item) => {
            const isLocked = !item.plans.includes(subscriptionPlan);

            return (
              <div key={item.path}>
                {isLocked ? (
                  <button
                    onClick={() => setShowUpgrade(true)}
                    className="w-full text-left px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-700 flex justify-between items-center"
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

      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
      />
    </>
  );
}
