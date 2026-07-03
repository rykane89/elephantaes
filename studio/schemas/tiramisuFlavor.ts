import { defineField, defineType } from "sanity";

export const tiramisuFlavor = defineType({
  name: "tiramisuFlavor",
  title: "Tiramisu flavour",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Flavour name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "One or two short sentences shown on the card.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageAlt",
      title: "Photo description",
      description: "Describe the photo for screen readers.",
      type: "string",
    }),
    defineField({
      name: "sizes",
      title: "Sizes & prices",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Size", type: "string" }),
            defineField({
              name: "price",
              title: "Price",
              description: 'Include the dollar sign, e.g. "$8".',
              type: "string",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "price" },
          },
        },
      ],
      initialValue: [
        { label: "10 oz", price: "$" },
        { label: "20 oz", price: "$" },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "accent",
      title: "Seasonal spotlight",
      description:
        'Turns on the gold border and the "Limited · Spring Release" wax seal. Use for one flavour at a time.',
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Position",
      description: "Lower numbers appear first (left to right).",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Menu order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", media: "image", accent: "accent" },
    prepare({ title, media, accent }) {
      return {
        title,
        media,
        subtitle: accent ? "★ Seasonal spotlight" : undefined,
      };
    },
  },
});
