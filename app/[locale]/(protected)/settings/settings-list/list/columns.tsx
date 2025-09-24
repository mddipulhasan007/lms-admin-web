"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Settings = {
  option_key: string;
  option_value: string;
  type: string;
  status: number;
  id: number;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<Settings>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "option_key",
    header: "Option Key",
  },
  {
    accessorKey: "option_value",
    header: "Option Value",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={row.original.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
        {row.original.status ? "Active" : "Inactive"}
      </Badge>
    ),
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
    id: "actions", // ✅ custom cell only
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => (
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
    ),
  },
];
