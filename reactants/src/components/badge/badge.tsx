import { cva, cx, VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { useLayoutProps, LayoutProps } from '@/utils'
import styles from './badge.module.css'

const { gray, red, green, pink, purple, blue, accent } = styles

const badgeVariants = cva(styles.root, {
  variants: {
    color: { gray, red, green, pink, purple, blue, accent },
  },
})

type BadgeVariants = VariantProps<typeof badgeVariants>

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, BadgeVariants, LayoutProps {
  children: React.ReactNode
}

export function Badge({ color = 'gray', className, ...props }: BadgeProps) {
  const { layoutClassName, cleanedRest } = useLayoutProps(props)

  return <span className={badgeVariants({ color, className: cx(className, layoutClassName) })} {...cleanedRest} />
}
