"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "@/lib/features/auth/authSlice";
import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

export default function AdminAuthProvider({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const apiUrl = "/api";
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/admin/is-admin`, {
          withCredentials: true,
        });
        console.log(res.data, "res.data");
        if (!res.data.isAdmin) {
          router.push("/auth/admin?redirect=" + pathname);
        }
        dispatch(setUser(res.data.user));
      } catch (err) {
        router.push("/auth/admin?redirect=" + pathname);
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
