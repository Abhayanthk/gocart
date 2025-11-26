"use client"
import React from "react";
import Hero from "@/frontend/components/Hero";
import LatestProducts from "@/frontend/components/LatestProducts";
import BestSelling from "@/frontend/components/BestSelling";
import OurSpecs from "@/frontend/components/OurSpec";
import Newsletter from "@/frontend/components/Newsletter";

export default function Home(){
      return (
            <div>
                  <Hero />
                  <LatestProducts />
                  <BestSelling />
                  <OurSpecs />
                  <Newsletter />
            </div>
      )
}