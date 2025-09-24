"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export type Permission = {
  id: number;
  role_id: number;
  menu_id: number;
  is_add: boolean;
  is_edit: boolean;
  is_view: boolean;
  is_delete: boolean;
  is_download: boolean;
  is_upload: boolean;
  is_print: boolean;
  is_approve: boolean;
  status: number;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<Permission>[] = [
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "role_id",
    header: "Role ID",
  },
  {
    accessorKey: "menu_id",
    header: "Menu ID",
  },
  {
    accessorKey: "is_add",
    header: "Add",
    cell: ({ row }) => (
      <Badge className={row.original.is_add ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{row.original.is_add ? "Yes" : "No"}</Badge>
    )
  },
  {
    accessorKey: "is_edit",
    header: "Edit",
    cell: ({ row }) => (
      <Badge className={row.original.is_edit ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{row.original.is_edit ? "Yes" : "No"}</Badge>
    )
  },
  {
    accessorKey: "is_view",
    header: "View",
    cell: ({ row }) => (
      <Badge className={row.original.is_view ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{row.original.is_view ? "Yes" : "No"}</Badge>
    )
  },
  {
    accessorKey: "is_delete",
    header: "Delete",
    cell: ({ row }) => (
      <Badge className={row.original.is_delete ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{row.original.is_delete ? "Yes" : "No"}</Badge>
    )
  },
  {
    accessorKey: "is_download",
    header: "Download",
    cell: ({ row }) => (
      <Badge className={row.original.is_download ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{row.original.is_download ? "Yes" : "No"}</Badge>
    )
  },
  {
    accessorKey: "is_upload",
    header: "Upload",
    cell: ({ row }) => (
      <Badge className={row.original.is_upload ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{row.original.is_upload ? "Yes" : "No"}</Badge>
    )
  },
  {
    accessorKey: "is_print",
    header: "Print",
    cell: ({ row }) => (
      <Badge className={row.original.is_print ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{row.original.is_print ? "Yes" : "No"}</Badge>
    )
  },
  {
    accessorKey: "is_approve",
    header: "Approve",
    cell: ({ row }) => (
      <Badge className={row.original.is_approve ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{row.original.is_approve ? "Yes" : "No"}</Badge>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const rawStatus = row.original.status;
      const label = rawStatus === 1 ? "Active" : "Inactive";
      const cls = rawStatus === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
      return <Badge className={cls}>{label}</Badge>;
    }
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300 text-default-400"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>View</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300 text-default-400"
              >
                <SquarePen className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300 text-default-400"
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
    )
  }
];
