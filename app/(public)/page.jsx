"use client"
import React from "react";
import Hero from "@/components/Hero";
import LatestProducts from "@/components/LatestProducts";
import BestSelling from "@/components/BestSelling";
import OurSpecs from "@/components/OurSpec";

export default function Home(){
      return (
            <div>
                  <Hero />
                  <LatestProducts />
                  <BestSelling />
                  <OurSpecs />
            </div>
      )
}