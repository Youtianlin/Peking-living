import { notFound } from "next/navigation";
import { getArticle, getArticleSlugs } from "@/lib/articles";
import { ArticleContent } from "./ArticleContent";

export function generateStaticParams() {
  const slugs = getArticleSlugs("food");
  return slugs.map((slug) => ({ slug }));
}

export default async function FoodArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle("food", slug);
  if (!article) notFound();

  return <ArticleContent article={article} category="food" />;
}
