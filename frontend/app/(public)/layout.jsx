'use client'
import Banner from "@/frontend/components/Banner";
import Navbar from "@/frontend/components/NavBar";
import Footer from "@/frontend/components/Footer";
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
