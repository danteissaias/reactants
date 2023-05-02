import { CheckedState } from '@radix-ui/react-checkbox'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  CellContext,
  ColumnDef,
  HeaderContext,
  Row,
  RowData,
} from '@tanstack/react-table'
import { cx } from 'class-variance-authority'
import * as React from 'react'
import { ArrowDown, Lock, MoreHorizontal } from 'react-feather'

import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ScrollArea,
  Stack,
  Text,
} from '@/components'
import styles from './table.module.css'

declare module 'react' {
  interface CSSProperties {
    '--rows'?: number
    '--overflow-width'?: string
  }
}

declare module '@tanstack/react-table' {
  // All declarations of 'ColumnMeta' must have identical type parameters
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
    align?: 'left' | 'center' | 'right'
  }
}

export { DropdownMenuGroup as ActionGroup, DropdownMenuItem as ActionItem, DropdownMenuSeparator as ActionSeparator }

export interface TableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  caption: string
  defaultRows?: number
  overflow?: number
  empty?: React.ReactNode
  fixed?: boolean
  sorting?: boolean
  selectable?: boolean
  headerActions?: (ctx: HeaderContext<TData, TValue>) => React.ReactNode
  rowActions?: (ctx: CellContext<TData, TValue>) => React.ReactNode
  filters?: ((rows: TData[]) => TData[])[]
  pagination?: boolean | number

  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

function SelectionHeader<TData, TValue>({ table }: HeaderContext<TData, TValue>) {
  let checked: CheckedState = false
  const rows = table.getRowModel().flatRows
  const selectedRows = table.getSelectedRowModel().flatRows

  if (table.getIsAllRowsSelected()) checked = true
  else if (selectedRows.length > 0) checked = 'indeterminate'

  return (
    <Checkbox checked={checked} disabled={rows.length === 0} onCheckedChange={() => table.toggleAllRowsSelected()} />
  )
}

function SelectionCell<TData, TValue>({ row }: CellContext<TData, TValue>) {
  return row.getCanSelect() ? (
    <Checkbox checked={row.getIsSelected()} onCheckedChange={row.getToggleSelectedHandler()} />
  ) : (
    <Lock className={styles.lock} />
  )
}

const getActionsHeader = <TData, TValue>(headerActions: (ctx: HeaderContext<TData, TValue>) => React.ReactNode) =>
  function ActionsHeader(context: HeaderContext<TData, TValue>) {
    const { flatRows } = context.table.getSelectedRowModel()
    const selectedRows = flatRows.length

    return (
      <Stack align="center" direction="row" gap="4" justify="end">
        {selectedRows > 0 ? <span className={styles.counter}>{selectedRows}</span> : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="1" variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">{headerActions(context)}</DropdownMenuContent>
        </DropdownMenu>
      </Stack>
    )
  }

const getActionsCell = <TData, TValue>(rowActions: (ctx: CellContext<TData, TValue>) => React.ReactNode) =>
  function ActionsCell(context: CellContext<TData, TValue>) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="1" variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">{rowActions(context)}</DropdownMenuContent>
      </DropdownMenu>
    )
  }

