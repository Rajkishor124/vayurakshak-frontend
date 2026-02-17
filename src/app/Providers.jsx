import { AuthProvider } from "../context/auth/AuthProvider";
import LoadingProvider from "../ui/loading/LoadingProvider";
import GlobalLoader from "../shared/components/GlobalLoader";
import { ToastProvider } from "../ui/toast/ToastProvider";
import ErrorBoundary from "../ui/error/ErrorBoundary";

export default function Providers({ children }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <ToastProvider>
            <GlobalLoader />
            {children}
          </ToastProvider>
        </LoadingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
