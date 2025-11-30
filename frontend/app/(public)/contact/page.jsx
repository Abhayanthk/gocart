"use client";
import React from "react";
import Title from "@/components/Title";
import Newsletter from "@/components/Newsletter";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t border-slate-200">
        <Title title="CONTACT US" description="" visibleButton={false} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 px-4 md:px-20">
        <Image
          className="w-full md:max-w-[480px]"
          src={assets.contact_img || assets.upload_area}
          alt="Contact Us"
          width={480}
          height={480}
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br /> Email: admin@gocart.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at GoCart
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

export default Contact;
