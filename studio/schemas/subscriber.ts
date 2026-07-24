import { defineField, defineType } from "sanity";

// Created automatically when someone signs up on the site.
// Read-only in the studio (delete is allowed, for unsubscribes).
export const subscriber = defineType({
  name: "subscriber",
  title: "Mailing list",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Signed up",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "email", subtitle: "submittedAt" },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "",
      };
    },
  },
});
