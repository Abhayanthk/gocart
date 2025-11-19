"use client";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/lib/features/auth/authSlice";
import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminAuthProvider({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("/api/me", { withCredentials: true });
        setUserData(res.data.user);
        if(userData)
        {
            
        }
      } catch (err) {
        router.push("/login");
        dispatch(setUser(null));
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [dispatch, router]);

  if (loading) return <Loading />;

  return <>{children}</>;
}
