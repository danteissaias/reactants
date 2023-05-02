import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cx } from 'class-variance-authority'
import * as React from 'react'
import styles from './separator.module.css'
import { LayoutProps, useLayoutProps } from '@/utils'

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorPrimitive.SeparatorProps & LayoutProps
>(({ className, orientation = 'horizontal', ...props }, forwardedRef) => {
  const { layoutClassName, cleanedRest } = useLayoutProps(props)

  return (
    <SeparatorPrimitive.Root
      ref={forwardedRef}
      className={cx(styles.root, styles[orientation], className, layoutClassName)}
      orientation={orientation}
      {...cleanedRest}
    />
  )
})

Separator.displayName = 'Separator'
