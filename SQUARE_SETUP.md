# Elephantaes · Square Item Setup Reference

Everything you need to add Alex's items to her Square Online store. Copy-paste friendly. All prices, descriptions, and photo paths in one place.

---

## Quick reference table

| # | Item | Variations | Price each | Photo |
|---|---|---|---|---|
| 1 | **Classic Italian Tiramisu** | 10 oz / 20 oz | $8 / $14 | `tiramisu-classic.jpg` |
| 2 | **Strawberry Tiramisu** | 10 oz / 20 oz | $9 / $16 | `tiramisu-strawberry.jpg` |
| 3 | **Passion Fruit Honeycomb Tiramisu** *(seasonal)* | 10 oz / 20 oz | $12 / $18 | `tiramisu-passionfruit.jpg` |

All three live as standing items on the Square shop. Custom cakes stay off Square — they continue going through the inquiry form on the landing page.

---

## Item details — copy-paste into Square

### Item 1 — Classic Italian Tiramisu

**Name:** `Classic Italian Tiramisu`

**Description:**
> The original. Espresso-soaked ladyfingers, mascarpone cream, dusted dark cocoa. Hand-built in small batches, ready for weekend pickup.

**Short description / one-liner (for product cards):**
> The original — espresso, mascarpone, dark cocoa.

**Category:** Tiramisu

**Variations:**
| Variation name | Price | SKU (optional) |
|---|---|---|
| 10 oz | $8.00 | TIR-CL-10 |
| 20 oz | $14.00 | TIR-CL-20 |

**Photo:** `site/public/gallery/tiramisu-classic.jpg`
(Square accepts JPG, square crop preferred — Square will auto-crop to a square if you upload portrait)

