import { Slot } from '@radix-ui/react-slot'
import { cva, cx, VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Gap, LayoutProps, useLayoutProps } from '@/utils'
import styles from './stack.module.css'

const { column, row } = styles

const stackVariants = cva(styles.root, {
  variants: {
    direction: { column, row },
    justify: {
      start: styles['justify-start'],
      end: styles['justify-end'],
      center: styles['justify-center'],
      between: styles['justify-between'],
      around: styles['justify-around'],
    },
    align: {
      start: styles['align-start'],
      end: styles['align-end'],
      center: styles['align-center'],
      stretch: styles['align-stretch'],
      baseline: styles['align-baseline'],
    },
  },
})

type StackVariants = VariantProps<typeof stackVariants>

export interface StackProps extends React.HTMLAttributes<HTMLDivElement>, StackVariants, LayoutProps {
  asChild?: boolean
  gap?: Gap | number
}

export function Stack({ direction = 'column', justify, align, gap, asChild, style, className, ...props }: StackProps) {
  const { layoutClassName, cleanedRest } = useLayoutProps(props)
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={stackVariants({ direction, justify, align, className: cx(className, layoutClassName) })}
      style={{ ...(gap && { gap: gap + 'px' }), ...style }}
      {...cleanedRest}
    />
  )
}
