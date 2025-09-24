
"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ColumnDef } from "@tanstack/react-table";

import { Eye, MoreVertical, SquarePen, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";

export type User = {
  id: number;
  name: string;
  email: string;
  mobile_number: string | null;
  email_verify: boolean;
  mobile_verify: boolean;
  status: number; // 0 or 1
  action: React.ReactNode;
};

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name || "Unknown",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email || "No Email",
  },
  {
    accessorKey: "mobile_number",
    header: "Mobile",
    cell: ({ row }) => row.original.mobile_number || "No Mobile",
  },
  {
    accessorKey: "email_verify",
    header: "Email Verify",
    cell: ({ row }) => {
      const isVerified = row.original.email_verify;
      return (
        <Badge className={isVerified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
          {isVerified ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "mobile_verify",
    header: "Mobile Verify",
    cell: ({ row }) => {
      const isVerified = row.original.mobile_verify;
      return (
        <Badge className={isVerified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
          {isVerified ? "Yes" : "No"}
        </Badge>
      );
    },
  },  
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const raw = row.getValue("status");
  //     const rawStatus = raw !== null && raw !== undefined ? Number(raw) : 0;
  //     const statusLabel = rawStatus === 0 ? "Active" : "Inactive";
  
  //     const statusColors: Record<string, string> = {
  //       Active: "bg-green-100 text-green-700",
  //       Inactive: "bg-red-100 text-red-700"
  //     };
  
  //     return (
  //       <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[statusLabel]}`}>
  //         {statusLabel}
  //       </span>
  //     );
  //   }
  // },  
  {
    id: "actions",
    accessorKey: "action",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300  text-default-400"
                  color="secondary"
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
                  className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300  text-default-400"
                  color="secondary"
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
                  className="w-7 h-7 ring-offset-transparent border-default-200 dark:border-default-300  text-default-400"
                  color="secondary"
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
  }
];
