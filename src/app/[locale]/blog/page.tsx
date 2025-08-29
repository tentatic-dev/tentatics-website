"use client";

import { posts } from "#site/content";
import Banner from "@/components/blog/banner";
import Feature from "@/components/blog/feature";
import Section from "@/components/blog/section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { sortPosts } from "@/lib/utils";
import { useState, useMemo, useCallback } from "react";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const allPosts = useMemo(
    () => sortPosts(posts.filter((post) => post.published)),
    []
  );

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return allPosts;

    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [allPosts, searchQuery]);

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);

    // Simulate search delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    setSearchQuery(query);
    setIsLoading(false);
  }, []);

  return (
    <main>
      <Navbar variant={2} />
      <Banner onSearch={handleSearch} isLoading={isLoading} />
      <section
        id="articles"
        className="container mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        <div className="col-span-2">
          {isLoading ? (
            <LoadingState />
          ) : filteredPosts.length > 0 ? (
            <Section posts={filteredPosts} />
          ) : (
            <NotFoundState
              searchQuery={searchQuery}
              onClearSearch={() => handleSearch("")}
            />
          )}
        </div>
        <div>
          <Feature posts={allPosts} />
        </div>
      </section>
      <Footer />
    </main>
  );
}

// Loading State Component
function LoadingState() {
  return (
    <div className="space-y-6 w-full">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
          <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
          <div className="bg-gray-200 h-4 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

// Not Found State Component
function NotFoundState({
  searchQuery,
  onClearSearch,
}: {
  searchQuery: string;
  onClearSearch: () => void;
}) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          No articles found
        </h3>
        <p className="text-gray-600 mb-6">
          We couldn't find any articles matching "{searchQuery}". Try searching
          with different keywords.
        </p>
      </div>
    </div>
  );
}
