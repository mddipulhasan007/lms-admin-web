"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { createArchiveVideo } from "@/lib/api";

const VideoCreateForm = () => {
  const [formData, setFormData] = useState({
    course_id: 0,
    batch_id: 0,
    lesson_id: 0,
    lecture_id: 0,
    title: "",
    description: "",
    video_url: "",
    duration_seconds: 0,
    status: 1,
    uuid: "",
  });

  const [loading, setLoading] = useState(false);

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
      const res = await createArchiveVideo(formData);
      toast.success("Archive video created successfully!");
      console.log("Created:", res);
      setFormData({
        course_id: 0,
        batch_id: 0,
        lesson_id: 0,
        lecture_id: 0,
        title: "",
        description: "",
        video_url: "",
        duration_seconds: 0,
        status: 1,
        uuid: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to create archive video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
        <div className="rounded-lg bg-card text-card-foreground shadow-base">
          <div className="space-y-1.5 p-6 pb-0 flex flex-row items-center">
            <h3 className="text-2xl font-semibold flex-1">Archive Video Create</h3>
          </div>

          <div className="space-y-4 p-6">
            <div className="flex items-center space-x-4">
              <Input
                name="course_id"
                type="number"
                placeholder="Course ID"
                value={formData.course_id}
                onChange={handleChange}
              />
              <Input
                name="batch_id"
                type="number"
                placeholder="Batch ID"
                value={formData.batch_id}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Input
                name="lesson_id"
                type="number"
                placeholder="Lesson ID"
                value={formData.lesson_id}
                onChange={handleChange}
              />
              <Input
                name="lecture_id"
                type="number"
                placeholder="Lecture ID"
                value={formData.lecture_id}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Input
                name="title"
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
              <Input
                name="description"
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Input
                name="video_url"
                type="text"
                placeholder="Video URL"
                value={formData.video_url}
                onChange={handleChange}
              />
              <Input
                name="uuid"
                type="text"
                placeholder="UUID"
                value={formData.uuid}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Input
                name="duration_seconds"
                type="number"
                placeholder="Duration (seconds)"
                value={formData.duration_seconds}
                onChange={handleChange}
              />
              <Input
                name="status"
                type="number"
                placeholder="Status"
                value={formData.status}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-end p-6">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default VideoCreateForm;
