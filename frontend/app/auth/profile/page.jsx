"use client";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Shield, CreditCard, Plus } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 p-6 flex flex-col hidden md:flex">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900">Account</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account info.
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          <Link
            href="/auth/profile"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md"
          >
            <User size={18} />
            Profile
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
          >
            <Shield size={18} />
            Security
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
          >
            <CreditCard size={18} />
            Billing
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Secured by</span>
            <span className="font-semibold text-gray-600">GoCart</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-8">
            Profile details
          </h2>

          {/* Profile Section */}
          <div className="flex items-center justify-between py-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={user.image || "/avatar.png"}
                  alt={user.fullName || user.username || user.name}
                />
                <AvatarFallback className="text-lg bg-gray-100 text-gray-600">
                  {user.fullName?.charAt(0) ||
                    user.username?.charAt(0) ||
                    user.name?.charAt(0) ||
                    "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-900">Profile</p>
                <p className="text-sm text-gray-500">
                  {user.name || user.fullName || user.username}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-sm text-gray-500 hover:text-gray-900 font-normal"
            >
              Update profile
            </Button>
          </div>

          {/* Email Section */}
          <div className="py-6 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <p className="text-sm font-medium text-gray-900">
                Email addresses
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900">{user.email}</span>
                  <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                    Primary
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                className="pl-0 text-sm text-gray-500 hover:text-gray-900 font-normal flex items-center gap-2"
              >
                <Plus size={16} />
                Add email address
              </Button>
            </div>
          </div>

          {/* Phone Section */}
          <div className="py-6 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <p className="text-sm font-medium text-gray-900">Phone number</p>
            </div>
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="pl-0 text-sm text-gray-500 hover:text-gray-900 font-normal flex items-center gap-2"
              >
                <Plus size={16} />
                Add phone number
              </Button>
            </div>
          </div>

          {/* Connected Accounts Section */}
          <div className="py-6">
            <div className="flex items-start justify-between mb-4">
              <p className="text-sm font-medium text-gray-900">
                Connected accounts
              </p>
            </div>
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="pl-0 text-sm text-gray-500 hover:text-gray-900 font-normal flex items-center gap-2"
              >
                <Plus size={16} />
                Connect account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
