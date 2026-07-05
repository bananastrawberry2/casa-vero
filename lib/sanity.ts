import { client, urlFor } from "@/sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export { client, urlFor };
export type { SanityImageSource };

// ─── Types ───────────────────────────────────────────
export interface SanitySEO {
  title?: string;
  description?: string;
}

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; width: number; height: number };
}

export interface BilingualField {
  el: string;
  en: string;
}

export interface Feature {
  el: string;
  en: string;
}

export interface Dimension {
  width?: number;
  height?: number;
  depth?: number;
  unit?: string;
}

export interface Color {
  name: string;
  hex: string;
}

export interface Product {
  _id: string;
  name: BilingualField;
  slug: { current: string };
  description?: { el: unknown[]; en: unknown[] };
  images: SanityImage[];
  price: number;
  compareAtPrice?: number;
  category: { _id: string; title: BilingualField; slug: { current: string } };
  dimensions?: Dimension;
  materials?: string[];
  colors?: Color[];
  features?: Feature[];
  inStock: boolean;
  featured: boolean;
  seo?: SanitySEO;
}

export interface Category {
  _id: string;
  title: BilingualField;
  slug: { current: string };
  description?: BilingualField;
  image?: SanityImage;
  order: number;
}

export interface BlogPost {
  _id: string;
  title: BilingualField;
  slug: { current: string };
  excerpt?: BilingualField;
  content?: { el: unknown[]; en: unknown[] };
  coverImage?: SanityImage;
  publishedAt: string;
  tags?: string[];
  relatedProducts?: Product[];
  seo?: SanitySEO;
}

// ─── Safe query helper ──────────────────────────────
function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  if (!client) return Promise.resolve([] as unknown as T);
  return client.fetch<T>(query, params || {}, { next: { revalidate: 60 } });
}

function safeFetchOne<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!client) return Promise.resolve(null);
  return client.fetch<T>(query, params || {}, { next: { revalidate: 60 } });
}

// ─── Queries ──────────────────────────────────────────
const productsQuery = `{
  _id, name, slug, price, compareAtPrice, inStock, featured,
  images, materials, colors,
  category->{ _id, title, slug },
  dimensions, features
}`;

export async function getFeaturedProducts(): Promise<Product[]> {
  return safeFetch<Product[]>(
    `*[_type == "product" && featured == true]${productsQuery} | order(price asc)`
  );
}

export async function getProducts(): Promise<Product[]> {
  return safeFetch<Product[]>(
    `*[_type == "product"]${productsQuery} | order(name.el asc)`
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return safeFetchOne<Product>(
    `*[_type == "product" && slug.current == $slug][0]{
      _id, name, slug, description, price, compareAtPrice, inStock, featured,
      images, materials, colors, features, dimensions, seo,
      category->{ _id, title, slug }
    }`,
    { slug }
  );
}

export async function getProductsByCategory(categorySlug: string) {
  return safeFetch(
    `*[_type == "category" && slug.current == $categorySlug][0]{
      "products": *[_type == "product" && references(^._id)]${productsQuery}
    }`,
    { categorySlug }
  );
}

// Categories
export async function getCategories(): Promise<Category[]> {
  return safeFetch<Category[]>(
    `*[_type == "category"]{ _id, title, slug, description, image, order } | order(order asc)`
  );
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return safeFetchOne<Category>(
    `*[_type == "category" && slug.current == $slug][0]{ _id, title, slug, description, image }`,
    { slug }
  );
}

// Blog
export async function getBlogPosts(): Promise<BlogPost[]> {
  return safeFetch<BlogPost[]>(
    `*[_type == "blog"] | order(publishedAt desc){
      _id, title, slug, excerpt, coverImage, publishedAt, tags
    }`
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return safeFetchOne<BlogPost>(
    `*[_type == "blog" && slug.current == $slug][0]{
      _id, title, slug, excerpt, content, coverImage, publishedAt, tags, seo,
      "relatedProducts": relatedProducts[]->{ _id, name, slug, price, images, category->{title} }
    }`,
    { slug }
  );
}

// Settings
export async function getSettings() {
  return safeFetchOne(`*[_type == "settings"][0]`);
}
