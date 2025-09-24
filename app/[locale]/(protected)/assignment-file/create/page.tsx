"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { createAssignmentFile } from "@/lib/api";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const CreateAssignmentFilePage = () => {
  const [formData, setFormData] = useState({
    assignment_id: 0,
    file_path: "",
    original_filename: "",
    file_size: "",
    file_type: "",
    uuid: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createAssignmentFile(formData);
      toast.success("Assignment file created successfully!");
      console.log("Created:", res);

      // reset form
      setFormData({
        assignment_id: 0,
        file_path: "",
        original_filename: "",
        file_size: "",
        file_type: "",
        uuid: "",
      });

      router.push("/en/assignment-file"); // redirect to list page
    } catch (error: any) {
      toast.error(error.message || "Failed to create assignment file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SiteBreadcrumb />
      <Card>
        <CardContent className="p-4 space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Input
                name="assignment_id"
                type="number"
                placeholder="Assignment ID"
                value={formData.assignment_id}
                onChange={handleChange}
              />
              <Input
                name="original_filename"
                type="text"
                placeholder="Original Filename"
                value={formData.original_filename}
                onChange={handleChange}
              />
              <Input
                name="file_size"
                type="text"
                placeholder="File Size"
                value={formData.file_size}
                onChange={handleChange}
              />
              <Input
                name="file_type"
                type="text"
                placeholder="File Type"
                value={formData.file_type}
                onChange={handleChange}
              />
              <Input
                name="file_path"
                type="text"
                placeholder="File Path (URL or storage path)"
                value={formData.file_path}
                onChange={handleChange}
                className="col-span-2"
              />
              <Input
                name="uuid"
                type="text"
                placeholder="UUID"
                value={formData.uuid}
                onChange={handleChange}
                className="col-span-2"
              />
            </div>

            <div className="flex items-center justify-end mt-6 gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAssignmentFilePage;
