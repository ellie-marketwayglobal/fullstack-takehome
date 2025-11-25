import { memo, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@apollo/client/react";
import {
  GetUsersDocument,
  type GetUsersQuery,
} from "../../__generated__/graphql";
import { useState } from "react";
import { PostCell } from "./cells/PostCell";

import { TableFilters } from "./TableFilters";
import { GenericCell } from "./cells/GenericCell";
import { LoadingSpinner } from "../LoadingSpinner";

const columnHelper = createColumnHelper<GetUsersQuery["users"][0]>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => <GenericCell value={info.getValue()} />,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => <GenericCell value={info.getValue()} />,
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => <GenericCell value={info.getValue()} />,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => <GenericCell value={info.getValue()} />,
  }),
  columnHelper.accessor("phone", {
    header: "Phone",
    cell: (info) => <GenericCell value={info.getValue()} />,
  }),
  columnHelper.accessor("posts", {
    header: "Posts",
    cell: (info) => {
      const posts = info.getValue();
      return <PostCell posts={posts} />;
    },
  }),
];

type TableContentProps = {
  searchValue: string;
};

const TableContent = memo(({ searchValue }: TableContentProps) => {
  const {
    data: usersData,
    loading,
    error,
  } = useQuery(GetUsersDocument, {
    variables: {
      filters: {},
    },
  });

  const allUsers: GetUsersQuery["users"] = usersData?.users ?? [];

  // Client-side case-insensitive filtering based on name, email, or phone
  const data = useMemo(() => {
    if (!searchValue.trim()) return allUsers;

    const searchLower = searchValue.toLowerCase().trim();
    return allUsers.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.phone?.toLowerCase().includes(searchLower)
    );
  }, [allUsers, searchValue]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading)
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <LoadingSpinner message="Loading users..." />
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-red-500 text-lg">Error: {error.message}</div>
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <table className="w-full min-w-[600px] bg-white">
        <thead className="bg-pacific text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-3 text-left uppercase whitespace-nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-pacific-light transition-colors duration-150"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-3 text-gray-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-3 text-left text-pacific whitespace-nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
});

export const Table = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4">
      <TableFilters searchValue={searchValue} setSearchValue={setSearchValue} />
      <TableContent searchValue={searchValue} />
    </div>
  );
};
