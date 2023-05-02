import { faker } from '@faker-js/faker/locale/en'
import {
  ActionItem,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
  Checkbox,
  CodeBlock,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  InlineCode,
  Input,
  Picker,
  PickerItem,
  ScrollArea,
  SearchInput,
  Select,
  SelectItem,
  Separator,
  Stack,
  Table,
  Text,
  toast,
  useTextFilter,
  useTheme,
} from '@reactants/ui'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import ms from 'ms'
import * as React from 'react'
import * as Icons from 'react-feather'

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

function AlertDialogExample() {
  return (
    <Stack gap="16" align="start">
      <Text size="24" mb="12">
        Alert Dialog
      </Text>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button color="red">Delete account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction color="red">Yes, delete account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Stack>
  )
}

function BadgeExample() {
  return (
    <Stack gap="16">
      <Text size="24" mb="12">
        Badge
      </Text>

      <Stack direction="row" gap="8">
        <Badge>Default</Badge>
        <Badge color="red">Red</Badge>
        <Badge color="green">Green</Badge>
        <Badge color="pink">Pink</Badge>
        <Badge color="purple">Purple</Badge>
        <Badge color="blue">Blue</Badge>
      </Stack>
    </Stack>
  )
}

function ButtonExample() {
  return (
    <Stack gap="16">
      <Text size="24" mb="12">
        Button
      </Text>

      <Stack direction="row" gap="8">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </Stack>

      <Stack direction="row" gap="8">
        <Button icon size="small">
          <Icons.RotateCw />
        </Button>
        <Button icon size="medium">
          <Icons.RotateCw />
        </Button>
        <Button icon size="large">
          <Icons.RotateCw />
        </Button>
      </Stack>

      <Stack direction="row" gap="8">
        <Button>Gray</Button>
        <Button color="red">Red</Button>
        <Button color="green">Green</Button>
        <Button color="pink">Pink</Button>
        <Button color="purple">Purple</Button>
        <Button color="blue">Blue</Button>
      </Stack>

      <Stack direction="row" gap="8">
        <Button variant="ghost">Gray</Button>
        <Button variant="ghost" color="red">
          Red
        </Button>
        <Button variant="ghost" color="green">
          Green
        </Button>
        <Button variant="ghost" color="pink">
          Pink
        </Button>
        <Button variant="ghost" color="purple">
          Purple
        </Button>
        <Button variant="ghost" color="blue">
          Blue
        </Button>
      </Stack>
      <Stack direction="row" gap="8">
        <Button disabled>Gray</Button>
        <Button disabled color="red">
          Solid
        </Button>
        <Button disabled variant="ghost">
          Ghost
        </Button>
      </Stack>

      <Stack direction="row" gap="8">
        <Button loading size="small">
          Small
        </Button>
        <Button loading>Medium</Button>
        <Button loading size="large">
          Large
        </Button>
      </Stack>
    </Stack>
  )
}

function CheckboxExample() {
  return (
    <Stack gap="16">
      <Text size="24" mb="12">
        Checkbox
      </Text>

      <Stack gap="8" direction="row">
        <Checkbox />
        <Checkbox checked="indeterminate" />
        <Checkbox checked />
      </Stack>
    </Stack>
  )
}

function DropdownMenuExample() {
  return (
    <Stack gap="16" align="start">
      <Text size="24" mb="12">
        Dropdown Menu
      </Text>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Menu</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent style={{ minWidth: 230 }} align="start">
          <DropdownMenuLabel>john@doe.com</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>Workspace Settings</DropdownMenuItem>
            <DropdownMenuItem>Create or join workspace</DropdownMenuItem>
            <DropdownMenuItem disabled>Add an account</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem danger>Log out</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Stack>
  )
}

