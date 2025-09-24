"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ColumnDef } from "@tanstack/react-table"
import { Eye, MoreVertical, SquarePen, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"

// 🔸 Role type based on your API response
export type Role = {
  id: number;
  slug: string;
  name: string;
  note: string;
  is_default: number;
  is_super_admin: number;
  status: number;
  created_at: string;
  modified_at: string;
  uuid: string;
  created_by: number;
  modified_by: number;
};

export const columns: ColumnDef<Role>[] = [
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
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "is_default",
    header: "Default",
    cell: ({ row }) => (
      <Badge className={row.original.is_default ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-800"}>
        {row.original.is_default ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "is_super_admin",
    header: "Super Admin",
    cell: ({ row }) => (
      <Badge className={row.original.is_super_admin ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-800"}>
        {row.original.is_super_admin ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status === 0 ? "Active" : "Inactive";
      const classes = row.original.status === 0
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";
      return <span className={`text-xs font-medium px-2 py-1 rounded-full ${classes}`}>{status}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="w-7 h-7 text-muted-foreground">
                <Eye className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="w-7 h-7 text-muted-foreground">
                <SquarePen className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="w-7 h-7 text-muted-foreground">
                <Trash2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-destructive text-destructive-foreground">
              Delete
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
]
