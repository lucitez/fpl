import clsx from 'clsx';
import React, { FC } from 'react';
import {
  Table as MDTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from 'react-md';
import { useQueryParam } from 'use-query-params';

import styles from './Table.module.scss';

interface Column<T> {
  title: string;
  field: string;
  sortable?: boolean;
  className?: string;
  renderCell?: (row: T) => string;
}

interface Props<T = unknown> {
  columns: Column<T>[];
  data: unknown[];
  stickyHeader?: boolean;
  stickyRow?: boolean;
  type?: 'full' | 'compact';
  maxHeight?: number;
  onRowClick?: (row: T) => void;
}

const Table: FC<Props> = ({
  columns,
  data,
  stickyHeader = false,
  stickyRow = false,
  type = 'full',
  maxHeight = 90,
  onRowClick = null,
}) => {
  const [sortColumn, setSortColumn] = useQueryParam<string>('sort');
  const [sortDirection, setSortDirection] = useQueryParam<'asc' | 'desc'>(
    'direction',
  );

  const ariaSortDirection =
    sortDirection === 'asc' ? 'ascending' : 'descending';

  const handleSortClick = (columnName: string) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('desc');
    }
  };

  const calculateStickyHeaderValue = (index: number) => {
    if (stickyHeader && stickyRow && index === 0) {
      return 'header-cell';
    }
    if (stickyHeader) {
      return 'header';
    }
    return null;
  };

  return (
    <TableContainer
      className={styles.container}
      style={{ maxHeight: `${maxHeight}vh` }}
    >
      <MDTable fullWidth>
        <TableHeader sticky={stickyHeader}>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={column.field}
                sticky={calculateStickyHeaderValue(index)}
                className={clsx(
                  type === 'compact' ? styles.columnCompact : styles.column,
                  column.className,
                )}
                aria-sort={
                  column.sortable && sortColumn === column.field
                    ? ariaSortDirection
                    : 'none'
                }
                onClick={
                  column.sortable ? () => handleSortClick(column.field) : null
                }
                sortIconAfter
              >
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow
              key={`${item['id']}-${rowIndex}`}
              clickable={!!onRowClick}
              onClick={() => onRowClick(item)}
            >
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={column.field}
                  className={clsx(
                    type === 'compact' ? styles.columnCompact : styles.column,
                    sortColumn === column.field && styles.sortedColumn,
                  )}
                  sticky={stickyRow && columnIndex === 0 ? 'cell' : null}
                >
                  {column.renderCell
                    ? column.renderCell(item)
                    : item[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MDTable>
    </TableContainer>
  );
};

export default Table;
export type { Column };
