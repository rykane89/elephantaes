import { defineField, defineType } from "sanity";

export const storySection = defineType({
  name: "storySection",
  title: "The baker (bio)",
  type: "document",
  fields: [
    defineField({
      name: "subline",
      title: "Heading second line",
      description: 'The italic line under "Hi, I\'m Alex." E.g. "One pair of hands, a lot of butter."',
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      description: "Your story. Separate paragraphs with a blank line.",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "photo",
      title: "Portrait photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "photoAlt",
      title: "Photo description",
      description: "Describe the photo for screen readers.",
      type: "string",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      description: "The two quote cards under the bio (you can have more or fewer).",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
            defineField({
              name: "attribution",
              title: "Who said it",
              description: 'E.g. "Maya & Theo, wedding 2025".',
              type: "string",
            }),
          ],
          preview: { select: { title: "attribution", subtitle: "quote" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "The baker (bio)" }),
  },
});
