import fs from "fs";
import path from "path";
import matter from "gray-matter";

function toDateString(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === "string") return v;
  return "";
}

export interface ArticleMeta {
  slug: string;
  title: string;
  summary: string;
  cover: string;
  date: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

const contentDir = path.join(process.cwd(), "content");

export function getArticles(category: string): Article[] {
  const dir = path.join(contentDir, category);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");

      return {
        slug,
        title: data.title || slug,
        summary: data.summary || "",
        cover: data.cover || "/bg/food_card.jpg",
        date: toDateString(data.date),
        content,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(category: string, slug: string): Article | null {
  const filePath = path.join(contentDir, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    summary: data.summary || "",
    cover: data.cover || "/bg/food_card.jpg",
    date: toDateString(data.date),
    content,
  };
}

export function getArticleSlugs(category: string): string[] {
  const dir = path.join(contentDir, category);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
