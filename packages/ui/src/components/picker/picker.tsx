import * as RadioGroup from '@radix-ui/react-radio-group'
import { cx } from 'class-variance-authority'
import { motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'

import styles from './picker.module.css'

const PickerContext = React.createContext<string>('')

export type PickerProps = Omit<React.ComponentPropsWithoutRef<typeof RadioGroup.Root>, 'orientation'>

export function Picker({ className, ...props }: PickerProps) {
  const id = React.useId()

  return (
    <PickerContext.Provider value={id}>
      <RadioGroup.Root className={cx(styles.root, className)} orientation="horizontal" {...props} />
    </PickerContext.Provider>
  )
}

export type PickerItemProps = React.ComponentPropsWithoutRef<typeof RadioGroup.Item>

export function PickerItem({ className, children, ...props }: PickerItemProps) {
  const id = React.useContext(PickerContext)
  const prefersReducedMotion = useReducedMotion()

  return (
    <RadioGroup.Item className={cx(styles.item, className)} {...props}>
      <RadioGroup.Indicator>
        <motion.span
          className={styles.indicator}
          layoutId={`${id}-indicator`}
          transition={{
            type: 'spring',
            duration: !prefersReducedMotion ? 0.4 : 0,
            bounce: 0.1,
          }}
        />
      </RadioGroup.Indicator>

      {children}
    </RadioGroup.Item>
  )
}
