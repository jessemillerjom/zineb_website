# Zineb Ceramics — Shopify Theme

A custom Shopify theme for Zineb's handcrafted ceramics shop. Inspired by the existing portfolio site, this theme carries the same Moroccan-meets-Brooklyn design language into a full e-commerce experience.

## Design System

**Colors** (Morocco → Brooklyn palette)
- Terracotta `#C97D60` — primary CTA, accents
- Blue `#2E5266` — secondary, hero backgrounds
- Sand `#F4E4C1` — warm background tones
- Cream `#F9F7F4` — page background
- Charcoal `#2C2C2C` — footer, body text

**Fonts**
- Headings: Playfair Display (elegant, editorial)
- Body: Inter (clean, readable)

## Theme Structure

```
shopify-theme/
├── layout/
│   └── theme.liquid          # Main layout: nav, announcement bar, footer
├── templates/
│   ├── index.json            # Homepage section config
│   ├── index.liquid          # Homepage
│   ├── collection.liquid     # Collection browsing page
│   ├── collections.liquid    # All collections page
│   ├── product.liquid        # Product detail page
│   ├── cart.liquid           # Cart page
│   ├── page.liquid           # Generic page
│   ├── page.about.liquid     # About page (Zineb's story)
│   ├── page.contact.liquid   # Contact / commission page
│   └── search.liquid         # Search results
├── sections/
│   ├── hero.liquid               # Full-screen hero with image/overlay
│   ├── featured-collections.liquid # 3-up collection cards
│   ├── featured-products.liquid    # Product grid from a collection
│   ├── about-preview.liquid        # Two-image + text block
│   ├── testimonials.liquid         # 3-column review cards
│   └── instagram-strip.liquid      # 6-up photo grid
├── snippets/
│   └── product-card.liquid   # Reusable product card with hover swap
├── assets/
│   ├── theme.css             # All styles
│   └── theme.js              # Interactivity (cart, gallery, mobile nav)
├── config/
│   ├── settings_schema.json  # Theme settings definitions
│   └── settings_data.json    # Default setting values
└── locales/
    └── en.default.json       # English strings
```

## Pages to Create in Shopify Admin

After uploading the theme, create these pages in **Online Store → Pages**:

| Page title | Template |
|---|---|
| About | `page.about` |
| Contact | `page.contact` |
| Shipping & Returns | `page` (default) |
| Ceramic Care | `page` (default) |
| Custom Orders | `page` (default) |

## Collections to Create

| Handle | Display name |
|---|---|
| `bowls` | Bowls |
| `mugs` | Mugs |
| `vases` | Vases & Objects |
| `sets` | Sets |
| `new-arrivals` | New Arrivals |

## How to Install

1. In your Shopify admin, go to **Online Store → Themes**
2. Click **Add theme → Upload zip file**
3. Zip the `shopify-theme/` folder and upload it
4. Click **Customize** to:
   - Upload Zineb's logo
   - Add hero background images
   - Set Instagram handle
   - Enable/disable the announcement bar
5. Add products with at least two images per product (enables hover-swap on cards)

## Key Features

- **Hover image swap** on product cards (primary → secondary image)
- **Quick-add to cart** for single-variant products
- **Live cart count** in navigation
- **Sticky header** with blur backdrop
- **Mobile-responsive** down to 320px
- **Fade-in animations** on scroll (IntersectionObserver)
- **Product gallery** with clickable thumbnails
- **Quantity controls** on product and cart pages
- **Accordion** for ceramic care + shipping info on product pages
- **Newsletter signup** in footer (connects to Shopify email marketing)
