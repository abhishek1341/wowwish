# WowWish Product Summary

Last updated: 2026-06-12

## One-Line Idea

WowWish is a WhatsApp-first service for creating personalized, mobile-first wish websites that combine photos, music, messages, memories, and a private shareable link for special occasions.

## Product Concept

WowWish helps a customer turn a personal occasion into a small customized web experience. Instead of sending a plain image, text message, or forwarded greeting, the customer gets a private mobile-friendly link that feels like a mini website for one person or group.

The product is positioned around emotional, shareable surprise pages for WhatsApp, Instagram stories/status, and family or friend groups. The customer chooses an occasion or template, sends names, photos, music preference, message tone, and deadline on WhatsApp, then WowWish manually customizes the final page and shares a private link.

## Target Customers

- People who want to surprise a friend, partner, sibling, spouse, or family member.
- Couples celebrating anniversaries or proposals.
- Friends creating birthday pages for besties, college groups, or long-distance friends.
- Families who want digital invites or festival greetings.
- Small businesses, creators, and brands that may want premium client/team greetings.

## Current Main Occasions

- Birthday
- Anniversary
- Proposal
- Wedding invite / digital kankotri
- Festivals
- Corporate wishes

In the current implementation, birthday, anniversary, and proposal have the strongest template/demo coverage. Wedding invite, festivals, and corporate wishes are shown as broader v2 categories, with some areas still presented as coming soon or not fully implemented.

## Core Customer Flow

1. Customer lands on the WowWish website.
2. Customer explores templates or occasion categories.
3. Customer opens live demos to understand the style.
4. Customer clicks "Start on WhatsApp", "Start My Page", or a similar CTA.
5. Customer provides basic details such as occasion, template, recipient name, relationship, event date, tone, language, music preference, and notes.
6. Customer continues on WhatsApp and sends photos plus extra details there.
7. WowWish confirms the package, price, timeline, and final flow.
8. WowWish creates the personalized page manually.
9. Customer previews the page before final delivery.
10. Customer receives a private shareable link for WhatsApp, Instagram, status, or groups.

## Main User-Facing Features

- Marketing home page explaining the product and value proposition.
- Template and occasion browsing.
- Live demo links for existing template styles.
- Mobile-first preview cards and phone mockups.
- Lead capture modal/form.
- WhatsApp deep-link order handoff.
- Email contact link.
- Pricing sections.
- FAQ and trust/privacy messaging.
- Analytics event tracking through `dataLayer` and optional `gtag`.
- Several demo routes for birthday, anniversary, proposal, and romantic letter experiences.

## Current Template Coverage

Current classic template data includes:

- Birthday
- Birthday Bestie
- Birthday Yaari
- Anniversary
- Anniversary Cute
- Anniversary Elegant
- Proposal
- Proposal Cute
- Proposal Luxury
- Wedding Invite / Digital Kankotri as coming soon

Current v2 template data includes:

- Birthday Pop Story
- Birthday Bestie
- Birthday Yaari
- Anniversary
- Anniversary Cute
- Anniversary Elegant
- Proposal Romantic Glow
- Proposal Cute Story
- Proposal Luxury 

Theme directions include GenZ Pop, Romantic Floral, Luxury Gold, Indian Festive, Dark Neon AI, Minimal Elegant, and Corporate Premium.

## Pricing Visible In The App

There are two pricing systems currently visible in code:

- Older/main site flow: INR 499 Basic and INR 799 Premium, with templates shown as INR 499 onwards.
- Newer WowWish v2 flow: INR 999 Surprise Page and INR 1,499 Premium Memory Story.

For future product feedback, treat the v2 pricing as the intended newer direction unless the pricing strategy changes.

## Package Positioning

Surprise Page, around INR 999:

- Personalized wish page
- Name and message
- Around 6-8 photos
- Music
- Basic animation
- Preview
- Private shareable link

Premium Memory Story, around INR 1,499:

- Richer memory-story style page
- Custom emotional or letter-style copy
- Around 10-15 photos
- Premium section flow
- Stronger animation
- One revision
- Preview and final private link

## Trust And Privacy Promise

The current site says:

- Photos are used only to create the page.
- The final page is shared through a private link.
- No app install is needed.
- Pages are WhatsApp and Instagram friendly.
- Photos are not posted publicly without permission.
- Customers can request deletion after delivery.

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Playwright dependency for scripts/testing support

