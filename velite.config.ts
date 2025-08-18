import { defineConfig, s } from "velite";
import rehypeShiki from "@shikijs/rehype";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

export default defineConfig({
  collections: {
    posts: {
      name: "Post", // collection type name
      pattern: "blog/**/*.mdx", // content files glob pattern
      schema: s
        .object({
          slug: s.path(),
          title: s.string().max(99),
          description: s.string().max(999).optional(),
          date: s.isodate(),
          published: s.boolean().default(true),
          tags: s.array(s.string()).optional(),
          thumbnail: s.string().optional(),
          author: s.string().optional(),
          body: s.mdx(),
        })
        .transform(computedFields),
    },
  },
  markdown: {
    rehypePlugins: [
      [
        rehypeShiki as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        { theme: "one-dark-pro" },
      ],
    ],
  },
});
