import { Slot } from '@radix-ui/react-slot'
import { cva, cx, VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { LayoutProps, useLayoutProps } from '@/utils'
import styles from './text.module.css'

const textVariants = cva(styles.root, {
  variants: {
    color: {
      gray11: styles.gray11,
      gray12: styles.gray12,
      red11: styles.red11,
    },
    size: {
      '10': styles.s10,
      '12': styles.s12,
      '13': styles.s13,
      '14': styles.s14,
      '16': styles.s16,
      '20': styles.s20,
      '24': styles.s24,
      '32': styles.s32,
      '40': styles.s40,
      '48': styles.s48,
    },
    weight: {
      '400': styles.w400,
      '500': styles.w500,
      '600': styles.w600,
      '700': styles.w700,
      '800': styles.w800,
    },
  },
})

export interface TextProps
  extends Omit<React.ComponentPropsWithRef<'span'>, 'color'>,
    LayoutProps,
    VariantProps<typeof textVariants> {
  asChild?: boolean
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ size = '14', weight, color = 'gray12', asChild, className, ...props }, ref) => {
    const { layoutClassName, cleanedRest: rest } = useLayoutProps(props)
    const Comp = asChild ? Slot : 'span'

    return (
      <Comp
        ref={ref}
        className={textVariants({ size, weight, color, className: cx(className, layoutClassName) })}
        {...rest}
      />
    )
  },
)

Text.displayName = 'Text'
