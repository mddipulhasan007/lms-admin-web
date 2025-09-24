"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/lib/api";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const ProfileInfo = () => {
  const router = useRouter();

  // 👇 load user info from localStorage or context
  const session =
    typeof window !== "undefined"
      ? {
          user: {
            name: localStorage.getItem("user_name") || "Admin",
            email: localStorage.getItem("user_email") || "admin@gmail.com",
            image: localStorage.getItem("user_image") || "/images/users/user-1.jpg",
          },
        }
      : null;

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      toast.success(res.message);
  
      // ✅ Wait a tick to make sure cookie is cleared
      setTimeout(() => {
        // redirect to home
        router.push("/en");
      }, 100); 
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="md:block hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="flex items-center gap-3 text-default-800">
            <Image
              src={session?.user?.image as string}
              alt={session?.user?.name?.charAt(0) as string}
              width={36}
              height={36}
              className="rounded-full"
            />
            <div className="text-sm font-medium capitalize lg:block hidden">
              {session?.user?.name}
            </div>
            <span className="text-base me-2.5 lg:inline-block hidden">
              <Icon icon="heroicons-outline:chevron-down" />
            </span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 p-0" align="end">
          <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
            <Image
              src={session?.user?.image as string}
              alt={session?.user?.name?.charAt(0) as string}
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <div className="text-sm font-medium text-default-800 capitalize">
                {session?.user?.name}
              </div>
              <Link
                href="/dashboard/dash-ecom"
                className="text-xs text-default-600 hover:text-primary"
              >
                {session?.user?.email}
              </Link>
            </div>
          </DropdownMenuLabel>

          {/* --- Menus --- */}
          <DropdownMenuGroup>
            {[
              { name: "profile", icon: "heroicons:user", href: "/user-profile" },
              { name: "Billing", icon: "heroicons:megaphone", href: "/dashboard" },
              { name: "Settings", icon: "heroicons:paper-airplane", href: "/dashboard" },
              { name: "Keyboard shortcuts", icon: "heroicons:language", href: "/dashboard" },
            ].map((item, i) => (
              <Link href={item.href} key={`info-${i}`} className="cursor-pointer">
                <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5">
                  <Icon icon={item.icon} className="w-4 h-4" />
                  {item.name}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/dashboard">
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5">
                <Icon icon="heroicons:user-group" className="w-4 h-4" />
                team
              </DropdownMenuItem>
            </Link>

            {/* Invite user submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5">
                <Icon icon="heroicons:user-plus" className="w-4 h-4" />
                Invite user
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {["email", "message", "facebook"].map((item, i) => (
                    <Link href="/dashboard" key={`invite-${i}`}>
                      <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5">
                        {item}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <Link href="/dashboard">
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5">
                <Icon icon="heroicons:variable" className="w-4 h-4" />
                Github
              </DropdownMenuItem>
            </Link>

            {/* Support submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5">
                <Icon icon="heroicons:phone" className="w-4 h-4" />
                Support
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {["portal", "slack", "whatsapp"].map((item, i) => (
                    <Link href="/dashboard" key={`support-${i}`}>
                      <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5">
                        {item}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="mb-0 dark:bg-background" />

          {/* Logout */}
          <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 cursor-pointer">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 cursor-pointer"
            >
              <Icon icon="heroicons:power" className="w-4 h-4" />
              Log out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileInfo;
