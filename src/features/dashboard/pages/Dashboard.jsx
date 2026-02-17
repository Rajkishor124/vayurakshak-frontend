import { useEffect, useState } from "react";
import { fetchDashboard } from "../services/dashboardService";
import { getSeverityStyles } from "../../../shared/utils/severityUtils";
import FeatureGate from "../../../shared/components/FeatureGate";
import RiskTrendChart from "../components/RiskTrendChart";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const dashboardData = await fetchDashboard();
        setData(dashboardData);
      } catch (err) {
        // No manual toast here.
        // Axios interceptor already shows global error toast.
        console.error("Dashboard load failed:", err);
      }
    };

    loadDashboard();
  }, []);

  if (!data) {
    return null;
    // Global loader already shows spinner
  }

  const trendData = [
    { day: "Mon", risk: 45 },
    { day: "Tue", risk: 52 },
    { day: "Wed", risk: 38 },
    { day: "Thu", risk: 60 },
    { day: "Fri", risk: 49 },
    { day: "Sat", risk: 70 },
    { day: "Sun", risk: 58 },
  ];

  return (
    <div className="p-6 space-y-6 fade-in">
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <h2 className="text-xl font-bold">{data.organizationName}</h2>
        <p className="text-gray-600">{data.city}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">Current AQI</h3>
          <p className="text-3xl font-bold">{data.currentAqi}</p>
          <p>{data.aqiLevel}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">Risk Score</h3>
          <p className="text-3xl font-bold">{data.riskScore}</p>
          <p>{data.riskCategory}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Alerts</h3>
        {data.alerts?.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded ${getSeverityStyles(alert.severity)}`}
          >
            <h4 className="font-bold">{alert.title}</h4>
            <p>{alert.message}</p>
          </div>
        ))}
      </div>

      <FeatureGate requiredPlan="PRO" showLock>
        <RiskTrendChart data={trendData} />
      </FeatureGate>

      <FeatureGate requiredPlan="ENTERPRISE">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold">Predictive Insight</h3>
          <p>{data.predictiveInsight}</p>
        </div>
      </FeatureGate>
    </div>
  );
}
