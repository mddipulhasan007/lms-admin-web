"use client";

import * as React from "react";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { createAssignment } from "@/lib/api";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    marks: "",
    file: "",
    original_filename: "",
    size: "",
    lesson_id: "",
    batch_id: "",
    status: "",
    user_id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      marks: Number(formData.marks) || 0,
      lesson_id: Number(formData.lesson_id) || 0,
      batch_id: Number(formData.batch_id) || 0,
      user_id: Number(formData.user_id) || 0,
      status: Number(formData.status) || 0,
    };
    await createAssignment(payload);
    router.back();
  };

  return (
    <div className="space-y-6">
      <SiteBreadcrumb />
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea name="description" value={formData.description} onChange={handleChange} />
              </div>
              <div>
                <Label>Marks</Label>
                <Input type="number" name="marks" value={formData.marks} onChange={handleChange} />
              </div>
              <div>
                <Label>File URL</Label>
                <Input name="file" value={formData.file} onChange={handleChange} />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div>
                <Label>Original Filename</Label>
                <Input name="original_filename" value={formData.original_filename} onChange={handleChange} />
              </div>
              <div>
                <Label>Size</Label>
                <Input name="size" value={formData.size} onChange={handleChange} />
              </div>
              <div>
                <Label>Lesson ID</Label>
                <Input type="number" name="lesson_id" value={formData.lesson_id} onChange={handleChange} />
              </div>
              <div>
                <Label>Batch ID</Label>
                <Input type="number" name="batch_id" value={formData.batch_id} onChange={handleChange} />
              </div>
              <div>
                <Label>User ID</Label>
                <Input type="number" name="user_id" value={formData.user_id} onChange={handleChange} />
              </div>
              <div>
                <Label>Status</Label>
                <Input type="number" name="status" value={formData.status} onChange={handleChange} />
              </div>
            </div>

            {/* Buttons full width */}
            <div className="col-span-2 justify-end flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
