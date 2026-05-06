export const PRODUCT_CATEGORIES = [
  { id: "home", label: "Home", japaneseText: "家" },
  { id: "apparel", label: "Apparel", japaneseText: "衣類" },
  { id: "decor", label: "Decor", japaneseText: "装飾" },
  { id: "wellness", label: "Wellness", japaneseText: "健康" },
  { id: "tea", label: "Tea", japaneseText: "お茶" },
  { id: "collections", label: "Collections", japaneseText: "Collections" },
  { id: "gifts", label: "Gifts", japaneseText: "贈り物" },
  { id: "seasonal", label: "Seasonal", japaneseText: "季節" },
  {
    id: "limited_edition",
    label: "Limited Edition",
    japaneseText: "限定版",
  },
] as const;

export type ProductCategoryId = (typeof PRODUCT_CATEGORIES)[number]["id"];

const LEGACY_CATEGORY_MAP: Record<string, ProductCategoryId> = {
  dining: "collections",
  "limited edition": "limited_edition",
  limited: "limited_edition",
};

export const normalizeProductCategoryId = (
  category: string
): ProductCategoryId | string => {
  const normalized = category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  const labelNormalized = normalized.replace(/_/g, " ");

  return LEGACY_CATEGORY_MAP[labelNormalized] || normalized;
};
