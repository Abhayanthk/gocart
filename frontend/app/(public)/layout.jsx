"use client";
import Banner from "@/components/Banner";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AuthProvider from "./AuthProvider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/product/productSlice";
import { fetchCart, uploadCart } from "@/lib/features/cart/cartSlice";
import Loading from "@/components/Loading";

export default function PublicLayout({ children }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(fetchCart({}));
    setLoading(false);
  }, []);
  useEffect(() => {
    dispatch(uploadCart({}));
  }, [cartItems]);
  if (loading) return <Loading />;
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
