'use client'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "./AuthProvider";

export default function PublicLayout({ children }) {

    return (
        <>
        <AuthProvider>
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </AuthProvider>
        </>
    );
}