function InputExample() {
  const [show, setShow] = React.useState(false)

  return (
    <Stack gap="16" align="start">
      <Text size="24" mb="12">
        Input
      </Text>

      <Stack gap="8" direction="row">
        <Input size="medium" placeholder="john@doe.com" />
        <Input size="large" placeholder="john@doe.com" />
      </Stack>

      <Input placeholder="john@doe.com" label="Email address" />

      <Stack gap="8" direction="row">
        <Input size="medium" placeholder="john@doe.com" prefix={<Icons.Mail />} />
        <Input size="large" placeholder="john@doe.com" prefix={<Icons.Mail />} />
      </Stack>

      <Stack gap="8" direction="row">
        <Input size="medium" placeholder="john@doe.com" suffix={<Icons.Mail />} />
        <Input size="large" placeholder="john@doe.com" suffix={<Icons.Mail />} />
      </Stack>

      <Input
        placeholder="•••••••••••"
        type={show ? 'text' : 'password'}
        suffix={
          <Button icon variant="ghost" size="small" onClick={() => setShow((show) => !show)}>
            {show ? <Icons.EyeOff /> : <Icons.Eye />}
          </Button>
        }
      />

      <SearchInput />
    </Stack>
  )
}

function PickerExample() {
  return (
    <Stack gap="16">
      <Text size="24" mb="12">
        Picker
      </Text>

      <Stack gap="12">
        <Picker defaultValue="first">
          <PickerItem value="first">First</PickerItem>
          <PickerItem value="second">Second</PickerItem>
          <PickerItem value="third">Third</PickerItem>
        </Picker>
      </Stack>
    </Stack>
  )
}

function ScrollAreaExample() {
  return (
    <Stack gap="16">
      <Text size="24" mb="12">
        Scroll Area
      </Text>

      <ScrollArea className="tags">
        <Stack m="12" gap="12">
          <Text weight="600">Tags</Text>

          {tags.map((tag) => (
            <React.Fragment key={tag}>
              <Text>{tag}</Text>
              <Separator />
            </React.Fragment>
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  )
}

function SelectExample() {
  return (
    <Stack gap="16" align="start">
      <Text size="24" mb="12">
        Select
      </Text>

      <Select placeholder="Choose an option">
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
        <SelectItem value="option4">Option 4</SelectItem>
      </Select>
    </Stack>
  )
}

function SeparatorExample() {
  return (
    <Stack gap="16">
      <Text size="24" mb="12">
        Separator
      </Text>

      <Stack
        direction="column"
        gap="12"
        mt="12"
        style={{
          width: 300,
        }}
      >
        <Stack gap="4" align="start">
          <Text weight="600">Radix primitives</Text>
          <Text>An open-source UI component library.</Text>
        </Stack>
        <Separator />
        <Stack direction="row" gap="12">
          <Text>Blog</Text>
          <Separator orientation="vertical" />
          <Text>Docs</Text>
          <Separator orientation="vertical" />
          <Text>Source</Text>
        </Stack>
      </Stack>
    </Stack>
  )
}

function StackExample() {
  return (
    <Stack gap="16">
      <Text size="24" mb="12">
        Stack
      </Text>

      <Stack gap="12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: 'var(--accent10)',
              height: 50,
              width: 50,
              borderRadius: 'var(--br-6)',
            }}
          />
        ))}
      </Stack>
    </Stack>
  )
}

interface User {
  id: number
  first: string
  last: string
  email: string
  createdAt: number
  type: 'admin' | 'customer'
  disableSelection?: boolean
}

const columnHelper = createColumnHelper<User>()

const columns: ColumnDef<User, string | number>[] = [
  columnHelper.accessor('first', { header: 'First name' }),
  columnHelper.accessor('last', { header: 'Last name' }),
  columnHelper.accessor('email', { header: 'Email', enableSorting: false }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: ({ getValue }) => <Badge color={getValue() === 'admin' ? 'green' : undefined}>{getValue()}</Badge>,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created at',
    cell: ({ getValue }) => ms(Date.now() - getValue()) + ' ago',
  }),
]

const data: User[] = [
  {
    id: 1,
    first: 'John',
    last: 'Doe',
    email: 'john@doe.com',
    type: 'admin',
    createdAt: Date.now() - ms('23 hours'),
    disableSelection: true,
  },
  {
    id: 2,
    first: 'Dorothy',
    last: 'Boe',
    email: 'dorothy@boe.com',
    type: 'customer',
    createdAt: Date.now() - ms('2 days'),
  },
  {
    id: 3,
    first: 'Baby',
    last: 'Moe',
    email: 'baby@moe.com',
    type: 'customer',
    createdAt: Date.now() - ms('1 week'),
  },
]

