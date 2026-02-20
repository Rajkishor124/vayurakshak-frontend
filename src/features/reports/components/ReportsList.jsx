import { deleteReport } from "../services/reportService";
import { getSeverityStyles } from "../../../shared/utils/severityUtils";
import useToast from "../../../ui/toast/useToast";
import useConfirm from "../../../ui/modal/useConfirm";

export default function ReportsList({ reports, onDelete }) {
  const { showToast } = useToast();
  const confirm = useConfirm();

  const handleDelete = async (id) => {
    const confirmed = await confirm({
      title: "Delete Report",
      message: "This action cannot be undone.",
    });

    if (!confirmed) return;

    try {
      await deleteReport(id);
      showToast("Report deleted successfully 🗑️", "success");
      onDelete(id);
    } catch (err) {
      console.error(err);
    }
  };

  if (!reports || reports.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">No reports available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className={`p-4 rounded shadow flex justify-between items-start ${getSeverityStyles(
            report.severity,
          )}`}
        >
          <div>
            <h3 className="font-bold">{report.title}</h3>
            <p>{report.description}</p>
            <p className="text-sm mt-2">Severity: {report.severity}</p>
          </div>

          <button
            onClick={() => handleDelete(report.id)}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
