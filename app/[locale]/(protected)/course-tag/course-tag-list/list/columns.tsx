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
import { deleteUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export type User = {
  id: number;
  uuid: string;
  name: string;
  email: string;
  mobile_number: string;
  login_ip: string;
  created_at: string;
  updated_at: string;
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
    header: "Mobile Number",
    cell: ({ row }) => row.original.mobile_number || "No mobile number",
  },
  {
    accessorKey: "login_ip",
    header: "Login IP",
    cell: ({ row }) => row.original.login_ip || "No login ip",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.created_at);
      return <span>{createdAt.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt = new Date(row.original.updated_at);
      return <span>{updatedAt.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const raw = row.getValue("status");
      const rawStatus = raw !== null && raw !== undefined ? Number(raw) : 0;
      const statusLabel = rawStatus === 1 ? "Active" : "Inactive";

      const statusColors: Record<string, string> = {
        Active: "bg-green-100 text-green-700",
        Inactive: "bg-red-100 text-red-700"
      };

      return (
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[statusLabel]}`}>
          {statusLabel}
        </span>
      );
    }
  },
  {
    id: "actions",
    accessorKey: "action",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this user?")) return;
      
        try {
          const token = localStorage.getItem("access_token"); // ✅ match login storage
          if (!token) {
            alert("Unauthorized: No token found");
            return;
          }
      
          const res = await deleteUser(row.original.uuid, token);
      
          alert(res.message || "User deleted successfully");

          window.location.reload();
      
        } catch (error: any) {
          alert(error.message || "Failed to delete user");
        }
      };

      const router = useRouter();

      const handleEdit = () => {
        // Navigate to edit page with user UUID
        router.push(`/en/users/edit/${row.original.uuid}`);
      };

      return (
        <div className="flex items-center gap-2">
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-7 h-7"
                  onClick={handleEdit} // ✅ navigate to edit route
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
      )
    }
  }
];
