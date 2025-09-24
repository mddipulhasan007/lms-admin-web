"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { createUser } from "@/lib/api";
import { useRouter } from "next/navigation";

const UserCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile_number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createUser(form);
      toast.success(res.message || "User created successfully ✅");
      setForm({ name: "", email: "", mobile_number: "" }); // reset form
    } catch (err: any) {
      toast.error(err.message || "Failed to create user ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
        <div className="rounded-lg bg-card text-card-foreground shadow-base">
          <div className="space-y-1.5 p-6 pb-0 flex flex-row items-center">
            <h3 className="text-2xl font-semibold tracking-tight flex-1 leading-normal">
              User Create
            </h3>
            <Button type="button" size="md" onClick={() => router.push("/en/users/user-list")}>
                Manage Users
            </Button>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-center space-x-4">
              <Input
                name="name"
                type="text"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2 flex items-center space-x-2">
              <Input
                name="mobile_number"
                type="text"
                placeholder="Enter mobile number"
                value={form.mobile_number}
                onChange={handleChange}
                required
              />
              <div></div>
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

export default UserCreateForm;
