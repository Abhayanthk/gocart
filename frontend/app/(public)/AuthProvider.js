"use client";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/frontend/lib/features/auth/authSlice";
import Loading from "@/frontend/components/Loading";
import axios from "axios";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${url}/me`, { withCredentials: true });
        console.log(res.data);

        if (res.data?.user) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (err) {
            console.log("Error fetching user:", err);
        dispatch(setUser(null)); 
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]); // runs only once

  if (loading) return <Loading />;

  return <>{children}</>;
}
