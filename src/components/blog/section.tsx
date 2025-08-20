import { Post } from "#site/content";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Section({ posts }: { posts: Post[] }) {
  const t = useTranslations("article");
  return (
    <>
      <div className="flex items-center justify-center gap-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 lg:flex-shrink-0">
          {t("section-1")}
        </h1>
        <hr className="border w-full " />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {posts.map((post, index) => (
          <Link
            key={index}
            href={`/${post.slug}`}
            className="card w-full justify-end h-[350px] bg-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative"
            style={{
              backgroundImage: `url(${post.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* gradient overlay to improve text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/100  to-transparent pointer-events-none" />

            <div className="p-4 relative z-10 w-full">
              <div className="flex flex-wrap items-center gap-2">
                {post.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-black/50 text-white text-sm px-3 py-1 rounded-full mb-2 mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-bold text-white mb-2">
                {(() => {
                  const title = post.title ?? "";
                  const words = title.trim().split(/\s+/);
                  return words.length > 3
                    ? words.slice(0, 3).join(" ") + "..."
                    : title;
                })()}
              </h2>
              <p className="text-white/90 text-sm">
                {(() => {
                  const desc = post.description ?? "";
                  const words = desc.trim().split(/\s+/);
                  return words.length > 10
                    ? words.slice(0, 10).join(" ") + "..."
                    : desc;
                })()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
