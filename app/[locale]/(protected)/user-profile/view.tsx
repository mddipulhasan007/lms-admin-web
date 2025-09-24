"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserProfile } from "@/lib/api";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    status: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const uuid = localStorage.getItem("uuid"); // ✅ must be saved after login
        if (!uuid) throw new Error("User not found in localStorage");

        const userData = await getUserProfile(uuid);
        setUser({
          name: userData.name || "",
          email: userData.email || "",
          status: String(userData.status ?? ""),
        });
      } catch (err: any) {
        toast.error(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3 className="text-xl font-semibold">Profile</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Status: {user.status}</p>
        </>
      )}
    </div>
  );
};

export default UserProfile;
