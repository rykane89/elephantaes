import { defineField, defineType } from "sanity";

export const galleryPhoto = defineType({
  name: "galleryPhoto",
  title: "Gallery photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Caption / description",
      description:
        "One sentence describing the photo. Shows when hovering the photo, and helps screen readers.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ratio",
      title: "Shape",
      description: "How the photo is cropped in the gallery grid.",
      type: "string",
      options: {
        list: [
          { title: "Tall (portrait)", value: "tall" },
          { title: "Square", value: "square" },
          { title: "Wide (landscape)", value: "wide" },
        ],
        layout: "radio",
      },
      initialValue: "tall",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Position",
      description: "Lower numbers appear first in the gallery.",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Gallery order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "alt", media: "image", subtitle: "ratio" },
  },
});
