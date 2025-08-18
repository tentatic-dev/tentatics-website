import { Post } from "#site/content";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Feature({ posts }: { posts: Post[] }) {
  const t = useTranslations("article");
  console.log("Feature component posts:", posts);
  return (
    <>
      <div className="flex items-center gap-10 justify-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{t("feature")}</h1>
        <hr className="border w-full" />
      </div>
      <div className="flex flex-col gap-4 mt-6 h-full">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex items-center gap-4"
            aria-label={post.title}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden flex-shrink-0 bg-gray-200">
              {post.thumbnail ? (
                // thumbnail image on the left
                // use object-cover so the image fills the square nicely
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <time className="text-sm text-black truncate">
                  {post.date
                    ? new Date(post.date).toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </time>
              </div>

              <h2 className="text-sm sm:text-base font-medium truncate mt-1">
                {post.title}
              </h2>
              <p className="mt-1 text-xs opacity-75 truncate">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
