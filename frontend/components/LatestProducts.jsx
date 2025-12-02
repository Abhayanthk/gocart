"use client";
import React from "react";
import Title from "./Title";
import SkeletonLoader from "./SkeletonLoader";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const LatestProducts = () => {
  // Setting up the maximum display quantity
  const displayQuantity = 4;
  const { list: products = [], loading } = useSelector(
    (state) => state.product || {}
  );

  return (
    <div className="px-6 my-30 max-w-6xl mx-auto">
      {/* This displays at most 'displayQuantity' products */}
      <Title
        title="Latest Products"
        description={`Showing ${
          products.length < displayQuantity ? products.length : displayQuantity
        } of ${products.length} products`}
        href="/shop"
      />
      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between">
        {loading
          ? Array.from({ length: displayQuantity }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : /* sort the products by createdAt date in desc order and take the first 'displayQuantity' products */
            products
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, displayQuantity)
              .map((product, index) => (
                // new Date() converts the string date into date ds so that we can do math on it
                <ProductCard key={index} product={product} />
              ))}
      </div>
    </div>
  );
};

export default LatestProducts;
