import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">VayuRakshak</h1>
          <p className="text-gray-500 text-sm">
            Multi-Tenant Air Intelligence Platform
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