export function Table<TData extends { id?: string | number; disableSelection?: boolean }, TValue>({
  data,
  columns: userColumns,
  caption,
  defaultRows = 1,
  overflow,
  empty = 'No rows displayed.',
  fixed,
  sorting = false,
  selectable,
  rowActions,
  headerActions,
  filters = [],
  pagination,
  className,
  children,
  ...props
}: TableProps<TData, TValue>) {
  const columns = React.useMemo(() => {
    if (selectable) {
      if (!headerActions || !rowActions) {
        const err = 'headerActions and rowActions are required for selectable tables.'
        throw new Error(err)
      }

      return [
        {
          id: 'selection',
          enableSorting: false,
          enableResizing: false,
          enableGlobalFilter: false,
          meta: { className: styles.selection },
          header: SelectionHeader,
          cell: SelectionCell,
        },
        ...userColumns,
        {
          id: 'actions',
          enableSorting: false,
          enableResizing: false,
          enableGlobalFilter: false,
          meta: { className: styles.actions, align: 'right' },
          header: getActionsHeader(headerActions),
          cell: getActionsCell(rowActions),
        },
      ] as ColumnDef<TData, TValue>[]
    }

    return userColumns
  }, [selectable, headerActions, rowActions, userColumns])

  const filteredData = React.useMemo(() => filters.reduce((d, f) => f(d), data), [data, filters])

  const getRowId = React.useCallback((row: TData, index: number, parent?: Row<TData>) => {
    if (row.id) return row.id.toString()
    if (parent) return [parent.id, index].join('.')
    return index.toString()
  }, [])

  const table = useReactTable({
    data: filteredData,
    columns,
    getRowId,
    initialState: {
      pagination: {
        pageSize: typeof pagination === 'number' ? pagination : 10,
      },
    },
    enableSorting: sorting,
    enableRowSelection: selectable ? (row) => !row.original.disableSelection : false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
  })

  const { pageSize, pageIndex } = table.getState().pagination
  const count = filteredData.length
  const getDisplayRowsFrom = () => Math.min(count, pageIndex * pageSize + 1)
  const getDisplayedRowsTo = () => Math.min(count, (pageIndex + 1) * pageSize)

  return (
    <div className={cx(className, styles.root)} {...props}>
      {children ? <div className={styles.filters}>{children}</div> : null}

      <div
        className={cx(styles['table-root'], fixed ? [styles.fixed] : [])}
        style={{ '--overflow-width': overflow ? `${overflow}px` : undefined }}
      >
        <ScrollArea>
          <table className={styles.table}>
            <VisuallyHidden.Root asChild>
              <caption>{caption}</caption>
            </VisuallyHidden.Root>

            <thead className={styles.head}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className={styles.row} key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const { meta = {} } = header.column.columnDef
                    const { getCanSort, getToggleSortingHandler } = header.column
                    const sort = sorting && getCanSort()
                    const handler = getToggleSortingHandler()

                    return (
                      <th className={cx(styles.cell, meta.className)} key={header.id} style={{ textAlign: meta.align }}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={cx(sort ? [styles.sortable] : [])}
                            onClick={handler}
                            onKeyDown={(e) => {
                              if (e.key === ' ' || e.key === 'Enter') {
                                e.preventDefault()
                                handler?.(e)
                              }
                            }}
                            role={sort ? 'button' : undefined}
                            tabIndex={sort ? 0 : undefined}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {sort ? (
                              <ArrowDown
                                className={styles.icon}
                                style={{
                                  opacity: header.column.getIsSorted() ? 1 : 0,
                                  transform: header.column.getIsSorted() === 'asc' ? 'rotate(-180deg)' : undefined,
                                }}
                              />
                            ) : null}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>

            <tbody className={styles.body}>
              {table.getRowModel().rows.map((row) => (
                <tr className={styles.row} key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const { meta = {} } = cell.column.columnDef

                    return (
                      <td className={cx(styles.cell, meta.className)} key={cell.id} style={{ textAlign: meta.align }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 ? (
            <div className={styles.empty} style={{ '--rows': defaultRows }}>
              {empty}
            </div>
          ) : null}
        </ScrollArea>
      </div>

      {pagination ? (
        <Stack align="center" direction="row" justify="between" mt="12">
          <Text color="gray-11">
            {getDisplayRowsFrom()}-{getDisplayedRowsTo()} of {count}
          </Text>

          <Stack direction="row" gap="8">
            <Button disabled={!table.getCanPreviousPage()} onClick={table.previousPage}>
              Previous
            </Button>
            <Button disabled={!table.getCanNextPage()} onClick={table.nextPage}>
              Next
            </Button>
          </Stack>
        </Stack>
      ) : null}
    </div>
  )
}
