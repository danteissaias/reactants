import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cx } from 'class-variance-authority'
import * as React from 'react'
import styles from './scroll-area.module.css'

const Scrollbar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  ScrollAreaPrimitive.ScrollAreaScrollbarProps
>(({ className, ...props }, forwardedRef) => (
  <ScrollAreaPrimitive.Scrollbar ref={forwardedRef} className={cx(className, styles.track)} {...props}>
    <ScrollAreaPrimitive.Thumb className={styles.thumb} />
  </ScrollAreaPrimitive.Scrollbar>
))

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaPrimitive.ScrollAreaProps
>(({ className, children, ...props }, forwardedRef) => (
  <ScrollAreaPrimitive.Root ref={forwardedRef} className={cx(styles.root, className)} {...props}>
    <ScrollAreaPrimitive.Viewport className={styles.viewport}>{children}</ScrollAreaPrimitive.Viewport>
    <Scrollbar orientation="vertical" />
    <Scrollbar orientation="horizontal" />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
