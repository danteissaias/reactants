import clsx from 'clsx'
import * as React from 'react'
import { Check, X } from 'react-feather'
import { toast as sonner } from 'sonner'
import { Spinner } from '../spinner/spinner'
import styles from './toast.module.css'

export const toast = (message: string) => {
  sonner.custom(() => <div className={styles.root}>{message}</div>)
}

toast.success = (message: string) => {
  sonner.custom(() => (
    <div className={clsx(styles.root, styles.success)}>
      <Check />
      {message}
    </div>
  ))
}

toast.danger = (message: string) => {
  sonner.custom(() => (
    <div className={clsx(styles.root, styles.danger)}>
      <X />
      {message}
    </div>
  ))
}

interface PromiseData {
  loading: string
  success: string
  error: string
}

type PromiseState = 'loading' | 'success' | 'error'

function PromiseToast<T>({ promise, data }: { data: PromiseData; promise: Promise<T> }) {
  const [state, setState] = React.useState<PromiseState>('loading')

  React.useEffect(() => {
    promise.then(() => setState('success')).catch(() => setState('error'))
  }, [promise])

  return (
    <div
      className={clsx(styles.root, styles.promise, {
        [styles.success]: state === 'success',
        [styles.danger]: state === 'error',
      })}
    >
      <span className={styles.loader} data-visible={state === 'loading'}>
        <Spinner />
      </span>
      {state === 'success' && <Check />}
      {state === 'error' && <X />}
      {data[state]}
    </div>
  )
}

toast.promise = function ToastPromise<T>(promise: Promise<T>, data: PromiseData) {
  sonner.custom(() => <PromiseToast data={data} promise={promise} />)
}

export { Toaster } from 'sonner'
