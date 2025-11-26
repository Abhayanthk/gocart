"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/frontend/lib/features/auth/authSlice";
import Loading from "@/frontend/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminAuthProvider({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const apiUrl = "/api";            
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/me`, { withCredentials: true });

            dispatch(setUser(res.data.user));
        if (!res.data.user) {
            router.push("/auth/admin");
        }
      } catch (err) {
        router.push("/auth/admin");
        dispatch(setUser(null));
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [dispatch, router]);

  if (loading || !user) return <Loading />;

  return <>{children}</>;
}
