'use client';
import AdminLayout from "@/components/admin/AdminLayout";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function RootAdminLayout({ children }) {
      const {user} = useSelector((state) => state.auth);
      const router = useRouter();
      // if(!user){
      //       return router.push("/auth/login");
      // }
      console.log(user);
    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
