import { defineField, defineType } from "sanity";

export const signatureCard = defineType({
  name: "signatureCard",
  title: "What we bake (cards)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: 'E.g. "Custom Celebration Cakes".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Two or three sentences about this offering.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "detail",
      title: "Bottom line",
      description: 'The small line at the bottom, e.g. "From $85 · 2 weeks notice".',
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Position",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Card order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "detail" },
  },
});
