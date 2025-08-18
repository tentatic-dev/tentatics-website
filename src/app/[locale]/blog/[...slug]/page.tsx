import NotFound from "../../not-found";
import { posts } from "#site/content";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PostHeader from "@/components/blog/post-header";
import PostContent from "@/components/blog/post-content";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

async function getPostFromParams({ slug }: { slug: string[] }) {
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;
  const normalizedSlug = slugPath.replace(/^blog\//, "");
  const post = posts.find((post) => post.slugAsParams === normalizedSlug);
  return post;
}

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostFromParams({ slug });

  if (!post || !post.published) {
    return <NotFound />;
  }

  return (
    <main>
      <Navbar />
      <PostHeader
        title={post.title}
        description={post.description}
        thumbnail={post.thumbnail}
        tags={post.tags}
        author={post.author}
        date={post.date}
      />

      <PostContent content={post.body} />

      <Footer />
    </main>
  );
}
