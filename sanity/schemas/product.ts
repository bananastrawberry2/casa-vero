import { defineType, defineField } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "object",
      fields: [
        { name: "el", title: "Ελληνικά", type: "string", validation: (r) => r.required() },
        { name: "en", title: "English", type: "string", validation: (r) => r.required() },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.el", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "el", title: "Ελληνικά", type: "blockContent" },
        { name: "en", title: "English", type: "blockContent" },
      ],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "price",
      title: "Price (€)",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "compareAtPrice",
      title: "Compare at Price (€)",
      type: "number",
      description: "Original price before discount (strikethrough)",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "object",
      fields: [
        { name: "width", title: "Width", type: "number" },
        { name: "height", title: "Height", type: "number" },
        { name: "depth", title: "Depth", type: "number" },
        { name: "unit", title: "Unit", type: "string", options: { list: ["cm", "in"] } },
      ],
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "colors",
      title: "Colors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "object", fields: [
              { name: "el", title: "Ελληνικά", type: "string" },
              { name: "en", title: "English", type: "string" },
            ]},
            { name: "hex", title: "Hex Code", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "el", title: "Ελληνικά", type: "string" },
            { name: "en", title: "English", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", title: "Meta Title", type: "string" },
        { name: "description", title: "Meta Description", type: "text", rows: 3 },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name.el",
      media: "images.0",
      subtitle: "price",
    },
    prepare({ title, media, subtitle }) {
      return {
        title: title || "Untitled",
        subtitle: subtitle ? `${subtitle}€` : "",
        media,
      };
    },
  },
  orderings: [
    { title: "Price Asc", name: "priceAsc", by: [{ field: "price", direction: "asc" }] },
    { title: "Price Desc", name: "priceDesc", by: [{ field: "price", direction: "desc" }] },
  ],
});
