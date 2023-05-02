import { cx } from 'class-variance-authority'
import * as React from 'react'

import { useLayoutProps, LayoutProps } from '@/utils'
import styles from './inline-code.module.css'

export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement>, LayoutProps {}

export function InlineCode({ className, ...props }: InlineCodeProps) {
  const { layoutClassName, cleanedRest: rest } = useLayoutProps(props)

  return <code {...rest} className={cx(styles.root, [layoutClassName, className])} />
}
