"use client"
import * as React from "react";
import SiteBreadcrumb from "@/components/site-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { getRolePermission, updateRolePermission, deleteRolePermission } from "@/lib/api";

export default function EditRolePermissionPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params as any)?.id as string;
  const [json, setJson] = React.useState("");

  React.useEffect(() => {
    (async () => {
      if(id) {
        const data = await getRolePermission(id);
        setJson(JSON.stringify(data, null, 2));
      }
    })();
  }, [id]);

  const handleUpdate = async (e:any) => {
    e.preventDefault();
    const payload = JSON.parse(json || "{}");
    await updateRolePermission(id, payload);
    router.back();
  };

  const handleDelete = async () => {
    await deleteRolePermission(id);
    router.back();
  };

  return (
    <div className="space-y-6">
      <SiteBreadcrumb />
      <Card>
        <CardContent className="p-4 space-y-4">
          <form onSubmit={{handleUpdate}} className="space-y-4">
            <div className="space-y-2">
              <Label>Payload (JSON)</Label>
              <Textarea value={json} onChange={(e) => setJson(e.target.value)} className="min-h-[240px]" />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Update</Button>
              <Button type="button" variant="destructive" onClick={{handleDelete}}>Delete</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}