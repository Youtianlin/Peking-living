import { getArticles } from "@/lib/articles";
import type { ArticleMeta } from "@/lib/articles";
import { FoodIndexClient } from "./FoodIndexClient";

export default function FoodPage() {
  const articles = getArticles("food");
  const metas: ArticleMeta[] = articles.map(({ slug, title, summary, cover, date }) => ({
    slug,
    title,
    summary,
    cover,
    date,
  }));

  return <FoodIndexClient articles={metas} />;
}
