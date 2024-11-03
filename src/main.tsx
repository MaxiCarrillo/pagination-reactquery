import { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

import { Feature, fetchFeatures } from './fetchData'

const queryClient = new QueryClient()

function App() {
  const columns = useMemo<ColumnDef<Feature>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        // Cell: flexRender, // This is a function that renders the cell
      },
      {
        header: 'Icon',
        accessorKey: 'icon',
        // Cell: flexRender,
      },
    ], []
  )

  const [pagination, setPagination] = useState<PaginationState>(() => {
    const searchParams = new URLSearchParams(window.location.search)
    return {
      pageIndex: Number(searchParams.get('page')) || 0,
      pageSize: Number(searchParams.get('size')) || 10,
    }
  })

  useEffect(() => {
    const newPathName = pagination.pageIndex === 0 && pagination.pageSize === 10
      ? window.location.pathname
      : `?page=${pagination.pageIndex}&size=${pagination.pageSize}`
    window.history.replaceState({}, '', newPathName)
  }, [pagination])

  const dataQuery = useQuery({
    queryKey: ['features', pagination], // This is the query key
    queryFn: () => fetchFeatures(pagination), // This is the function that fetches the data
    placeholderData: keepPreviousData, // This is the placeholder data
  })

  const defaultData = useMemo(() => [], [])

  const table = useReactTable({
    data: dataQuery.data?.data ?? defaultData,
    columns,
    rowCount: dataQuery.data?.rowCount ?? 0,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: false, // Set this to true to see the table state in the console
  })

  return (
    <main>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {
                headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  )
                })
              }
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
      <section>
        <button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {dataQuery.isFetching ? 'Loading...' : null}
      </section>
      <section>
        Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
        {dataQuery.data?.data.length.toLocaleString()} Rows
      </section>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
