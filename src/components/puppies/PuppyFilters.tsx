"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X, SlidersHorizontal } from "lucide-react";

interface PuppyFiltersProps {
  breeds: string[];
  totalResults: number;
}

export function PuppyFilters({ breeds, totalResults }: PuppyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentBreed = searchParams.get("breed") || "all";
  const currentOrigin = searchParams.get("origin") || "all";
  const currentGender = searchParams.get("gender") || "all";
  const currentSort = searchParams.get("sort") || "default";

  const hasActiveFilters =
    currentBreed !== "all" ||
    currentOrigin !== "all" ||
    currentGender !== "all" ||
    currentSort !== "default";

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "default" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  return (
    <div className="space-y-6 bg-white/70 backdrop-blur rounded-3xl border border-cocoa/10 p-5 sm:p-7 shadow-sm">
      {/* Top Filter Bar: Controls & Reset */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-cocoa/10">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-honey/30 flex items-center justify-center text-cocoa">
            <SlidersHorizontal className="size-4" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-cocoa">
              Filter Puppies
            </h3>
            <span className="text-xs text-cocoa-soft">
              {totalResults} {totalResults === 1 ? "puppy" : "puppies"} found
            </span>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-toffee hover:text-toffee-deep uppercase tracking-wider transition-colors self-start md:self-auto"
          >
            <X className="size-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Breed Selector */}
        <div>
          <label
            htmlFor="filter-breed"
            className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-2"
          >
            Breed
          </label>
          <select
            id="filter-breed"
            value={currentBreed}
            onChange={(e) => setFilter("breed", e.target.value)}
            className="w-full rounded-xl border border-cocoa/20 bg-milk px-3.5 py-2.5 text-sm text-cocoa focus:border-honey focus:outline-none focus:ring-2 focus:ring-honey/30"
          >
            <option value="all">All Breeds</option>
            {breeds.map((b) => (
              <option key={b} value={b.toLowerCase().replace(/\s+/g, "-")}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Origin Selector */}
        <div>
          <label
            htmlFor="filter-origin"
            className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-2"
          >
            Origin
          </label>
          <select
            id="filter-origin"
            value={currentOrigin}
            onChange={(e) => setFilter("origin", e.target.value)}
            className="w-full rounded-xl border border-cocoa/20 bg-milk px-3.5 py-2.5 text-sm text-cocoa focus:border-honey focus:outline-none focus:ring-2 focus:ring-honey/30"
          >
            <option value="all">All Locations</option>
            <option value="local">Dubai Showroom (In Stock)</option>
            <option value="imported">Imported (Korea to Dubai)</option>
          </select>
        </div>

        {/* Gender Selector */}
        <div>
          <label
            htmlFor="filter-gender"
            className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-2"
          >
            Gender
          </label>
          <select
            id="filter-gender"
            value={currentGender}
            onChange={(e) => setFilter("gender", e.target.value)}
            className="w-full rounded-xl border border-cocoa/20 bg-milk px-3.5 py-2.5 text-sm text-cocoa focus:border-honey focus:outline-none focus:ring-2 focus:ring-honey/30"
          >
            <option value="all">Any Gender</option>
            <option value="male">Boy</option>
            <option value="female">Girl</option>
          </select>
        </div>

        {/* Sort Selector */}
        <div>
          <label
            htmlFor="filter-sort"
            className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-2"
          >
            Sort By
          </label>
          <select
            id="filter-sort"
            value={currentSort}
            onChange={(e) => setFilter("sort", e.target.value)}
            className="w-full rounded-xl border border-cocoa/20 bg-milk px-3.5 py-2.5 text-sm text-cocoa focus:border-honey focus:outline-none focus:ring-2 focus:ring-honey/30"
          >
            <option value="default">Featured</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
            <option value="age">Age (Youngest first)</option>
          </select>
        </div>
      </div>

      {/* Quick Breed Pill Chips */}
      <div className="pt-2 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-cocoa-soft mr-1">
          Quick filter:
        </span>
        <button
          type="button"
          onClick={() => setFilter("breed", "all")}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            currentBreed === "all"
              ? "bg-cocoa text-milk"
              : "bg-cocoa/5 text-cocoa hover:bg-honey/40"
          }`}
        >
          All
        </button>
        {breeds.slice(0, 6).map((b) => {
          const val = b.toLowerCase().replace(/\s+/g, "-");
          const isSelected = currentBreed === val;
          return (
            <button
              key={b}
              type="button"
              onClick={() => setFilter("breed", isSelected ? "all" : val)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                isSelected
                  ? "bg-toffee text-milk shadow-sm"
                  : "bg-cocoa/5 text-cocoa hover:bg-honey/40"
              }`}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}
