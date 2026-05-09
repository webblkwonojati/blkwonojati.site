import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import AntdProvider from "./providers/AntdProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AntdProvider>
        <Toaster position="top-center" richColors />
        {children}
      </AntdProvider>
    </ClerkProvider>
  )
}
