type LoadingSpinnerProps = {
  message?: string;
};

export const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className="w-12 h-12 border-4 border-pacific border-t-transparent rounded-full animate-spin"
        aria-label="Loading"
      />
      {message && <p className="text-gray-600">{message}</p>}
    </div>
  );
};
