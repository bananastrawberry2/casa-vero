"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { SanityImage } from "@/lib/sanity";

export function ProductGallery({ images }: { images: SanityImage[] }) {
  const [selected, setSelected] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-square bg-stone-100 rounded-2xl flex items-center justify-center text-stone-400">
        No image
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square bg-stone-50 rounded-2xl overflow-hidden">
        <Image
          src={urlFor(images[selected]).width(800).height(800).url()}
          alt="Product photo"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                i === selected
                  ? "border-wood-500"
                  : "border-transparent hover:border-stone-200"
              }`}
            >
              <Image
                src={urlFor(img).width(120).height(120).url()}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
