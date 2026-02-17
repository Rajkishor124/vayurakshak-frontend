export const getSeverityStyles = (severity) => {
  switch (severity) {
    case "INFO":
      return "bg-blue-100 text-blue-700";
    case "MEDIUM":
      return "bg-amber-100 text-amber-700";
    case "HIGH":
      return "bg-orange-100 text-orange-700";
    case "CRITICAL":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
