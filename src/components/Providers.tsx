import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <TooltipProvider>
        <Toaster position="top-center" richColors />
        {children}
      </TooltipProvider>
    </ClerkProvider>
  )
}
