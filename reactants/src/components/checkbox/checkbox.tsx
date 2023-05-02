import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cx } from 'class-variance-authority'
import * as React from 'react'
import { Check, Minus } from 'react-feather'

import { LayoutProps, useLayoutProps } from '@/utils'
import styles from './checkbox.module.css'

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps, LayoutProps {}

export const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, ...props }, forwardedRef) => {
    const { layoutClassName, cleanedRest } = useLayoutProps(props)

    return (
      <CheckboxPrimitive.Root
        ref={forwardedRef}
        className={cx(styles.root, className, layoutClassName)}
        {...cleanedRest}
      >
        <CheckboxPrimitive.Indicator className={styles.check}>
          {props.checked === 'indeterminate' ? <Minus /> : <Check />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  },
)
