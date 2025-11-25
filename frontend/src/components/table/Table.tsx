import { memo } from "react";
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

const TableContent = memo(() => {
  const {
    data: usersData,
    loading,
    error,
  } = useQuery(GetUsersDocument, {
    variables: {
      filters: {},
    },
  });

  const data: GetUsersQuery["users"] = usersData?.users ?? [];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading)
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-pacific text-lg">Loading users...</div>
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
      <table className="w-full">
        <thead className="bg-pacific text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm uppercase"
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
                <td key={cell.id} className="px-4 py-3 text-sm text-gray-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50 border-t-2 border-pacific">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm text-pacific"
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
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <TableFilters searchValue={searchValue} setSearchValue={setSearchValue} />
      <TableContent />
    </div>
  );
};
