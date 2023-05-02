import { cx } from 'class-variance-authority'
import * as React from 'react'

import { useLayoutProps, LayoutProps } from '@/utils'
import styles from './code-block.module.css'

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement>, LayoutProps {}

export function CodeBlock({ className, ...props }: CodeBlockProps) {
  const { layoutClassName, cleanedRest: rest } = useLayoutProps(props)

  return <pre className={cx(styles.root, className, layoutClassName)} {...rest} />
}
