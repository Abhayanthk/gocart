"use client";
import { Suspense, useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { MoveLeftIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/lib/features/product/productSlice";

function ShopContent() {
  // get query params ?search=abc
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const {
    list: products,
    loading,
    pagination,
    facets,
  } = useSelector((state) => state.product);

  // Filter State
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortOption, setSortOption] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products when filters change
  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search,
        category: categoryFilters.join(","),
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        sort: sortOption,
      })
    );
  }, [dispatch, currentPage, search, categoryFilters, priceRange, sortOption]);

  // Reset page when filters change (except page itself)
  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilters, priceRange, sortOption]);

  const categories = facets?.categories || [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, pagination.pages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const toggleCategory = (category) => {
    setCategoryFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-[70vh] mx-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 mt-8">
        {/* Sidebar / Filters */}
        <div
          className={`lg:w-1/4 ${
            showFilters ? "block" : "hidden"
          } lg:block space-y-6`}
        >
          <div>
            <h3 className="font-medium text-lg mb-3">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="all-categories"
                  checked={categoryFilters.length === 0}
                  onChange={() => setCategoryFilters([])}
                  className="accent-slate-800"
                />
                <label
                  htmlFor="all-categories"
                  className="text-slate-600 cursor-pointer"
                >
                  All Categories
                </label>
              </div>
              {categories.map((cat) => (
                <div key={cat.category} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={cat.category}
                    checked={categoryFilters.includes(cat.category)}
                    onChange={() => toggleCategory(cat.category)}
                    className="accent-slate-800"
                  />
                  <label
                    htmlFor={cat.category}
                    className="text-slate-600 cursor-pointer"
                  >
                    {cat.category} ({cat.count})
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-3">Price Range</h3>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: Number(e.target.value) })
                }
                className="w-full border border-slate-300 rounded px-2 py-1 outline-none"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: Number(e.target.value) })
                }
                className="w-full border border-slate-300 rounded px-2 py-1 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1
              onClick={() => router.push("/shop")}
              className="text-2xl text-slate-500 flex items-center gap-2 cursor-pointer"
            >
              {search && <MoveLeftIcon size={20} />} All{" "}
              <span className="text-slate-700 font-medium">Products</span>
            </h1>

            <div className="flex items-center gap-4">
              <button
                className="lg:hidden flex items-center gap-1 text-slate-600 border border-slate-300 px-3 py-1.5 rounded"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </button>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-slate-300 rounded px-3 py-1.5 outline-none text-slate-600"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-slate-200 h-48 w-full rounded-lg mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ))
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          {/* Pagination Controls */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-4 my-12">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-100 transition ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: pagination.pages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center border rounded-md transition ${
                      currentPage === i + 1
                        ? "bg-slate-800 text-white border-slate-800"
                        : "border-slate-300 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === pagination.pages}
                className={`px-4 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-100 transition ${
                  currentPage === pagination.pages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