**Tax:** PA sales tax (6% in Philly area, or 8% if she's in city limits — confirm with her)

**Inventory tracking:** Recommend ON. Set weekly stock per variation (Alex caps how many she bakes per weekend).

---

### Item 2 — Strawberry Tiramisu

**Name:** `Strawberry Tiramisu`

**Description:**
> Strawberry purée swap for the espresso. Light, bright, surprisingly summery. Hand-built in small batches with fresh strawberry topping, ready for weekend pickup.

**Short description:**
> Bright and summery — strawberry purée swap for the espresso.

**Category:** Tiramisu

**Variations:**
| Variation name | Price | SKU (optional) |
|---|---|---|
| 10 oz | $9.00 | TIR-ST-10 |
| 20 oz | $16.00 | TIR-ST-20 |

**Photo:** `site/public/gallery/tiramisu-strawberry.jpg`

**Tax:** PA sales tax

**Inventory tracking:** ON, weekly stock cap.

---

### Item 3 — Passion Fruit Honeycomb Tiramisu *(seasonal — spring release)*

**Name:** `Passion Fruit Honeycomb Tiramisu`

**Description:**
> Spring release. Passion-fruit-soaked ladyfingers, honey mascarpone cream, raw honeycomb on top. A limited-batch flavour — when it's gone, it's gone until next year.

**Short description:**
> Spring release — passion fruit, honey mascarpone, raw honeycomb.

**Category:** Tiramisu (or "Limited Release" if she wants a separate section)

**Variations:**
| Variation name | Price | SKU (optional) |
|---|---|---|
| 10 oz | $12.00 | TIR-PF-10 |
| 20 oz | $18.00 | TIR-PF-20 |

**Photo:** `site/public/gallery/tiramisu-passionfruit.jpg`

**Tax:** PA sales tax

**Inventory tracking:** ON. Maybe lower stock cap since it's seasonal/limited. Consider toggling it off entirely after spring.

---

## Suggested categories

Square lets her group items into categories that show as sections on the store page. Recommended:

1. **Tiramisu** — the three flavors above (default landing category)
2. **Cookie Boxes** — when seasonal (holiday cookie box, etc.) — currently empty, add when she launches a new batch
3. **Mini Cakes** — for Valentine's, baby showers, etc. — currently empty, add when relevant
4. **Custom Cakes** — link/redirect this category back to the landing page inquiry form rather than selling directly. Or skip the category entirely and route via the landing page.

---

## Fulfillment setup (do this before publishing items)

In Square Dashboard → Online → Fulfillment:

**Pickup**
- Location: her home studio address (need from Alex)
- Pickup windows:
  - **Saturday 9:00 AM – 12:00 PM**
  - **Sunday 2:00 PM – 5:00 PM**
- Lead time: **48 hours minimum** (she needs time to bake fresh)
- Cutoff: order by **Thursday 11:59 PM** for the upcoming weekend's pickup
- Confirmation: auto-send pickup time confirmation when order placed

**Delivery (skip for now)**
- Alex is pickup-only as of this build. Skip delivery setup. Easy to add later if she wants.

**Shipping (skip)**
- Not applicable for fresh tiramisu.

---

## Things she'll also need to set up in Square

| Setting | What to do |
|---|---|
| **Business info** | Name: Elephantaes Cakes & Delicacies. Address: her studio. Phone: (267) 414-7861. |
| **Bank account** | Link her business bank for payouts. Stripe-equivalent setup. Usually 1–2 business days for first payout. |
| **Tax registration** | She needs a PA sales tax license if she doesn't have one. Free at [revenue.pa.gov](https://www.revenue.pa.gov). Square Tax handles collection once registered. |
| **Allergen disclosure** | Add to each item: contains wheat, eggs, dairy. Square has an allergen field per item. |
| **Refund policy** | Standard small-batch food: "No refunds on pickup. Cancellations 48+ hours before pickup get full refund." |
| **Banner image** | Upload `elephantaes-square-banner.png` (2400×800) at project root. |
| **Brand colors** | Forest green `#2e4a2a`, cream `#f8f0d2`, honey `#c9985c`. Use these in the Square theme settings for buttons/accents to match the landing page. |
| **Font** | Square's "Fraunces" or closest serif option. If Fraunces isn't available, "Lora" or "Playfair Display" are close. |

---

## Linking the landing page to the Square shop

In `/site/lib/content.ts` there's already a `brand.shopUrl` reference used by the "Order online" CTA in the Tiramisu section. Once her Square shop is live, set this to her shop URL:

```ts
// In site/lib/content.ts
export const brand = {
  // ...other fields,
  shopUrl: "https://elephantaes.square.site",  // ← Alex's actual Square URL goes here
  // ...
};
```

(Or if she sets up a custom domain like `shop.elephantaescakes.com`, use that.)

After updating, rebuild the static export (`npm run build` in `/site/`) and redeploy `/site/out/` to Netlify.

---

## Photo handling tips for Square

- **All three tiramisu photos** are at `site/public/gallery/` — these are the same ones used on the landing page, so the brand stays consistent.
- **Square auto-crops to square** in some thumbnail views. The three photos are roughly portrait (3:4 or close to square), so the crop should keep the product centered.
- **For each item, Square allows multiple photos.** Recommend at least 2 per item:
  - Primary: the top close-up (`tiramisu-classic.jpg`, `tiramisu-strawberry.jpg`, `tiramisu-passionfruit.jpg`)
  - Secondary: the layers cross-section (`tiramisu-layers.jpg`) — gorgeous and shows the layered build, applies well to all three
- **Bonus context shot:** `tiramisu-duo-branded.jpg` for the Classic and Strawberry pair shot

---

## Brand voice for descriptions

Match the landing page tone. Examples:

✅ *"The original. Espresso-soaked ladyfingers, mascarpone cream, dusted dark cocoa."*
❌ *"Our delicious classic Italian tiramisu, made fresh daily with the finest ingredients!"*

Short, confident, declarative. No exclamation points. No "delicious" or "amazing." Let the photo and the price do the selling.

---

## Things to *not* include in Square (yet)

- **Custom cakes.** These are inquiry-driven, not standing items. Keep them on the landing page's contact form. If Alex wants to take deposits via Square eventually, Square supports invoicing — that's separate from store items.
- **Wholesale orders to Mr Rabbit / other coffee shops.** Wholesale should be invoiced directly or via a separate Square pricing tier (Square supports customer-specific pricing in higher plans). Not part of the consumer storefront.
- **Newsletter signup.** Keep that on the landing page; Square's email tools aren't great. Hook up Mailchimp/Kit/Buttondown for newsletters separately.

---

## Quick launch checklist

```
[ ] Add business info + bank account in Square
[ ] Register for PA sales tax if not already
[ ] Set up pickup windows (Sat 9–12, Sun 2–5) + 48hr lead time
[ ] Add Item 1: Classic Italian Tiramisu (10oz $8 / 20oz $14)
[ ] Add Item 2: Strawberry Tiramisu (10oz $9 / 20oz $16)
[ ] Add Item 3: Passion Fruit Honeycomb Tiramisu (10oz $12 / 20oz $18)
[ ] Upload primary + secondary photos for each item
[ ] Upload banner image
[ ] Set brand colors (forest #2e4a2a, cream #f8f0d2, honey #c9985c)
[ ] Place a test order, verify confirmation emails work
[ ] Get Square shop URL
[ ] Update brand.shopUrl in /site/lib/content.ts
[ ] Rebuild site + redeploy to Netlify
[ ] Announce on Instagram with a story tagging the new shop URL
```