function generateData(length = 3): User[] {
  return Array.from({ length }).map((_, index) => {
    const first = faker.name.firstName()
    const last = faker.name.lastName()
    const email = first.toLowerCase() + '@' + last.toLowerCase() + '.com'
    const type = Math.random() > 0.95 ? 'admin' : 'customer'
    const createdAt = faker.date.recent(7).getTime()
    return {
      id: index,
      first,
      last,
      email,
      type,
      createdAt,
      disableSelection: false,
    }
  })
}

function TableExample() {
  const [search, setSearch] = React.useState('')
  const [bigData, setBigData] = React.useState([])

  const [search2, setSearch2] = React.useState('')
  const [recent, setRecent] = React.useState('all')
  const [type, setType] = React.useState('all')

  React.useEffect(() => {
    setBigData(generateData(100))
  }, [])

  const recentFilter = React.useCallback(
    (rows: User[]) => {
      if (recent === 'all') return rows
      return rows.filter((r) => {
        const hourAgo = Date.now() - ms('1 day')
        return r.createdAt >= hourAgo
      })
    },
    [recent],
  )

  const typeFilter = React.useCallback(
    (rows: User[]) => {
      if (type === 'all') return rows
      return rows.filter((r) => r.type === type)
    },
    [type],
  )

  const headerActions = (ctx) => {
    const { flatRows } = ctx.table.getSelectedRowModel()
    return (
      <ActionItem danger disabled={flatRows.length === 0}>
        Delete records ({flatRows.length})
      </ActionItem>
    )
  }

  const rowActions = (ctx) => {
    const { row } = ctx
    const { disableSelection } = row.original

    return (
      <ActionItem danger disabled={disableSelection}>
        Delete
      </ActionItem>
    )
  }

  return (
    <Stack gap="40" style={{ maxWidth: 800 }}>
      <Text size="24">Table</Text>

      <Stack gap="12">
        <Text size="20">Default</Text>
        <Text mb="12" size="16">
          Always provide a caption. Columns and data must be memoized.
        </Text>
        <Table data={data} columns={columns} caption="A basic table." />
      </Stack>

      <Stack gap="12">
        <Text size="20">Empty</Text>
        <Text mb="12" size="16">
          Use the same number of placeholder rows used while loading to avoid layout shift.
        </Text>
        <Table data={[]} columns={columns} defaultRows={3} caption="An empty table." empty="No rows to display." />
      </Stack>

      <Stack gap="12">
        <Text size="20">Overflow</Text>
        <Text mb="12" size="16">
          Pass a number to change the minimum width of the table.
        </Text>
        <Table fixed data={data} columns={columns} overflow={1000} caption="A table with minimum with of 1000px." />
      </Stack>

      <Stack gap="12">
        <Text size="20">Fixed</Text>
        <Text mb="12" size="16">
          Ensures column widths are stable, regardless of cell contents.
        </Text>
        <Table fixed data={data} columns={columns} caption="A table with fixed column widths." />
      </Stack>

      <Stack gap="12">
        <Text size="20">Sortable rows</Text>
        <Text mb="12" size="16">
          Hold shift to sort by multiple columns. Columns can disable sorting.
        </Text>
        <Table sorting data={data} columns={columns} caption="A table with sortable columns." />
      </Stack>

      <Stack gap="12">
        <Text size="20">Selectable rows</Text>
        <Text mb="12" size="16">
          Rows can disable selection.
        </Text>
        <Table
          selectable
          headerActions={headerActions}
          rowActions={rowActions}
          data={data}
          columns={columns}
          caption="A table with selectable rows."
        />
      </Stack>

      <Stack gap="12">
        <Text size="20">Filtered rows</Text>
        <Text mb="12" size="16">
          Filter rows that already displayed. This is not used for server-side search. Common filter function like{' '}
          <InlineCode>useTextFilter</InlineCode> are provided.
        </Text>

        <Table data={data} columns={columns} caption="A table with a search filter." filters={[useTextFilter(search)]}>
          <SearchInput
            size="medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%' }}
          />
        </Table>
      </Stack>

      <Stack gap="12">
        <Text size="20">Pagination</Text>
        <Text mb="12" size="16">
          The default page size is 10.
        </Text>

        <Table data={bigData} columns={columns} caption="A table with pagination." pagination />
      </Stack>

      <Stack gap="12">
        <Text size="20" mb="12">
          Example
        </Text>
        <Table
          data={bigData}
          columns={columns}
          pagination
          sorting
          selectable
          headerActions={headerActions}
          rowActions={rowActions}
          caption="An example table."
          filters={[recentFilter, typeFilter, useTextFilter(search2)]}
        >
          <Picker value={recent} onValueChange={setRecent}>
            <PickerItem value="all">All</PickerItem>
            <PickerItem value="recent">Recent</PickerItem>
          </Picker>

          <Select value={type} onValueChange={setType} style={{ minWidth: 110 }}>
            <SelectItem value="all">All users</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </Select>

          <SearchInput size="medium" value={search2} onChange={(e) => setSearch2(e.target.value)} />
        </Table>
      </Stack>
    </Stack>
  )
}

