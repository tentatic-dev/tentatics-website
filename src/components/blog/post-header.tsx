import Image from "next/image";
import Link from "next/link";

type BannerProps = {
  title: string;
  description?: string;
  thumbnail?: string;
  tags?: string[];
  author?: string;
  date?: string;
};

export default function PostHeader({
  title,
  description,
  thumbnail,
  tags,
  author,
  date,
}: BannerProps) {
  return (
    <section id="banner" className="relative bg-primary-dark overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block w-1/3 bg-[url('/about/pattern.svg')] bg-no-repeat bg-left bg-contain opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden lg:block w-1/3 bg-[url('/about/pattern.svg')] bg-no-repeat bg-right bg-contain opacity-20"
      />

      <div className="relative container mt-20 mx-auto space-y-10 py-24 px-8 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/blog"
                className="text-base text-highlight font-medium hover:underline"
              >
                Blog
              </Link>
              {tags && tags.length > 0 && (
                <>
                  <span className="mx-2 text-white/60">›</span>
                  <span className="text-base text-highlight font-medium">
                    {tags[0]}
                  </span>
                </>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-white/80 mb-6">{description}</p>
            )}
            <div className="flex items-center gap-2 text-white/80 text-sm mt-4">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <Image
                    alt="Foto profil sample"
                    src="/logo-tentatics.svg"
                    className="bg-white p-2"
                    height={40}
                    width={40}
                  />
                </div>
              </div>
              {author && <span>{author}</span>}
              {date && (
                <>
                  <span className="mx-2">|</span>
                  <span>
                    Last updated on{" "}
                    {new Date(date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        {thumbnail && (
          <div className="flex-1 flex justify-center items-center">
            <Image
              src={thumbnail}
              alt={title}
              width={400}
              height={300}
              className="rounded-lg object-cover bg-highlight"
              style={{ minWidth: 520, minHeight: 220 }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
