import type { Schema, Attribute } from '@strapi/strapi';

export interface LandingPageWhyUsSection extends Schema.Component {
  collectionName: 'components_landing_page_why_us_sections';
  info: {
    displayName: 'WhyUs Section';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    whyUsCard: Attribute.Component<'cards.why-us-card', true> &
      Attribute.Required;
  };
}

export interface LandingPagePricingSection extends Schema.Component {
  collectionName: 'components_landing_page_pricing_sections';
  info: {
    displayName: 'Pricing Section';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    purchaseBtn: Attribute.String & Attribute.Required;
  };
}

export interface LandingPageHeroSection extends Schema.Component {
  collectionName: 'components_landing_page_hero_sections';
  info: {
    displayName: 'Hero Section';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    button1: Attribute.String & Attribute.Required;
    button2: Attribute.String & Attribute.Required;
    image: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface CardsWhyUsCard extends Schema.Component {
  collectionName: 'components_cards_why_us_cards';
  info: {
    displayName: 'WhyUs Card';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'landing-page.why-us-section': LandingPageWhyUsSection;
      'landing-page.pricing-section': LandingPagePricingSection;
      'landing-page.hero-section': LandingPageHeroSection;
      'cards.why-us-card': CardsWhyUsCard;
    }
  }
}
