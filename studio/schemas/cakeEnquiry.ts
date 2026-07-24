import { defineField, defineType } from "sanity";

// Created automatically when someone sends the "Order a cake" form.
// Read-only in the studio (delete is allowed, to clear handled ones).
export const cakeEnquiry = defineType({
  name: "cakeEnquiry",
  title: "Cake enquiry",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "occasion", title: "Occasion", type: "string", readOnly: true }),
    defineField({ name: "eventDate", title: "Date of event", type: "string", readOnly: true }),
    defineField({ name: "servings", title: "Servings", type: "string", readOnly: true }),
    defineField({ name: "message", title: "Message", type: "text", readOnly: true }),
    defineField({ name: "submittedAt", title: "Received", type: "datetime", readOnly: true }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", occasion: "occasion", eventDate: "eventDate" },
    prepare({ title, occasion, eventDate }) {
      return {
        title: title || "(no name)",
        subtitle: [occasion, eventDate].filter(Boolean).join(" · "),
      };
    },
  },
});
