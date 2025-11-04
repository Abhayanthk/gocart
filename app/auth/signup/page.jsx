"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    fullName: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { state, error } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(signup(form));
    if (res.meta.requestStatus === "fulfilled") {
      router.push("/auth/login");
    }
  };

  return (
    <div className="lg:flex ">
      {/* Image sesssion */}
      <div className="w-[60%] relative bg-green-300 text-green-600 hidden lg:flex lg:flex-col items-center justify-center">
        <Link
          href="/"
          className="absolute text-7xl font-semibold text-slate-700 top-10 left-10 mouse-pointer"
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
      {/* Form session */}
      <div className="lg:w-[40%]">
        <div className="flex h-screen items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white  p-8 w-100">
            <h1 className="text-2xl font-bold mb-1 text-center">
              Create Your Account
            </h1>
            <p className="text-black/40 text-md text-center mb-10">
              Fill in the form below to create your account
            </p>

            <div className="font-medium">Full Name</div>
            <input
              type="text"
              name="fullName"
              placeholder="full name"
              value={form.fullName}
              onChange={handleChange}
              className="border p-2 w-full mb-6 rounded-md border-green-800 "
            />
            <div className="font-medium">Username</div>
            <input
              type="text"
              name="name"
              placeholder="username"
              value={form.name}
              onChange={handleChange}
              className="border p-2 w-full mb-6 rounded-md border-green-800 "
              required
            />
            <div className="font-medium">Email</div>
            <input
              type="email"
              name="email"
              placeholder="m@gmail.com"
              value={form.email}
              onChange={handleChange}
              className="border p-2 w-full mb-6 rounded-md border-green-800 "
              required
            />
            <div className="font-medium">Password</div>
            <input
              type="password"
              name="password"
              placeholder="passwrod"
              value={form.password}
              onChange={handleChange}
              className="border p-2 w-full mb-6 rounded-md border-green-800 "
              required
            />
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-md w-full hover:bg-green-600 transition"
            >
              {state === "loading" ? "Signing up..." : "Signup"}
            </button>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            <div className="text-black/40 text-sm p-2 w-[100%] text-center mb-6">
              Already have an Account?{" "}
              <Link href={"/auth/login"} className="underline">
                login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
