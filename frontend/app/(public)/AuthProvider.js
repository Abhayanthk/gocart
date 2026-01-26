"use client";
import { useDispatch } from "react-redux";
import { useEffect, useState, createContext } from "react";
import { fetchUserRatings } from "@/lib/features/rating/ratingSlice";
import { fetchCart } from "@/lib/features/cart/cartSlice";
import { fetchAddress } from "@/lib/features/address/addressSlice";
import GlobalLoader from "@/components/GlobalLoader";
import axios from "axios";
import { setUser } from "@/lib/features/auth/authSlice";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const url = "/api";

  useEffect(() => {
    // Axios Interceptors for Global Loader
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setIsGlobalLoading(true);
        setProgress(30); // Start at 30%
        return config;
      },
      (error) => {
        setIsGlobalLoading(false);
        setProgress(100);
        return Promise.reject(error);
      },
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setProgress(100);
        setTimeout(() => {
          setIsGlobalLoading(false);
          setProgress(0);
        }, 500);
        return response;
      },
      (error) => {
        setProgress(100);
        setTimeout(() => {
          setIsGlobalLoading(false);
          setProgress(0);
        }, 500);
        return Promise.reject(error);
      },
    );

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${url}/me`, { withCredentials: true });
        console.log(res.data);

        if (res.data?.user) {
          dispatch(setUser(res.data.user));
          dispatch(fetchUserRatings());
          dispatch(fetchCart());
          dispatch(fetchAddress());
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

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch]); // runs only once

  // Progress Simulation
  useEffect(() => {
    let interval;
    if (loading || isGlobalLoading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev; // Stop at 90% until request finishes
          const diff = Math.random() * 10;
          return Math.min(prev + diff, 90);
        });
      }, 200);
    } else {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [loading, isGlobalLoading]);

  return (
    <AuthContext.Provider value={{ loading: loading || isGlobalLoading }}>
      <GlobalLoader
        isLoading={loading || isGlobalLoading}
        progress={progress}
      />
      {children}
    </AuthContext.Provider>
  );
}
