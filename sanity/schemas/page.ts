import { defineType, defineField } from "sanity";

export const pageSchema = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "el", title: "Ελληνικά", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.el", maxLength: 96 },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        { name: "el", title: "Ελληνικά", type: "blockContent" },
        { name: "en", title: "English", type: "blockContent" },
      ],
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
});
