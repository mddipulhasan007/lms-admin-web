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

const steps = [
  { id: 1, title: "Course" },
  { id: 2, title: "Course Resource" },
  { id: 3, title: "Course Lesson" },
  { id: 4, title: "Course Lecture" },
];

const CourseCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter(); // ✅ hook
  // Dropdowns
  const [categories, setCategories] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);

  // form state
  const [formData, setFormData] = useState<any>({
    course_id: "",
    lesson_id: "",
    lecture_id: "",

    // Step 1: Course
    category_id: "",
    course_language_id: "",
    title: "",
    subtitle: "",
    description: "",
    feature_details: "",
    price: "",
    old_price: "",
    learner_accessibility: "",
    image: "",
    slug: "",

    // Step 2: Resource
    original_filename: "",
    file: "",
    size_bytes: "",
    mime_type: "",

    // Step 3: Lesson
    lesson_name: "",
    lesson_description: "",

    // Step 4: Lecture
    lecture_title: "",
    lecture_text: "",
  });

  useEffect(() => {
    // fetch dropdown data
    getCategories().then((res) => setCategories(res.data || []));
    getCourseLanguages().then((res) => setLanguages(res.data || []));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      if (step === 1) {
        const res = await createCourse({
          user_id: 4, // TODO: replace with logged in user id
          category_id: formData.category_id,
          course_language_id: formData.course_language_id,
          title: formData.title,
          subtitle: formData.subtitle,
          description: formData.description,
          feature_details: formData.feature_details,
          price: formData.price,
          old_price: formData.old_price,
          learner_accessibility: formData.learner_accessibility,
          image: formData.image,
          slug: formData.slug,
          status: 1,
        });
        setFormData((prev: any) => ({ ...prev, course_id: res.data.id }));
        toast.success("✅ Course created successfully !");
      }

      if (step === 2) {
        await createCourseResource({
          course_id: formData.course_id,
          original_filename: formData.original_filename,
          file: formData.file,
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

        // ✅ Redirect after success
        router.push("/en/course/course-list");
        return; // stop here, don’t run setStep again
      }

      setStep((prev) => Math.min(prev + 1, steps.length));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-12 gap-6 p-6">
      {/* Sidebar */}
      <div className="lg:col-span-3 col-span-12">
        <div className="flex flex-col relative">
          {steps.map((s, idx) => (
            <div key={s.id} className="relative flex-1">
              <div
                className={`${
                  step === s.id
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 border"
                } h-10 w-10 flex items-center justify-center rounded-full font-semibold mx-auto`}
              >
                {s.id}
              </div>
              {idx < steps.length - 1 && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 h-full w-[2px] bg-slate-300"></div>
              )}
              <p
                className={`text-center my-5 ${
                  step === s.id ? "text-slate-900 font-medium" : "text-slate-500"
                }`}
              >
                {s.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-9 col-span-12">
        <div className="rounded-lg bg-card text-card-foreground shadow-base p-6">
          {step === 1 && (
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Course</h3>
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
              <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
              <Input name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} />
              <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
              <Input name="feature_details" placeholder="Feature Details" value={formData.feature_details} onChange={handleChange} />
              <Input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} />
              <Input name="old_price" type="number" placeholder="Old Price" value={formData.old_price} onChange={handleChange} />
              <Input name="learner_accessibility" placeholder="Accessibility" value={formData.learner_accessibility} onChange={handleChange} />
              <Input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
              <Input name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} />
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Course Resource</h3>
              <Input name="original_filename" placeholder="Original Filename" value={formData.original_filename} onChange={handleChange} />
              <Input name="file" placeholder="File URL" value={formData.file} onChange={handleChange} />
              <Input name="size_bytes" type="number" placeholder="Size (bytes)" value={formData.size_bytes} onChange={handleChange} />
              <Input name="mime_type" placeholder="MIME Type" value={formData.mime_type} onChange={handleChange} />
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Course Lesson</h3>
              <Input name="lesson_name" placeholder="Lesson Name" value={formData.lesson_name} onChange={handleChange} />
              <Input name="lesson_description" placeholder="Lesson Description" value={formData.lesson_description} onChange={handleChange} />
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Course Lecture</h3>
              <Input name="lecture_title" placeholder="Lecture Title" value={formData.lecture_title} onChange={handleChange} />
              <Input name="lecture_text" placeholder="Lecture Text" value={formData.lecture_text} onChange={handleChange} />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-10">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                Previous
              </Button>
            ) : (
              <div />
            )}
            {step < steps.length ? (
              <Button type="button" onClick={handleNext} disabled={loading}>
                {loading ? "Saving..." : "Next"}
              </Button>
            ) : (
              <Button type="button" onClick={handleNext} disabled={loading}>
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
