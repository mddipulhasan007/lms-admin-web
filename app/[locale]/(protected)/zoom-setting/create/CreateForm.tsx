"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createZoomSettings } from "@/lib/api"
import { toast } from "sonner";

const ZoomCreateForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      user_id: 3,
      account_id: "acc-12345",
      api_key: "key-12345",
      api_secret: "secret-abc",
      timezone: "Asia/Dhaka",
      host_video: 1,
      participant_video: 1,
      waiting_room: 1,
      status: 1,
      uuid: "uuid-xyz"
    };

    const response = await createZoomSettings(payload);

    if (response) {
      toast.success("Zoom setting created successfully");
    } else {
      toast.error("Failed to create Zoom setting");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
        <div className="rounded-lg bg-card text-card-foreground shadow-base">
          <div className="space-y-1.5 p-6 pb-0 flex flex-row items-center">
            <h3 className="text-2xl font-semibold tracking-tight flex-1 leading-normal">Zoom Create</h3>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-center space-x-4">
              <Input type="text" placeholder="uuid" value="uuid-xyz" />
              <Input type="number" placeholder="status" value="2" />
            </div>
            <div className="flex items-center space-x-4">
              <Input type="text" placeholder="api secret" value="secret-abc" />
              <Input type="text" placeholder="api key" value="key-12345" />
            </div>
            <div className="flex items-center space-x-4">
              <Input type="text" placeholder="account id" value="acc-12345" />
              <Input type="number" placeholder="user id" value="4" />
            </div>
            <div className="flex items-center space-x-4">
              <Input type="text" placeholder="host_video" value="5" />
              <Input type="text" placeholder="timezone" value="Asia/Dhaka" />
            </div>
            <div className="flex items-center space-x-4">
              <Input type="number" placeholder="participant_video" value="7" />
              <Input type="number" placeholder="waiting_room" value="8" />
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

export default ZoomCreateForm;