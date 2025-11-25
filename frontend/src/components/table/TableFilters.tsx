type TableFiltersProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const TableFilters = ({
  searchValue,
  setSearchValue,
}: TableFiltersProps) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};
