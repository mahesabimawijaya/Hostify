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
  whyUsSection: IWhyUsSection;
  pricingSection: IPricingSection;
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

export interface IPricingSection {
  id: number;
  title: string;
  description: string;
  purchaseBtn: string;
}

export type Meta = object;

export interface IWhyUsSection {
  id: number;
  title: string;
  description: string;
  whyUsCard: IWhyUsCard[];
}

export interface IWhyUsCard {
  id: number;
  title: string;
  description: string;
  image: Image;
}

export interface NavbarData {
  logo: Image;
  logoText: string;
  loginBtn: string;
  signUpBtn: string;
  linkInfo: string;
  linkProduct: string;
}

export interface FooterData {
  logo: Image;
  logoText: string;
  description: string;
  iconEmail: Image;
  email: string;
  iconPhone: Image;
  phone: string;
  titleService: string;
  aboutUsTitle: string;
  addressTitle: string;
  street: string;
  area: string;
  socialOne: Image;
  socialTwo: Image;
  aboutUsList: List[];
  serviceList: List[];
}

export interface List {
  id: number;
  list: string;
}
