"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiX,
  FiLink,
  FiCheck,
} from "react-icons/fi";
import { MDXContent } from "./mdx-component";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

type TocItem = { id: string; text: string; level: 2 | 3 };

export default function PostContent({ content }: { content: string }) {
  const contentRef = useRef<HTMLElement | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);

  const pathname = usePathname();
  const search = useSearchParams();

  const url = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${pathname}${
        search?.toString() ? `?${search.toString()}` : ""
      }`;
    }
    // fallback for SSR (optional base url env)
    const base = process.env.NEXT_PUBLIC_SITE_URL || "";
    return `${base}${pathname}${
      search?.toString() ? `?${search.toString()}` : ""
    }`;
  }, [pathname, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const root = contentRef.current;
      if (!root) return;

      // Ambil heading hanya dari dalam artikel content, bukan dari seluruh halaman
      const headings = Array.from(
        root.querySelectorAll<HTMLHeadingElement>("h2, h3")
      );

      console.log("Headings found:", headings);

      const items: TocItem[] = [];
      headings.forEach((el) => {
        if (!el.textContent) return;
        if (!el.id) el.id = slugify(el.textContent);
        const level = el.tagName.toLowerCase() === "h2" ? 2 : 3;
        el.classList.add("scroll-mt-28");
        items.push({ id: el.id, text: el.textContent, level: level as 2 | 3 });
      });

      setToc(items);
    }, 100); // delay 100ms

    return () => clearTimeout(timer);
  }, [content]);

  const openShare = (to: "linkedin" | "x" | "facebook" | "instagram") => {
    const text = encodeURIComponent(document.title || "Check this out");
    const u = encodeURIComponent(url);
    let shareUrl = "";
    if (to === "linkedin")
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    if (to === "x")
      shareUrl = `https://twitter.com/intent/tweet?url=${u}&text=${text}`;
    if (to === "facebook")
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${u}`;

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="container grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
      <aside className="md:pr-4 order-2 md:order-1">
        {/* Share */}
        <div className="md:sticky md:top-36 space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-3">Share This Article</p>
            <div className="flex items-center gap-4">
              <button
                aria-label="Share on LinkedIn"
                onClick={() => openShare("linkedin")}
                className="p-2 hover:text-primary-dark cursor-pointer "
              >
                <FiLinkedin className="h-5 w-5" />
              </button>
              <button
                aria-label="Share on X"
                onClick={() => openShare("x")}
                className="p-2 hover:text-primary-dark cursor-pointer"
              >
                <FiX className="h-5 w-5" />
              </button>
              <button
                aria-label="Share on Facebook"
                onClick={() => openShare("facebook")}
                className="p-2 hover:text-primary-dark cursor-pointer"
              >
                <FiFacebook className="h-5 w-5" />
              </button>
              <button
                aria-label="Share on Instagram"
                onClick={() => openShare("instagram")}
                className="p-2 hover:text-primary-dark cursor-pointer"
              >
                <FiInstagram className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* TOC Card */}
          {toc.length > 0 && (
            <div className="rounded-2xl bg-primary-dark text-white py-3 px-6">
              <h3 className="mb-3">In This Article</h3>
              <nav className="space-y-1">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block px-3 py-2 text-sm  transition ${
                      item.level === 3 ? "ml-3 text-xs opacity-90" : ""
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </aside>

      {/* RIGHT: Content */}
      <article
        ref={contentRef}
        className="prose max-w-none md:col-span-3 order-1 md:order-2"
      >
        <MDXContent code={content} />
      </article>
    </section>
  );
}
