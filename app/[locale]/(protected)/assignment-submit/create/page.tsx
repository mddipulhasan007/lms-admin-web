"use client"

import * as React from "react"
import SiteBreadcrumb from "@/components/site-breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { createAssignmentSubmit } from "@/lib/api"

export default function CreateAssignmentSubmitPage() {
  const router = useRouter()
  const [assignmentId, setAssignmentId] = React.useState("")
  const [marks, setMarks] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [file, setFile] = React.useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!assignmentId || !file) {
      alert("Assignment ID and file are required.")
      return
    }

    const payload = {
      assignment_id: Number(assignmentId),
      marks: marks ? Number(marks) : 0,
      notes,
      file: file.name, // placeholder, real upload = FormData
      original_filename: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
    }

    await createAssignmentSubmit(payload)
    router.back()
  }

  return (
    <div className="space-y-6">
      <SiteBreadcrumb />
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Two-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assignment_id">Assignment ID</Label>
                  <Input
                    id="assignment_id"
                    type="number"
                    value={assignmentId}
                    onChange={(e) => setAssignmentId(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marks">Marks</Label>
                  <Input
                    id="marks"
                    type="number"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                  />
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    required
                  />
                  {file && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
