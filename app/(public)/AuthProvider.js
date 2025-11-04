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

    if (!token) {
      dispatch(setUser(null));
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        dispatch(setUser(null));
      } else {
        dispatch(setUser(decoded));
      }
    } catch (err) {
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
