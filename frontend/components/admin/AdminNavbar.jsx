'use client'
import Link from "next/link"
import { useSelector } from "react-redux"
import Dropdown from "../UserDropDown";
const AdminNavbar = () => {
      const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 transition-all">
            <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                <span className="text-green-600">go</span>cart<span className="text-green-600 text-5xl leading-0">.</span>
                <p className="absolute text-xs font-semibold -top-1 -right-13 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                    Admin
                </p>
            </Link>
            <div className="flex items-center gap-3 text-lg font-medium">
                <p>Admin <span className="font-bold text-red-500">{user?.fullName || user?.username || user?.name || 'Admin'}</span></p>
                  <Dropdown />
            </div>
        </div>
    )
}

export default AdminNavbar