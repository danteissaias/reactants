# Reactants

![@reactants/ui minzip package size](https://img.shields.io/bundlephobia/minzip/@reactants/ui) ![@reactants/ui package version](https://img.shields.io/npm/v/@reactants/ui.svg?colorB=green)

```jsx
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@reactants/ui'

function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Menu</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
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
  )
}
```
