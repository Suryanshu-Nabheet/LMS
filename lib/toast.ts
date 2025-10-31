import { toast as showToast } from "@/components/ui/use-toast"

export const toast = {
  success: (title: string, description?: string) => {
    showToast({
      variant: "success",
      title,
      description,
    })
  },
  error: (title: string, description?: string) => {
    showToast({
      variant: "destructive",
      title,
      description,
    })
  },
  info: (title: string, description?: string) => {
    showToast({
      variant: "default",
      title,
      description,
    })
  },
}

