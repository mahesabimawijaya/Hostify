export interface Asset {
  data: AssetData;
  meta: Meta;
}

export interface AssetData {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  heroSection: IHeroSection;
  whyUsSection: PricingSection;
  pricingSection: PricingSection;
}

export interface IHeroSection {
  id: number;
  title: string;
  description: string;
  button1: string;
  button2: string;
  image: Image;
}

export interface Image {
  data: ImageData;
}

export interface ImageData {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Formats {
  large: Large;
  small: Large;
  medium: Large;
  thumbnail: Large;
}

export interface Large {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface PricingSection {
  id: number;
  title: string;
  description: string;
  purchaseBtn?: string;
  whyUsCard?: PricingSection[];
}

export type Meta = object;

export interface IWhyUsSection {
  id: number;
  title: string;
  description: string;
  whyUsCard: whyUsCard[];
}

export interface whyUsCard {
  id: number;
  title: string;
  description: string;
  image: Image;
}
