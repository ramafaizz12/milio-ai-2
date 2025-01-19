'use client';

import { getStatusColors } from '@core/components/table-utils/get-status-color';
import TableRowActionGroup from '@core/components/table-utils/table-row-action-group';
import { routes } from '@/config/routes';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { Badge } from 'rizzui';
import { ShipmentListTableDataType } from './table';

const columnHelper = createColumnHelper<ShipmentListTableDataType>();

export const shipmentListColumns = [
  columnHelper.accessor('name', {
    id: 'name',
    size: 150,
    header: 'Template Name',
    cell: ({ row }) => (
      <Link
        href={`/contacts/${row.original.id}`} // Adjusted route for contacts
        className="duration-200 hover:text-gray-900 hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  }),

  columnHelper.accessor('category', {
    id: 'category',
    size: 200,
    header: 'Category',
    cell: ({ row }) => `Platform #${row.original.category}`,
  }),
  columnHelper.accessor('language', {
    id: 'language',
    size: 200,
    header: 'Language',
    cell: ({ row }) => `${row.original.language}`,
  }),

  columnHelper.accessor('status', {
    id: 'status',
    size: 180,
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Badge renderAsDot color={getStatusColors(row.original.status)} />
        {row.original.status}
      </div>
    ),
  }),
  columnHelper.display({
    id: 'actions',
    size: 120,
    cell: (props) => {
      const { row, table } = props;
      const { meta } = table.options;

      return (
        <TableRowActionGroup
          deletePopoverTitle="Delete Contact"
          onDelete={() => {
            meta?.handleDeleteRow?.(row.original);
          }}
          editUrl={`/contacts/edit/${row.original.id}`} // Adjusted route for edit
          viewUrl={`/contacts/view/${row.original.id}`} // Adjusted route for view
          deletePopoverDescription={`Are you sure you want to delete contact #${row.original.id}?`}
        />
      );
    },
  }),
];
