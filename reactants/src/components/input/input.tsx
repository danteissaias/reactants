import { cx } from 'class-variance-authority'
import * as React from 'react'
import { Search, XCircle } from 'react-feather'

import { Button, Text } from '@/components'
import { LayoutProps, useLayoutProps } from '@/utils'
import styles from './input.module.css'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>, LayoutProps {
  size?: '2' | '3'
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  label?: string
}

export function Input({ className, style, prefix, suffix, size = '2', label, ...props }: InputProps) {
  const { layoutClassName, cleanedRest } = useLayoutProps(props)

  return (
    <label className={cx(styles.root, className, layoutClassName)} data-size={size} style={style}>
      {label ? (
        <Text color="gray-11" className={styles.label}>
          {label}
        </Text>
      ) : null}

      <div className={styles.wrapper}>
        <span className={styles.prefix}>{prefix}</span>
        <input
          className={styles.input}
          data-has-prefix={Boolean(prefix)}
          data-has-suffix={Boolean(suffix)}
          {...cleanedRest}
        />
        <span className={styles.suffix}>{suffix}</span>
      </div>
    </label>
  )
}

export function SearchInput({ onChange, value, ...props }: Omit<InputProps, 'prefix' | 'suffix'>) {
  const [internalValue, setInternalValue] = React.useState('')

  const internalOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value)
    onChange?.(e)
  }

  const clearInputEvent = {
    target: { value: '' },
  } as React.ChangeEvent<HTMLInputElement>

  const suffix = (
    <Button svgOnly onClick={() => internalOnChange(clearInputEvent)} size="1" variant="ghost">
      <XCircle />
    </Button>
  )

  return (
    <Input
      onChange={internalOnChange}
      prefix={<Search />}
      suffix={internalValue ? suffix : true}
      value={value ? value : internalValue}
      {...props}
    />
  )
}
