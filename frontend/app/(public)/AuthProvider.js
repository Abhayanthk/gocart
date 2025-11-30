"use client";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/lib/features/auth/authSlice";
import Loading from "@/components/Loading";
import axios from "axios";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const url = "/api";
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
