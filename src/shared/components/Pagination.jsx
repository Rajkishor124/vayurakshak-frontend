export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-3 py-1">
        Page {page + 1} of {totalPages}
      </span>

      <button
        disabled={page + 1 === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
