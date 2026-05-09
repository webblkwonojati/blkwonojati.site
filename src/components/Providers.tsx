import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import AntdProvider from "./providers/AntdProvider"
import { TooltipProvider } from "@/components/ui/tooltip"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AntdProvider>
        <TooltipProvider>
          <Toaster position="top-center" richColors />
          {children}
        </TooltipProvider>
      </AntdProvider>
    </ClerkProvider>
  )
}
