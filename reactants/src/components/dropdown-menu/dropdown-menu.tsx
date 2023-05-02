import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cx } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'

import styles from './dropdown-menu.module.css'

export function DropdownMenu({ modal = false, ...props }: DropdownMenuPrimitive.DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root {...props} modal={modal} />
}

export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuPrimitive.DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, forwardedRef) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={forwardedRef}
      className={cx(styles.content, className)}
      sideOffset={sideOffset}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))

export interface DropdownMenuItemProps extends DropdownMenuPrimitive.DropdownMenuItemProps {
  danger?: boolean
}

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, danger, ...props }, forwardedRef) => (
  <DropdownMenuPrimitive.Item
    ref={forwardedRef}
    className={clsx(styles.item, className, { [styles.danger]: danger })}
    {...props}
  />
))

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuPrimitive.DropdownMenuLabelProps
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitive.Label ref={forwardedRef} className={cx(styles.label, className)} {...props} />
))

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuPrimitive.DropdownMenuSeparatorProps
>(({ className, ...props }, forwardedRef) => (
  <DropdownMenuPrimitive.Separator ref={forwardedRef} className={cx(styles.seperator, className)} {...props} />
))
