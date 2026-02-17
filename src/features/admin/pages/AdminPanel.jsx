import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth/useAuth";
import { fetchAdminReports, fetchAdminSummary } from "../services/adminService";
import Pagination from "../../../shared/components/Pagination";

export default function AdminPanel() {
  const { orgId } = useAuth();
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!orgId) return;

    const loadSummary = async () => {
      const response = await fetchAdminSummary(orgId);
      setSummary(response.data);
    };

    loadSummary();
  }, [orgId]);

  useEffect(() => {
    if (!orgId) return;

    const loadReports = async () => {
      const response = await fetchAdminReports(orgId, page, 10);
      setReports(response.data.content);
      setTotalPages(response.data.totalPages);
    };

    loadReports();
  }, [orgId, page]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h4>Total Reports</h4>
            <p className="text-2xl font-bold">{summary.totalReports}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4>High Risk</h4>
            <p className="text-2xl font-bold">{summary.highRiskReports}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4>Critical</h4>
            <p className="text-2xl font-bold">{summary.criticalReports}</p>
          </div>
        </div>
      )}

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Type</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t">
                <td className="p-3">{report.type}</td>
                <td className="p-3">{report.location}</td>
                <td className="p-3">{report.status}</td>
                <td className="p-3">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
