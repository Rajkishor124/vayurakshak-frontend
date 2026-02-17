import { useAuth } from "../../context/auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout, subscriptionPlan, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">VayuRakshak</h1>

      <div className="flex items-center gap-4">
        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
          {subscriptionPlan}
        </span>

        <span className="text-sm text-gray-600">{role}</span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
