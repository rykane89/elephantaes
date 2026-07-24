import { defineField, defineType } from "sanity";

export const journalSection = defineType({
  name: "journalSection",
  title: "Journal / newsletter",
  type: "document",
  fields: [
    defineField({
      name: "issue",
      title: "Issue label",
      description: 'E.g. "Issue 14".',
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Issue date",
      description: 'E.g. "April 2026".',
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Issue title",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "A few sentences teasing the issue.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "readingTime",
      title: "Reading time",
      description: 'E.g. "6 min read".',
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link to the issue",
      description:
        "Where \"Read the issue\" goes — an Instagram post, a Substack page, anywhere the issue lives. Leave empty to hide the button.",
      type: "url",
    }),
    defineField({
      name: "cover",
      title: "Cover photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "archive",
      title: "Archive list",
      description: "Older issues listed under the featured one.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "date",
              title: "Date",
              description: 'E.g. "Mar 2026".',
              type: "string",
            }),
            defineField({
              name: "link",
              title: "Link",
              description: "Where this issue lives. Leave empty and the row shows without a link.",
              type: "url",
            }),
          ],
          preview: { select: { title: "title", subtitle: "date" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Journal / newsletter" }),
  },
});
