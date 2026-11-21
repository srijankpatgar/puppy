export interface MediaItem {
  id: string;
  url: string;
  kind: "image" | "video";
  width: number;
  height: number;
  alt: string;
  caption?: string;
  focalX?: number;
  focalY?: number;
  color?: string;
  blurDataUrl?: string | null;
  durationS?: number | null;
  poster?: {
    id: string;
    url: string;
    kind: "image";
    width: number;
    height: number;
    alt: string;
    caption?: string;
    focalX?: number;
    focalY?: number;
    color?: string;
    blurDataUrl?: string | null;
    durationS?: number | null;
    poster?: null;
  } | null;
}

export interface Puppy {
  id: string;
  slug: string;
  name: string;
  displayName?: string;
  breed: string;
  gender: "male" | "female";
  genderLabel: string; // "Boy" | "Girl"
  age: string;
  colour?: string;
  description?: string;
  records?: string[];
  status: "available" | "gone-home";
  featured?: boolean;
  seoDescription?: string;
  cover: MediaItem;
  media: MediaItem[];
  origin: {
    slug: "local" | "imported";
    name: "Dubai" | "Imported" | "Showroom";
  };
  collections?: string[];
  breeds: Array<{
    slug: string;
    name: string;
  }>;
  published?: boolean;
}

export interface PuppyFilterParams {
  breed?: string;
  origin?: "local" | "imported" | "all";
  gender?: "male" | "female" | "all";
  sort?: "recent" | "age" | "name";
}
