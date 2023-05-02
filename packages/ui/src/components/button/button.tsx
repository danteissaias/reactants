import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, cx, VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Spinner } from '@/components'
import { useLayoutProps, LayoutProps } from '@/utils'
import styles from './button.module.css'

const buttonVariants = cva(styles.root, {
  variants: {
    icon: {
      true: styles.icon,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
    },
    color: {
      gray: styles.gray,
      green: styles.green,
      red: styles.red,
      pink: styles.pink,
      purple: styles.purple,
      blue: styles.blue,
      accent: styles.accent,
    },
    variant: {
      solid: styles.solid,
      ghost: styles.ghost,
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'gray',
      className: styles['solid-gray'],
    },
  ],
})

type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ButtonVariants,
    LayoutProps {
  asChild?: boolean
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'medium',
      variant = 'solid',
      color = 'gray',
      icon,
      loading,
      disabled,
      className,
      children,
      asChild,
      ...props
    },
    forwardedRef,
  ) => {
    const { layoutClassName, cleanedRest } = useLayoutProps(props)
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={forwardedRef}
        className={buttonVariants({ size, variant, color, icon: icon, className: cx(className, layoutClassName) })}
        disabled={loading || disabled}
        {...cleanedRest}
      >
        {loading ? <Spinner /> : null}
        <Slottable>{children}</Slottable>
      </Comp>
    )
  },
)
