import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "bakerName",
      title: "Baker name",
      description: 'Shown in "Hi, I\'m ..." and the signature badge.',
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      description: 'Display format, e.g. "(267) 414-7861".',
      type: "string",
    }),
    defineField({
      name: "inquiryEmail",
      title: "Email address",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      description: 'E.g. "Philadelphia, PA".',
      type: "string",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      description: "Without the @.",
      type: "string",
    }),
    defineField({
      name: "shopUrl",
      title: "Online shop link",
      description: 'Where "Order online" goes (your Square shop).',
      type: "url",
    }),
    defineField({
      name: "pickupLine",
      title: "Pickup summary line",
      description: 'The short line in the tiramisu section, e.g. "Pickup · Sat 9–12 · Sun 2–5".',
      type: "string",
    }),
    defineField({
      name: "pickupHours",
      title: "Pickup hours",
      description: "Shown in the footer.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "day", title: "Day", type: "string" }),
            defineField({
              name: "hours",
              title: "Hours",
              description: 'E.g. "9 AM — 12 PM".',
              type: "string",
            }),
          ],
          preview: { select: { title: "day", subtitle: "hours" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
