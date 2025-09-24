"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { deleteCourse } from "@/lib/api"; // 👈 you’ll need this API like deleteUser

export type Course = {
  id: number;
  uuid: string;
  category_id: number;
  course_language_id: number;
  title: string;
  subtitle: string;
  description: string;
  feature_details: string;
  price: number;
  old_price: number;
  learner_accessibility: string;
  image: string;
  slug: string;
  status: number;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<Course>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="xl:w-16">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => row.original.title || "Untitled",
  },
  {
    accessorKey: "subtitle",
    header: "Subtitle",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `$${row.original.price}`,
  },
  {
    accessorKey: "old_price",
    header: "Old Price",
    cell: ({ row }) => (row.original.old_price ? `$${row.original.old_price}` : "-"),
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status === 1 ? "Active" : "Inactive";
      return (
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.created_at);
      return <span>{createdAt.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt = new Date(row.original.updated_at);
      return <span>{updatedAt.toLocaleDateString()}</span>;
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const router = useRouter();

      const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this course?")) return;
        try {
          const token = localStorage.getItem("access_token");
          if (!token) {
            alert("Unauthorized: No token found");
            return;
          }
          const res = await deleteCourse(row.original.uuid, token);
          alert(res.message || "Course deleted successfully");
          window.location.reload();
        } catch (error: any) {
          alert(error.message || "Failed to delete course");
        }
      };

      const handleEdit = () => {
        router.push(`/en/course/edit/${row.original.uuid}`);
      };

      return (
        <div className="flex items-center gap-2">
          {/* View */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="w-7 h-7">
                  <Eye className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Edit */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-7 h-7"
                  onClick={handleEdit}
                >
                  <SquarePen className="w-3 h-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Delete */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  size="icon"
                  className="w-7 h-7 text-red-500 border-red-300 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-destructive text-destructive-foreground">
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
