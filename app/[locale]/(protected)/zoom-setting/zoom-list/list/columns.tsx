"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreVertical, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type ZoomAccount = {
  id: number;
  user_id: number;
  account_id: string;
  api_key: string;
  api_secret: string;
  timezone: string;
  host_video: number;
  participant_video: number;
  waiting_room: number;
  status: number;
  uuid: string;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<ZoomAccount>[] = [
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
    accessorKey: "account_id",
    header: "Account ID",
  },
  {
    accessorKey: "api_key",
    header: "API Key",
  },
  {
    accessorKey: "api_secret",
    header: "API Secret",
  },
  {
    accessorKey: "timezone",
    header: "Timezone",
  },
  {
    accessorKey: "host_video",
    header: "Host Video",
    cell: ({ row }) => (row.original.host_video === 1 ? "Yes" : "No"),
  },
  {
    accessorKey: "participant_video",
    header: "Participant Video",
    cell: ({ row }) => (row.original.participant_video === 1 ? "Yes" : "No"),
  },
  {
    accessorKey: "waiting_room",
    header: "Waiting Room",
    cell: ({ row }) => (row.original.waiting_room === 1 ? "Yes" : "No"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const label = status === 1 ? "Active" : "Inactive";
      const colorClass = status === 1
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";

      return (
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${colorClass}`}>
          {label}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-7 h-7 border-default-200 dark:border-default-300 text-default-400"
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
                  className="w-7 h-7 border-default-200 dark:border-default-300 text-default-400"
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
                  className="w-7 h-7 border-default-200 dark:border-default-300 text-default-400"
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
