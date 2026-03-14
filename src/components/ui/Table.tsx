import React from "react";

export type TableColumn<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
};

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "No records yet",
}: TableProps<T>) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-teal-50 to-white text-left text-xs uppercase tracking-[0.3em] text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.header} className="px-4 py-3">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-sm text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  {columns.map((column) => (
                    <td key={column.header} className="px-4 py-3 align-top">
                      {typeof column.accessor === "function"
                        ? column.accessor(row)
                        : (row[column.accessor as keyof T] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
