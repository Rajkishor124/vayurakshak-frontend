import { useAuth } from "../../../context/auth/useAuth";
import useToast from "../../../ui/toast/useToast";
import useConfirm from "../../../ui/modal/useConfirm";
import { upgradePlan } from "../services/subscriptionService";

export default function Subscription() {
  const { subscriptionPlan } = useAuth();
  const { showToast } = useToast();
  const confirm = useConfirm();

  const plans = ["FREE", "PRO", "ENTERPRISE"];

  const handleUpgrade = async (plan) => {
    const confirmed = await confirm({
      type: "info",
      title: `Upgrade to ${plan}?`,
      message: `You are about to upgrade your plan to ${plan}.`,
      confirmText: "Upgrade",
    });

    if (!confirmed) return;

    try {
      await upgradePlan(plan);

      showToast(`Upgraded to ${plan} successfully 🎉`, "success");

      window.location.reload(); // refresh token & role
    } catch (err) {
      console.error(err);
      showToast("Upgrade failed", "error");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Subscription Plans</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = subscriptionPlan === plan;

          return (
            <div
              key={plan}
              className={`p-6 rounded-xl shadow border ${
                isCurrent ? "border-blue-600" : ""
              }`}
            >
              <h2 className="text-xl font-semibold">{plan}</h2>

              <p className="mt-2 text-gray-600">
                {plan === "FREE" && "Basic access with limited features."}
                {plan === "PRO" && "Advanced analytics and reporting."}
                {plan === "ENTERPRISE" &&
                  "Full predictive and smart alert access."}
              </p>

              <div className="mt-6">
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(plan)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Upgrade
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
