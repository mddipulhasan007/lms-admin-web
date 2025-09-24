"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import UserList from "./list";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { toast } from "sonner";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const UsersPage = () => {
  const [sessionActive, setSessionActive] = useState<boolean | null>(null); // null = loading

  // Check session on mount
  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const res = await fetch(`${apiBaseUrl}/api/v1/auth/test-session`, {
  //         method: "GET",
  //         credentials: "include", // ✅ send session cookie
  //       });
  //       const data = await res.json();

  //       if (!res.ok) throw new Error(data.detail || "Session inactive");

  //       toast.success("✅ Session is active");
  //       setSessionActive(true);
  //     } catch (err: any) {
  //       toast.error(err.message || "❌ Session invalid");
  //       setSessionActive(false);
  //     }
  //   };

  //   checkSession();
  // }, []);

  // if (sessionActive === null) {
  //   // Loading state while checking session
  //   return <div className="p-4">Checking session...</div>;
  // }

  // if (!sessionActive) {
  //   // Not logged in
  //   return (
  //     <div className="p-4 text-red-600">
  //       ❌ You are not logged in or session expired.
  //     </div>
  //   );
  // }

  return (
    <div>
      <SiteBreadcrumb />
      <div className="space-y-6">
        <Card>
          <CardContent className="p-0">
            <UserList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersPage;
