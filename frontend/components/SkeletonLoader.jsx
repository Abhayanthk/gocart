import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="block overflow-hidden cursor-pointer rounded-lg w-full max-w-[200px] animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-slate-200 h-48 w-full rounded-lg mb-4"></div>

      {/* Content Skeleton */}
      <div className="pt-2">
        {/* Title Skeleton */}
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>

        {/* Rating Skeleton */}
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 w-3 bg-slate-200 rounded-full"></div>
          ))}
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          <div className="h-3 bg-slate-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
