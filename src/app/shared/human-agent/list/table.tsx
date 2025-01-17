'use client';

import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import Filters from './filters';
import { shipmentListColumns } from './columns';
import { Box } from 'rizzui';
import { exportToCSV } from '@core/utils/export-to-csv';
import { useAgent } from '@/app/api/agent/useAgent';
import { contactData } from '@/data/contact-data';

export type ShipmentListTableDataType = {
  user_id: string;
  role_id: string;
  role_name: string;
  email: string;
  display_name: string;
  admin_id: string;
};

export type ContactDataType = (typeof contactData.data)[number];
export default function ShipmentListTable() {
  const { data, isLoading, isError } = useAgent();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data || data.agents.Agent.length === 0) {
    return <p>No connected platforms found.</p>;
  }
  const combinedList = [
    ...(data.agents.Supervisor || []),
    ...(data.agents.Agent || []),
  ];
  const { table, setData } = useTanStackTable<ShipmentListTableDataType>({
    tableData: combinedList || [], // Gunakan data dari React Query
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
          setData((prev) => prev.filter((r) => r.user_id !== row.id));
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
