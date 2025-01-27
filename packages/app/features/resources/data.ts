// export const CDN_DOMAIN = "https://cdn.joinhomefront.org";

// export const CDN_DOMAIN = `https://nextjs-joshsmith-joinhomefront-cdxrcaoh.s3.us-east-1.amazonaws.com`;

export const CDN_DOMAIN = process.env.NEXT_PUBLIC_CDN_DOMAIN;

export const RESOURCE_SORTS = [
  { key: "hot", label: "Hot" },
  { key: "new", label: "New" },
  { key: "top", label: "Top" },
  { key: "rising", label: "Rising" },
] as const;

export const TABS = [
  { key: "link", title: "Link" },
  { key: "text", title: "Text" },
  { key: "media", title: "Images & Video" },
] as const;
