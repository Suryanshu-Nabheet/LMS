"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Award } from "lucide-react"
import Image from "next/image"

interface CertificateProps {
  studentName: string
  courseTitle: string
  instructorName: string
  completedDate: string
}

export function Certificate({
  studentName,
  courseTitle,
  instructorName,
  completedDate,
}: CertificateProps) {
  const handleDownload = () => {
    // Placeholder for PDF generation
    // TODO: Integrate with PDF generation library (e.g., jsPDF, pdfkit)
    alert("Certificate download feature coming soon!")
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Award className="h-16 w-16 text-yellow-500" />
        </div>
        <CardTitle className="text-3xl mb-2">Certificate of Completion</CardTitle>
        <p className="text-gray-600">This is to certify that</p>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">{studentName}</h3>
        <p className="text-gray-600">has successfully completed the course</p>
        <h4 className="text-xl font-semibold text-primary">{courseTitle}</h4>
        <p className="text-gray-600">taught by {instructorName}</p>
        <p className="text-sm text-gray-500">Completed on {new Date(completedDate).toLocaleDateString()}</p>
        <div className="pt-6">
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

