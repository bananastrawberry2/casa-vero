import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/lib/sanity";
import { BlogCard } from "@/components/blog/BlogCard";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await getBlogPosts();

  return (
    <div className="container-page py-8 md:py-12">
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-2">
          {t("title")}
        </h1>
        <p className="text-stone-500 text-lg">{t("subtitle")}</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-stone-500 text-lg">{t("no_results")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
