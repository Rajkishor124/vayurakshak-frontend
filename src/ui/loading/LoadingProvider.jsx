import { useState } from "react";
import { LoadingContext } from "./LoadingContext";
import { registerLoadingFunctions } from "./loading-bridge";

export default function LoadingProvider({ children }) {
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = () => {
    setLoadingCount((prev) => prev + 1);
  };

  const stopLoading = () => {
    setLoadingCount((prev) => Math.max(prev - 1, 0));
  };

  registerLoadingFunctions(startLoading, stopLoading);

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
