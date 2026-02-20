import { AuthProvider } from "../context/auth/AuthProvider";
import LoadingProvider from "../ui/loading/LoadingProvider";
import GlobalLoader from "../shared/components/GlobalLoader";
import { ToastProvider } from "../ui/toast/ToastProvider";
import ErrorBoundary from "../ui/error/ErrorBoundary";
import ModalProvider from "../ui/modal/ModalProvider";

export default function Providers({ children }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <ToastProvider>
            <ModalProvider>
              <GlobalLoader />
              {children}
            </ModalProvider>
          </ToastProvider>
        </LoadingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
