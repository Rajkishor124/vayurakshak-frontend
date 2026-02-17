import useLoading from "../../ui/loading/useLoading";

export default function GlobalLoader() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
    </div>
  );
}
