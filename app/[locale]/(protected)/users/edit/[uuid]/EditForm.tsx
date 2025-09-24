"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { getUser, editUser } from "@/lib/api";

const UserEditForm = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params?.uuid as string;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile_number: "",
  });

  // Fetch user data and prefill form
  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        setLoading(true);
        const user = await getUser(userId);
        setForm({
          name: user.name || "",
          email: user.email || "",
          mobile_number: user.mobile_number || "",
        });
      } catch (err: any) {
        toast.error(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await editUser(userId, form);
      toast.success(res.message || "User updated successfully ✅");
      router.push("/en/users/user-list"); // redirect after update
    } catch (err: any) {
      toast.error(err.message || "Failed to update user ❌");
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
              Edit User
            </h3>
            <Button
              type="button"
              size="md"
              onClick={() => router.push("/en/users/user-list")}
            >
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
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserEditForm;
