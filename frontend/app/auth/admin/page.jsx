"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, login } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();
  const { state, error } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(adminLogin(form));
    console.log(res);
    if (res.meta.requestStatus === "fulfilled") {
      router.push("/admin");
    }
  };
  //   console.log(form, state, error);
  return (
    <div className="lg:flex">
      <div className="w-[60%] relative bg-green-300 text-green-600 hidden lg:flex lg:flex-col items-center justify-center">
        <Link
          href="/"
          className="absolute text-7xl font-semibold text-slate-700 top-10 left-10"
        >
          <span className="text-green-600">go</span>cart
          <span className="text-green-600 text-5xl leading-0">.</span>
          <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
            plus
          </p>
        </Link>
        <Image
          className="absolute bottom-8 scale-110"
          src={assets.LoginImg}
          alt=""
        />
      </div>
      <div className="lg:w-[40%]">
        <div className="flex h-screen items-center justify-center w-full ">
          <form onSubmit={handleSubmit} className="bg-white  p-8 w-120">
            <h1 className="text-3xl font-bold  text-center">
              <span className="text-green-600">Administrator Access</span>
            </h1>
            <p className=" text-black/70 text-md p-2 w-[100%] text-center mb-4 font-medium">
              Authorized personnel only
            </p>

            <div className="text-black mb-1 font-medium">Email</div>
            <input
              type="email"
              name="email"
              placeholder="m@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="border p-2 w-full mb-4 rounded-md border-green-800"
              required
            />
            <div className="text-black mb-1 font-medium">Password</div>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              className="border p-2 w-full mb-6 rounded-md border-green-800 "
              required
            />
            <button
              type="submit"
              className="bg-black text-white hover:bg-green-600 py-2 rounded-md w-full hover:scale-101 transition ease-in-out duration-300"
            >
              {state === "loading" ? "Logging in..." : "Login"}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
