import * as Portal from '@radix-ui/react-portal'
import { ThemeProvider, useTheme } from 'next-themes'
import * as React from 'react'
import { Toaster } from 'sonner'

export interface ProviderProps {
  children: React.ReactNode
}

export function Provider({ children }: ProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProvider disableTransitionOnChange attribute="class">
      {children}

      {mounted && (
        <Portal.Root asChild>
          <Toaster />
        </Portal.Root>
      )}
    </ThemeProvider>
  )
}

export { useTheme }
