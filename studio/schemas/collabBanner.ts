import { defineField, defineType } from "sanity";

export const collabBanner = defineType({
  name: "collabBanner",
  title: "Collab banner",
  type: "document",
  description: "The partnership announcement section near the top of the site.",
  fields: [
    defineField({
      name: "active",
      title: "Show on the site",
      description: "Turn off to hide the whole collab section.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "partnerName",
      title: "Partner name",
      description: 'E.g. "Mr Rabbit".',
      type: "string",
    }),
    defineField({
      name: "partnerHandle",
      title: "Partner Instagram handle",
      description: "Without the @.",
      type: "string",
    }),
    defineField({
      name: "partnerUrl",
      title: "Partner link",
      description: "Usually their Instagram URL.",
      type: "url",
    }),
    defineField({
      name: "title",
      title: "Headline",
      description: 'E.g. "Tiramisu Collab".',
      type: "string",
    }),
    defineField({
      name: "timeWindow",
      title: "When",
      description: 'E.g. "This weekend only".',
      type: "string",
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
      description: "A sentence or two about the collab.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "flavors",
      title: "Featured items",
      description: "The short numbered list under the blurb.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "note", title: "Note", type: "string" }),
          ],
          preview: { select: { title: "name", subtitle: "note" } },
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "orderHref",
      title: "Button link",
      description: "Where the main button goes (Instagram, Square shop, etc.).",
      type: "url",
    }),
    defineField({
      name: "orderLabel",
      title: "Button text",
      description: 'E.g. "DM to reserve".',
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "partnerName", media: "image" },
  },
});
