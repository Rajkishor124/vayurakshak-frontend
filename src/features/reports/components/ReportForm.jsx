import { useState } from "react";
import { createReport } from "../services/reportService";
import useToast from "../../../ui/toast/useToast";

export default function ReportForm({ onReportCreated }) {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "MEDIUM",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createReport(formData);

      showToast("Report created successfully ✅", "success");

      setFormData({
        title: "",
        description: "",
        severity: "MEDIUM",
      });

      onReportCreated(); // refresh list
    } catch (err) {
      console.error("Report creation failed:", err);
      // error toast handled globally
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Create Report</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Report Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="severity"
          className="w-full p-2 border rounded"
          value={formData.severity}
          onChange={handleChange}
        >
          <option value="INFO">INFO</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
