import React from 'react';
import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';

interface Column {
  key: string;
  header: string;
  sortable?: boolean;
}

interface DataTableWrapperProps {
  data: any[];
  columns: Column[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  onRowClick?: (row: any) => void;
  onRetry?: () => void;
}

export const DataTableWrapper: React.FC<DataTableWrapperProps> = ({
  data,
  columns,
  loading = false,
  error,
  emptyMessage = 'No data available',
  onRowClick,
  onRetry,
}) => {
  if (loading) {
    return <LoadingSpinner description="Loading data..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!data || data.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <DataTable rows={data} headers={columns}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                {...getRowProps({ row })}
                onClick={() => onRowClick && onRowClick(row)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
};
