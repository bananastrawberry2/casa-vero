import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Only create client if projectId is valid
const isValidConfig = /^[a-z0-9-]+$/.test(projectId);

export const client = isValidConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
      perspective: "published",
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

// Chainable image url helper — returns placeholder when Sanity not configured
export function urlFor(source: SanityImageSource) {
  if (!builder) {
    return {
      width: () => ({ height: () => ({ url: () => "/images/placeholder.svg" }) }),
      height: () => ({ width: () => ({ url: () => "/images/placeholder.svg" }) }),
      url: () => "/images/placeholder.svg",
    } as unknown as ReturnType<typeof builder.image>;
  }
  return builder.image(source);
}

export async function getSanityData<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params, {
    next: { revalidate: 60 },
  });
}
