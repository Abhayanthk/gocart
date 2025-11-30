"use client";
import React from "react";
import Title from "@/components/Title";
import Newsletter from "@/components/Newsletter";
import { assets } from "@/assets/assets";
import Image from "next/image";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t border-slate-200">
        <Title title="ABOUT US" description="" visibleButton={false} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 px-4 md:px-20">
        <Image
          className="w-full md:max-w-[450px]"
          src={assets.about_img || assets.upload_area}
          alt="About Us"
          width={450}
          height={450}
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            GoCart was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality merchandise that caters to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at GoCart is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="text-xl py-4 px-4 md:px-20">
        <Title title="WHY CHOOSE US" description="" visibleButton={false} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 px-4 md:px-20 gap-5">
        <div className="border border-slate-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border border-slate-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free checkout process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border border-slate-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default About;
