"use client"
import * as React from "react";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { createForumPostComment } from "@/lib/api";

export default function CreateForumPostCommentPage() {
  const router = useRouter();
  const [json, setJson] = React.useState("{}");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const payload = JSON.parse(json || "{}");
    await createForumPostComment(payload);
    router.back();
  };

  return (
    <div className="space-y-6">
      <SiteBreadcrumb />
      <Card>
        <CardContent className="p-4 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Payload (JSON)</Label>
              <Textarea value={json} onChange={(e) => setJson(e.target.value)} className="min-h-[200px]" />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Create</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}