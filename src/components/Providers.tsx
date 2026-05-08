"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import AntdProvider from "./providers/AntdProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AntdProvider>
        <Toaster position="top-center" richColors />
        {children}
      </AntdProvider>
    </SessionProvider>
  )
}
