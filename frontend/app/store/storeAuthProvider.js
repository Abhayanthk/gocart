"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/lib/features/auth/authSlice";
import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

export default function StoreAuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
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
          router.push(`/auth/login?redirect=${pathname}`);
        }
      } catch (err) {
        router.push(`/auth/login?redirect=${pathname}`);
        dispatch(setUser(null));
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [dispatch, router, pathname]);

  if (loading || !user) return <Loading />;

  return <>{children}</>;
}
