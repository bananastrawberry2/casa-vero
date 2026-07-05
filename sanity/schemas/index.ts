import { productSchema } from "./product";
import { categorySchema } from "./category";
import { blogSchema } from "./blog";
import { pageSchema } from "./page";
import { settingsSchema } from "./settings";
import { blockContentType } from "./blockContent";

export const schemaTypes = [
  productSchema,
  categorySchema,
  blogSchema,
  pageSchema,
  settingsSchema,
  blockContentType,
];
