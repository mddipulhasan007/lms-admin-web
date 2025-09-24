

"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const UserCreateForm = () => {
    const [loading, setLoading] = useState(false);
    return (
        <form>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
                <div className="rounded-lg bg-card text-card-foreground shadow-base">
                <div className="space-y-1.5 p-6 pb-0 flex flex-row items-center">
                    <h3 className="text-2xl font-semibold tracking-tight flex-1 leading-normal">Role Create</h3>
                </div>
                <div className="space-y-4 p-6">
                    <div className="flex items-center space-x-4">
                        <Input type="text" placeholder="Enter value" value="" />
                        <Input type="number" placeholder="Enter value" value="" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Input type="text" placeholder="Enter value" value="" />
                        <Input type="text" placeholder="Enter value" value="" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Input type="text" placeholder="Enter value" value="" />
                        <Input type="number" placeholder="Enter value" value="" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Input type="text" placeholder="Enter value" value="" />
                        <Input type="text" placeholder="Enter value" value="" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Input type="number" placeholder="Enter value" value="" />
                        <Input type="number" placeholder="Enter value" value="" />
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
    )
}

export default UserCreateForm