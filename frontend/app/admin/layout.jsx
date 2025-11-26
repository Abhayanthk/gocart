'use client';
import AdminLayout from "@/frontend/components/admin/AdminLayout";
import AdminAuthProvider from "./adminAuthProvider";

export default function RootAdminLayout({ children }) {
    return (
        <>
            <AdminAuthProvider>
                <AdminLayout>
                    {children}
                </AdminLayout>
            </AdminAuthProvider>
        </>
    );
}
