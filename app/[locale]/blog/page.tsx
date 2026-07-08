import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/lib/sanity";
import { BlogCard } from "@/components/blog/BlogCard";
import { ArrowRight } from "lucide-react";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await getBlogPosts();

  return (
    <div className="bg-cream-bg min-h-screen">
      {/* Header */}
      <div className="border-b border-stone-100">
        <div className="container-page py-16 md:py-20 text-center">
          <span className="text-wood-500 text-xs tracking-[0.3em] uppercase font-medium">Ιστολόγιο</span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-800 mt-4 mb-4">{t("title")}</h1>
          <p className="text-stone-400 text-lg max-w-lg mx-auto">{t("subtitle")}</p>
        </div>
      </div>

      <div className="container-page py-12 md:py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-400 text-lg">{t("no_results")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post, i) => (
              <div key={post._id} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