## Current Architecture

The project is mostly a static/client-rendered Next.js marketing and demo application.

Important areas:

- `src/app/page.tsx`: main home page entry.
- `src/components/site/HomePage.tsx`: current main marketing page.
- `src/components/site/TemplatesRouterPage.tsx`: classic template category/detail routing UI.
- `src/components/site/LeadModal.tsx`: classic lead form and WhatsApp handoff.
- `src/components/wowwish-v2/WowWishV2Experience.tsx`: newer v2 experience with richer visual design, template marketplace, pricing, FAQ, and lead modal.
- `src/lib/templates.ts`: classic template/category data.
- `src/lib/wowwishV2.ts`: v2 categories, themes, templates, and pricing constants.
- `src/lib/wowwishOrder.ts`: WhatsApp number, email, order intent, and WhatsApp URL/message builder.
- `src/lib/analytics.ts`: lightweight analytics event wrapper.

## Integrations Currently Confirmed

- WhatsApp deep links through `wa.me`.
- Email contact through `mailto:`.
- Client-side analytics via `window.dataLayer` and optional `window.gtag`.

## Not Yet Implemented Or Not Confirmed

The current code does not confirm production implementations for:

- User accounts or authentication.
- Database-backed order storage.
- File/photo upload flow.
- Payment gateway checkout.
- Admin dashboard.
- Automated page generation.
- Real AI image/copy generation APIs.
- Email automation.
- Customer order tracking.
- Persistent generated-page CMS.

Some AI/photo enhancement language appears as product/marketing direction, but not as a working API integration in the current code.

## Product Strengths

- Clear emotional use case.
- Strong WhatsApp-first ordering flow for the Indian market.
- Low-friction customer journey: no login, no app install, no complex upload flow.
- Mobile-first visual direction fits how customers will share the product.
- Template marketplace structure can scale across occasions.
- Manual service model can launch before building full automation.

## Key Product Questions For Feedback

- Is the value proposition clear within the first 5 seconds?
- Should the product focus first on birthdays, anniversaries, and proposals instead of many categories?
- Is the pricing easy to understand and consistent?
- Does the current UI make users trust the service enough to send personal photos?
- Should payment happen before or after WhatsApp confirmation?
- Should the site show real delivered examples, testimonials, turnaround time, and revision policy?
- What features should be automated later: upload flow, payments, generated pages, admin dashboard, AI copy, or AI photo enhancement?
- How can the homepage better explain that this is a custom private web page, not a greeting image?

## Claude-Ready Prompt

Use this prompt when asking Claude or another AI for feedback. Replace the URL placeholder with the Cloudflare deployment URL.

```text
I am building a product called WowWish.

Product summary:
WowWish is a WhatsApp-first service for creating personalized, mobile-first wish websites. Customers choose an occasion/template, send names, photos, music preference, message tone, date, and extra details on WhatsApp, and receive a private shareable link. The pages are designed for birthdays, anniversaries, proposals, wedding invites/digital kankotri, festivals, and corporate wishes. The current strongest flows are birthday, anniversary, and proposal.

Current flow:
1. User visits the website.
2. User browses templates and live demos.
3. User selects a template/package.
4. User continues on WhatsApp.
5. We confirm details, price, and timeline.
6. We manually create and personalize the page.
7. User previews the page.
8. User receives a private link to share on WhatsApp/Instagram/status/groups.

Current pricing direction:
- Surprise Page: around INR 999.
- Premium Memory Story: around INR 1,499.

Current implementation:
The app is a Next.js/React/Tailwind marketing and demo site. It has template browsing, demo pages, pricing, FAQ, trust/privacy messaging, and WhatsApp/email contact. It does not yet have auth, database order storage, payment gateway, file uploads, admin dashboard, or automated AI generation.

Deployment URL:
[PASTE CLOUDFLARE URL HERE]

Please review the current UI and product idea. Give me practical feedback on:
1. Whether the product idea is clear and compelling.
2. What is confusing in the current UI.
3. What should be improved on the homepage and template pages.
4. What trust signals are missing before users send personal photos.
5. Whether the pricing/packages make sense.
6. What features should be built next for an MVP.
7. How to improve conversion from visitor to WhatsApp inquiry.
8. Any copywriting, UX, design, or positioning improvements.
```

