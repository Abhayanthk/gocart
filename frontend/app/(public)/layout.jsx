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
import { fetchAddress } from "@/lib/features/address/addressSlice";
import { fetchUserRatings } from "@/lib/features/rating/ratingSlice";

export default function PublicLayout({ children }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(fetchCart({}));
    dispatch(fetchAddress({}));
    setLoading(false);
  }, []);
  useEffect(() => {
    // Debounce the cart upload to avoid multiple rapid API calls
    const timer = setTimeout(() => {
      dispatch(uploadCart({}));
    }, 1000);

    return () => clearTimeout(timer);
  }, [cartItems]);
  useEffect(() => {
    setLoading(true);
    dispatch(fetchUserRatings({}));
    setLoading(false);
  }, []);
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
