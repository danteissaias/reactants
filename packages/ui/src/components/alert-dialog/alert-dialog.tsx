import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cx } from 'class-variance-authority'
import * as React from 'react'

import { Button, ButtonProps, Stack, StackProps, Text } from '@/components'
import styles from './alert-dialog.module.css'

export const AlertDialog = AlertDialogPrimitive.Root

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogPrimitive.AlertDialogContentProps
>(({ className, ...props }, forwardedRef) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Overlay className={styles.overlay} />
    <AlertDialogPrimitive.Content ref={forwardedRef} className={cx(styles.content, className)} {...props} />
  </AlertDialogPrimitive.Portal>
))

export function AlertDialogHeader(props: { children: React.ReactNode }) {
  return <Stack direction="column" gap="8" {...props} />
}

export function AlertDialogFooter(props: { children: React.ReactNode }) {
  return <Stack direction="row" gap="8" justify="end" {...props} />
}

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  { children: React.ReactNode }
>(({ children, ...props }, ref) => (
  <AlertDialogPrimitive.Title asChild ref={ref} {...props}>
    <Text size="16" weight="600">
      {children}
    </Text>
  </AlertDialogPrimitive.Title>
))

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  { children: React.ReactNode }
>(({ children, ...props }, ref) => (
  <AlertDialogPrimitive.Description asChild ref={ref} {...props}>
    <Text asChild size="14">
      <p>{children}</p>
    </Text>
  </AlertDialogPrimitive.Description>
))

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  { children: React.ReactNode }
>(({ children }, ref) => (
  <AlertDialogPrimitive.Cancel asChild ref={ref}>
    <Button variant="ghost">{children}</Button>
  </AlertDialogPrimitive.Cancel>
))

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  Omit<ButtonProps, 'size'>
>(({ ...props }, ref) => (
  <AlertDialogPrimitive.Action asChild ref={ref}>
    <Button {...props} />
  </AlertDialogPrimitive.Action>
))
