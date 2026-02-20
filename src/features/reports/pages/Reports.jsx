import { useEffect, useState } from "react";
import { fetchReports } from "../services/reportService";
import ReportForm from "../components/ReportForm";
import ReportsList from "../components/ReportsList";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadReports = async () => {
      try {
        const data = await fetchReports(page, 5);
        if (isMounted) {
          setReports(data.content || data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadReports();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const reloadReports = async () => {
    const data = await fetchReports(page, 5);
    setReports(data.content || data);
  };

  const handleDeleteOptimistic = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <ReportForm onReportCreated={reloadReports} />

      <ReportsList reports={reports} onDelete={handleDeleteOptimistic} />

      <div className="flex justify-between pt-4">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
