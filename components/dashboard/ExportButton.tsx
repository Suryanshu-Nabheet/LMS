"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { toast } from "@/lib/toast"

interface ExportButtonProps {
  data: any[]
  filename: string
  label?: string
}

export function ExportButton({ data, filename, label = "Export" }: ExportButtonProps) {
  const handleExport = () => {
    if (data.length === 0) {
      toast.error("No data to export")
      return
    }

    try {
      // Convert to CSV
      const headers = Object.keys(data[0])
      const csvContent = [
        headers.join(","),
        ...data.map((row) =>
          headers.map((header) => {
            const value = row[header]
            // Escape commas and quotes
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value
          }).join(",")
        ),
      ].join("\n")

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success("Export successful", "Your data has been downloaded.")
    } catch (error) {
      toast.error("Export failed", "Something went wrong while exporting.")
    }
  }

  return (
    <Button variant="outline" onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

