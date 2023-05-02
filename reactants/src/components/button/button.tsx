import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, cx, VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Spinner } from '@/components'
import { useLayoutProps, LayoutProps } from '@/utils'
import styles from './button.module.css'

const { gray, green, red, pink, purple, blue, solid, ghost, accent } = styles

const buttonVariants = cva(styles.root, {
  variants: {
    svgOnly: { true: styles['svg-only'] },
    size: { '1': styles.s1, '2': styles.s2, '3': styles.s3 },
    color: { gray, green, red, pink, purple, blue, accent },
    variant: { solid, ghost },
  },
  compoundVariants: [
    {
      color: 'gray',
      variant: 'solid',
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
      size = '2',
      variant = 'solid',
      color = 'gray',
      svgOnly,
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
        className={buttonVariants({ size, variant, color, svgOnly, className: cx(className, layoutClassName) })}
        disabled={loading || disabled}
        {...cleanedRest}
      >
        {loading ? <Spinner /> : null}
        <Slottable>{children}</Slottable>
      </Comp>
    )
  },
)
