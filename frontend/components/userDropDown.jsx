"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/frontend/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/frontend/components/ui/avatar";
import { LogOut, Settings, User, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/frontend/lib/features/auth/authSlice";
import Loading from "./Loading";
import { set } from "date-fns";
export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      setLoading(true);
      await dispatch(logout());
      window.location.href = "/"; // full reload
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center">
             <div className='w-11 h-11 rounded-full border-3 border-gray-300 border-t-green-500 animate-spin'></div>
        </div>
      )}
      <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="cursor-pointer ring-2 ring-green-500/30 hover:ring-green-500 transition-all duration-200">
          <AvatarImage src="/avatar.png" alt="@user" />
          <AvatarFallback>GM</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-52 rounded-xl shadow-lg border border-gray-100 bg-white"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">
              {user?.username || user?.fullName || user?.name || "Great Master"}
            </span>
            <span className="text-xs text-gray-500">
              {user?.email || "greatmaster@example.com"}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/profile")}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4 text-gray-600" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/orders")}
          className="cursor-pointer"
        >
          <Package className="mr-2 h-4 w-4 text-gray-600" /> My Orders
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/settings")}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4 text-gray-600" /> Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-500 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}
