"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  createCourse,
  createCourseResource,
  createCourseLesson,
  createCourseLecture,
  getCategories,
  getCourseLanguages,
} from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  { id: 1, title: "Course" },
  { id: 2, title: "Course Resource" },
  { id: 3, title: "Course Lesson" },
  { id: 4, title: "Course Lecture" },
  { id: 5, title: "Finished" },
];

const CourseCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);

  const [formData, setFormData] = useState<any>({
    course_id: "",
    lesson_id: "",
    lecture_id: "",

    // Step 1
    category_id: "",
    course_language_id: "",
    title: "",
    subtitle: "",
    description: "",
    feature_details: "",
    price: "",
    old_price: "",
    learner_accessibility: "",
    image: null,
    slug: "",
    intro_video_check: "",
    video: null,
    youtube_video_id: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    og_image: null,
    private_mode: 0,
    is_featured: 0,
    status: 1,
    is_subscription_enable: 0,
    access_period: "",

    // Step 2
    original_filename: "",
    file: null,
    size_bytes: "",
    mime_type: "",

    // Step 3
    lesson_name: "",
    lesson_description: "",

    // Step 4
    lecture_title: "",
    lecture_text: "",
  });

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data || []));
    getCourseLanguages().then((res) => setLanguages(res.data || []));
  }, []);

  // ✅ unified input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement;
  
    // Handle file inputs
    if (type === "file" && files && files[0]) {
      setFormData((prev: any) => ({ ...prev, [name]: files[0] }));
      return;
    }
  
    // Handle radio inputs (convert to number 0/1)
    if (type === "radio") {
      setFormData((prev: any) => ({ ...prev, [name]: Number(value) }));
      return;
    }
  
    // Handle number inputs
    if (type === "number") {
      setFormData((prev: any) => ({ ...prev, [name]: Number(value) }));
      return;
    }
  
    // Default (text, textarea, select)
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // ✅ File uploader helper
  const uploadFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      throw new Error("File upload failed");
    }

    return res.json();
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      // Handle uploads before saving to DB
      let imageUrl = formData.image;
      let ogImageUrl = formData.og_image;
      let videoUrl = formData.video;
      let fileUrl = formData.file;

      if (formData.image instanceof File) {
        const up = await uploadFile(formData.image);
        imageUrl = up.url;
      }
      if (formData.og_image instanceof File) {
        const up = await uploadFile(formData.og_image);
        ogImageUrl = up.url;
      }
      if (formData.video instanceof File) {
        const up = await uploadFile(formData.video);
        videoUrl = up.url;
      }
      if (formData.file instanceof File) {
        const up = await uploadFile(formData.file);
        fileUrl = up.url;
      }

      if (step === 1) {
        const res = await createCourse({
          user_id: 4, // replace with logged in user
          category_id: formData.category_id,
          course_language_id: formData.course_language_id,
          title: formData.title,
          subtitle: formData.subtitle,
          description: formData.description,
          feature_details: formData.feature_details,
          price: formData.price,
          old_price: formData.old_price,
          learner_accessibility: formData.learner_accessibility,
          image: imageUrl,
          slug: formData.slug,
          private_mode: formData.private_mode,
          is_featured: formData.is_featured,
          status: formData.status,
          is_subscription_enable: formData.is_subscription_enable,
          access_period: formData.access_period,
          meta_title: formData.meta_title,
          meta_description: formData.meta_description,
          meta_keywords: formData.meta_keywords,
          og_image: ogImageUrl,
          intro_video_check: formData.intro_video_check,
          video: videoUrl,
          youtube_video_id: formData.youtube_video_id,
        });
        setFormData((prev: any) => ({ ...prev, course_id: res.data.id }));
        toast.success("✅ Course created successfully !");
      }

      if (step === 2) {
        await createCourseResource({
          course_id: formData.course_id,
          original_filename: formData.original_filename,
          file: fileUrl,
          size_bytes: formData.size_bytes,
          mime_type: formData.mime_type,
        });
        toast.success("✅ Resource saved successfully !");
      }

      if (step === 3) {
        const lesson = await createCourseLesson({
          course_id: formData.course_id,
          name: formData.lesson_name,
          short_description: formData.lesson_description,
          sort_order: 1,
          status: 1,
        });
        setFormData((prev: any) => ({ ...prev, lesson_id: lesson.data.id }));
        toast.success("✅ Lesson created successfully !");
      }

      if (step === 4) {
        await createCourseLecture({
          course_id: formData.course_id,
          lesson_id: formData.lesson_id,
          title: formData.lecture_title,
          text: formData.lecture_text,
          lecture_type: 2,
          type: "live",
          live_meeting_link: "link",
          live_start_time: new Date().toISOString(),
          live_end_time: new Date().toISOString(),
          live_platform: "zoom",
          status: 1,
        });
        toast.success("🎉 Lecture created successfully!");
        //router.push("/en/course/course-list");
        //return;
      }

      setStep((prev) => Math.min(prev + 1, steps.length));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const slugify = (text: string) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

  useEffect(() => {
    if (formData.title) {
      setFormData((prev: any) => ({
        ...prev,
        slug: slugify(formData.title),
      }));
    }
  }, [formData.title]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-12 gap-6 p-6">
      {/* Stepper */}
      <div className="lg:col-span-12 col-span-12">
        <div className="flex relative items-center">
          {steps.map((s, idx) => (
            <div key={s.id} className="relative flex-1 flex flex-col items-center">
              <div
                className={`${
                  step === s.id ? "bg-slate-900 text-white" : "bg-white text-slate-700 border"
                } h-10 w-10 flex items-center justify-center rounded-full font-semibold z-10`}
              >
                {s.id}
              </div>
              <p
                className={`mt-3 text-sm ${
                  step === s.id ? "text-slate-900 font-medium" : "text-slate-500"
                }`}
              >
                {s.title}
              </p>
              {idx < steps.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-[2px] bg-slate-300 -z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="lg:col-span-12 col-span-12">
        <div className="rounded-lg bg-card text-card-foreground shadow-base p-6">
          {/* --- STEP 1: COURSE --- */}
          {step === 1 && (
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Course</h3>

              {/* Dropdowns */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <select
                  name="course_language_id"
                  value={formData.course_language_id}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Language</option>
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title + Subtitle */}
              <div className="grid grid-cols-2 gap-4">
                <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                <Input name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} />
              </div>

              {/* Description + Feature Details */}
              <div className="grid grid-cols-2 gap-4">
                <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <Textarea name="feature_details" placeholder="Feature Details" value={formData.feature_details} onChange={handleChange} />
              </div>

              {/* Price + Old Price */}
              <div className="grid grid-cols-2 gap-4">
                <Input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} />
                <Input name="old_price" type="number" placeholder="Old Price" value={formData.old_price} onChange={handleChange} />
              </div>

              {/* Slug + Accessibility */}
              <div className="grid grid-cols-2 gap-4">
                <Input name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} readOnly />
                <select
                  name="learner_accessibility"
                  value={formData.learner_accessibility}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Accessibility</option>
                  <option value="paid">Paid</option>
                  <option value="free">Free</option>
                </select>
              </div>

              {/* Switches */}
              {/* Private Mode */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-semibold">Private Mode</span>
                  <div className="flex gap-4 mt-1">
                    <label>
                      <input
                        type="radio"
                        name="private_mode"
                        value="1"
                        checked={formData.private_mode === 1}
                        onChange={handleChange}
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="private_mode"
                        value="0"
                        checked={formData.private_mode === 0}
                        onChange={handleChange}
                      />{" "}
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-semibold">Featured</span>
                  <div className="flex gap-4 mt-1">
                    <label>
                      <input
                        type="radio"
                        name="is_featured"
                        value="1"
                        checked={formData.is_featured === 1}
                        onChange={handleChange}
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="is_featured"
                        value="0"
                        checked={formData.is_featured === 0}
                        onChange={handleChange}
                      />{" "}
                      No
                    </label>
                  </div>
                </div>
              </div>

              {/* Status & Subscription */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-semibold">Status</span>
                  <div className="flex gap-4 mt-1">
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="1"
                        checked={formData.status === 1}
                        onChange={handleChange}
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="0"
                        checked={formData.status === 0}
                        onChange={handleChange}
                      />{" "}
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-semibold">Subscription</span>
                  <div className="flex gap-4 mt-1">
                    <label>
                      <input
                        type="radio"
                        name="is_subscription_enable"
                        value="1"
                        checked={formData.is_subscription_enable === 1}
                        onChange={handleChange}
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="is_subscription_enable"
                        value="0"
                        checked={formData.is_subscription_enable === 0}
                        onChange={handleChange}
                      />{" "}
                      No
                    </label>
                  </div>
                </div>
              </div>

              {/* Access Period + Meta Title */}
              <div className="grid grid-cols-2 gap-4">
                <Input name="access_period" placeholder="Access Period days" value={formData.access_period} onChange={handleChange} />
                <Input name="meta_title" placeholder="Meta Title" value={formData.meta_title} onChange={handleChange} />
              </div>

              {/* SEO */}
              <div className="grid grid-cols-2 gap-4">
                <Input name="meta_description" placeholder="Meta Description" value={formData.meta_description} onChange={handleChange} />
                <Input name="meta_keywords" placeholder="Meta Keywords" value={formData.meta_keywords} onChange={handleChange} />
              </div>

              {/* Video Choice */}
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="intro_video_check"
                  value={formData.intro_video_check}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select Intro Video</option>
                  <option value="1">Uploaded Video</option>
                  <option value="2">YouTube Video</option>
                </select>
                {formData.intro_video_check === "1" && (
                  <Input
                    type="file"
                    name="video"
                    accept="video/*"   // ✅ only video files allowed
                    onChange={handleChange}
                  />
                )}
                {formData.intro_video_check === "2" && (
                  <Input name="youtube_video_id" placeholder="YouTube Video ID" value={formData.youtube_video_id} onChange={handleChange} />
                )}
              </div>

              {/* Images */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Upload Image</label>
                  <Input type="file" name="image" onChange={handleChange} />
                </div>
                <div>
                  <label>Upload OG Image</label>
                  <Input type="file" name="og_image" onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {/* --- STEP 2: RESOURCE --- */}
          {step === 2 && (
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Course Resource</h3>
              <Input name="original_filename" placeholder="Original Filename" value={formData.original_filename} onChange={handleChange} />
              <Input name="size_bytes" type="number" placeholder="Size (bytes)" value={formData.size_bytes} onChange={handleChange} />
              <Input name="mime_type" placeholder="MIME Type" value={formData.mime_type} onChange={handleChange} />
              <div>
                <label>Upload File</label>
                <Input type="file" name="file" onChange={handleChange} />
              </div>
            </div>
          )}

          {/* --- STEP 3: LESSON --- */}
          {step === 3 && (
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Course Lesson</h3>
              <Input name="lesson_name" placeholder="Lesson Name" value={formData.lesson_name} onChange={handleChange} />
              <Textarea name="lesson_description" placeholder="Lesson Description" value={formData.lesson_description} onChange={handleChange} />
            </div>
          )}

          {/* --- STEP 4: LECTURE --- */}
          {step === 4 && (
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Course Lecture</h3>
              <Input name="lecture_title" placeholder="Lecture Title" value={formData.lecture_title} onChange={handleChange} />
              <Input name="lecture_text" placeholder="Lecture Text" value={formData.lecture_text} onChange={handleChange} />
            </div>
          )}

          {/* --- STEP 5: FINISHED --- */}
          {step === 5 && (
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold text-center">Finished ✅</h3>
              <p className="text-center">Your course has been created successfully!</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <Button type="button" onClick={prevStep} variant="outline">
                Previous
              </Button>
            ) : (
              <div />
            )}

            {/* Step 1–4 → Next | Step 5 → Submit */}
            {step < steps.length ? (
              <Button type="button" onClick={handleNext} disabled={loading}>
                {loading ? "Saving..." : "Next"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => router.push("/en/course/course-list")}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CourseCreateForm;
