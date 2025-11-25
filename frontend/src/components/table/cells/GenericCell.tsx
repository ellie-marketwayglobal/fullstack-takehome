type GenericCellProps = {
  value: unknown;
};

export const GenericCell = ({ value }: GenericCellProps) => {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return <span className="text-gray-400">-</span>;
  }

  // Handle dates (string format)
  if (typeof value === "string" && !isNaN(Date.parse(value))) {
    return <span>{new Date(value).toLocaleDateString()}</span>;
  }

  // Handle numbers
  if (typeof value === "number") {
    return <span>{value.toLocaleString()}</span>;
  }

  // Handle booleans
  if (typeof value === "boolean") {
    return <span>{value ? "Yes" : "No"}</span>;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return <span>{value.length} items</span>;
  }

  // Handle objects
  if (typeof value === "object") {
    return <span>[Object]</span>;
  }

  // Default: render as string
  return <span>{String(value)}</span>;
};
