import type { Schema, Attribute } from '@strapi/strapi';

export interface ListList extends Schema.Component {
  collectionName: 'components_list_lists';
  info: {
    displayName: 'List';
  };
  attributes: {
    list: Attribute.String;
  };
}

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

export interface LandingPageServiceSection extends Schema.Component {
  collectionName: 'components_landing_page_service_sections';
  info: {
    displayName: 'Service Section';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images'> & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    learnBtn: Attribute.String & Attribute.Required;
  };
}

export interface LandingPageReviewSection extends Schema.Component {
  collectionName: 'components_landing_page_review_sections';
  info: {
    displayName: 'Review Section';
    description: '';
  };
  attributes: {
    trustTitle: Attribute.String & Attribute.Required;
    logoOne: Attribute.Media<'images'> & Attribute.Required;
    logoTwo: Attribute.Media<'images'> & Attribute.Required;
    logoThree: Attribute.Media<'images'> & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    review: Attribute.Text & Attribute.Required;
    writerName: Attribute.String & Attribute.Required;
    writerCompany: Attribute.String & Attribute.Required;
    logoFour: Attribute.Media<'images'> & Attribute.Required;
    mapTitle: Attribute.String & Attribute.Required;
    mapDescription: Attribute.Text & Attribute.Required;
    mapImage: Attribute.Media<'images'> & Attribute.Required;
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
      'list.list': ListList;
      'landing-page.why-us-section': LandingPageWhyUsSection;
      'landing-page.service-section': LandingPageServiceSection;
      'landing-page.review-section': LandingPageReviewSection;
      'landing-page.pricing-section': LandingPagePricingSection;
      'landing-page.hero-section': LandingPageHeroSection;
      'cards.why-us-card': CardsWhyUsCard;
    }
  }
}
