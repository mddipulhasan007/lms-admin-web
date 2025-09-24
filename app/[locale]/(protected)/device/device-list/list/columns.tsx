import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, SquarePen, Trash2 } from "lucide-react";

export type Device = {
  id: number;
  device_uuid: string;
  device_type: string;
  ip: string;
  device_hijacked_at: string;
  data: string;
  deleted_at: string;
  uuid: string;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<Device>[] = [
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
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "device_uuid",
    header: "Device UUID",
  },
  {
    accessorKey: "device_type",
    header: "Device Type",
  },
  {
    accessorKey: "ip",
    header: "IP Address",
  },
  {
    accessorKey: "device_hijacked_at",
    header: "Hijacked At",
  },
  {
    accessorKey: "data",
    header: "Data",
  },
  {
    accessorKey: "deleted_at",
    header: "Deleted At",
  },
  {
    accessorKey: "uuid",
    header: "UUID",
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
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="w-7 h-7 text-default-400">
                <Eye className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="w-7 h-7 text-default-400">
                <SquarePen className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="w-7 h-7 text-default-400">
                <Trash2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-destructive text-destructive-foreground">Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
];
