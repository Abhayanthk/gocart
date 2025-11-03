'use client'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/lib/features/auth/authSlice";
import { jwtDecode } from "jwt-decode"; 
import Loading from "@/components/Loading";
import { set } from "date-fns";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);

    if (!token) {
      dispatch(setUser(null));
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        console.log("Token expired");
        localStorage.removeItem("token");
        dispatch(setUser(null));
      } else {
        console.log("Token valid ✅");
        dispatch(setUser(decoded));
        console.log("Decoded token:", decoded);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      dispatch(setUser(null));
    }
    setLoading(false);
  }, [dispatch]);
  if(loading){
    return <Loading />;
  }

  return <>{children}</>;
}