function TextExample() {
  return (
    <Stack gap="16" align="start">
      <Text size="24" mb="12">
        Text
      </Text>

      <Stack gap="12">
        <Text size="10">The quick brown fox jumps over the lazy dog.</Text>
        <Text size="12">The quick brown fox jumps over the lazy dog.</Text>
        <Text size="13">The quick brown fox jumps over the lazy dog.</Text>
        <Text size="14">The quick brown fox jumps over the lazy dog.</Text>
        <Text size="16">The quick brown fox jumps over the lazy dog.</Text>
        <Text size="20">The quick brown fox jumps over the lazy dog.</Text>
        <Text size="24">The quick brown fox jumps over the lazy dog.</Text>
        <Text size="32">The quick brown fox jumps over the lazy dog.</Text>
        <Text size="40">The quick brown fox jumps over the lazy dog.</Text>
        <Text size="48">The quick brown fox jumps over the lazy dog.</Text>
      </Stack>

      <Text>
        <InlineCode>API_KEY</InlineCode>
      </Text>

      <CodeBlock>{JSON.stringify({ id: 1, name: 'John Doe', email: 'john@doe.com' }, null, 2)}</CodeBlock>
    </Stack>
  )
}

function ToastExample() {
  return (
    <Stack gap="16">
      <Text size="24" mb="12">
        Toast
      </Text>

      <Stack direction="row" gap="8">
        <Button onClick={() => toast('This is a default toast.')}>Default</Button>

        <Button color="green" onClick={() => toast.success('This is a success toast.')}>
          Success
        </Button>

        <Button color="red" onClick={() => toast.danger('This is a danger toast.')}>
          Danger
        </Button>

        <Button
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: 'Loading...',
              success: 'Success',
              error: 'Error',
            })
          }
        >
          Promise
        </Button>
      </Stack>
    </Stack>
  )
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      style={{
        right: 24,
        top: 24,
        position: 'fixed',
      }}
    >
      <Select value={theme} onValueChange={setTheme}>
        <SelectItem value="system">
          <Icons.Monitor />
          System
        </SelectItem>
        <SelectItem value="light">
          <Icons.Sun />
          Light
        </SelectItem>
        <SelectItem value="dark">
          <Icons.Moon />
          Dark
        </SelectItem>
      </Select>
    </div>
  )
}

export default function App() {
  return (
    <Stack gap="56" p="32">
      <ThemeSwitcher />
      <AlertDialogExample />
      <BadgeExample />
      <ButtonExample />
      <CheckboxExample />
      <DropdownMenuExample />
      <InputExample />
      <PickerExample />
      <ScrollAreaExample />
      <SelectExample />
      <SeparatorExample />
      <StackExample />
      <TableExample />
      <TextExample />
      <ToastExample />
    </Stack>
  )
}
