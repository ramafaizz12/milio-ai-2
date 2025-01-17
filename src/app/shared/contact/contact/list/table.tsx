'use client';

import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { shipmentListColumns } from './columns';
import { Box } from 'rizzui';
import { exportToCSV } from '@core/utils/export-to-csv';
import { useContacts } from '@/app/api/contact/useContact';
import { contactData } from '@/data/contact-data';

export type ShipmentListTableDataType = {
  id: string;
  name: string;
  phone: string;
  chat_status: string;
  created_at: string;
  platform_id: number;
  avatar: string;
};

export type ContactDataType = (typeof contactData.data)[number];
export default function ShipmentListTable() {
  const { data, isLoading, isError } = useContacts();

  const { table, setData } = useTanStackTable<ShipmentListTableDataType>({
    tableData: data || [], // Gunakan data dari React Query
    columnConfig: shipmentListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
          table.resetRowSelection();
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });

  const selectedData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      'ID,Name,Phone,ChatStatus,CreatedAt,PlatformID',
      `contacts_data_${selectedData.length}`
    );
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box>
      <Filters table={table} />
      <Table
        table={table}
        variant="modern"
        classNames={{
          container: 'border border-muted rounded-md',
          rowClassName: 'last:border-0',
        }}
      />
      <TableFooter table={table} onExport={handleExportData} />
      <TablePagination table={table} className="py-4" />
    </Box>
  );
}
