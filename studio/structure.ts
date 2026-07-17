import type { StructureResolver } from "sanity/structure";

// Sidebar layout for the studio. Singletons (one document, no create/delete)
// are pinned; gallery, tiramisu, and cards are ordered lists.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Site content")
    .items([
      S.listItem()
        .title("Gallery photos")
        .child(
          S.documentTypeList("galleryPhoto")
            .title("Gallery photos")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.listItem()
        .title("Tiramisu menu")
        .child(
          S.documentTypeList("tiramisuFlavor")
            .title("Tiramisu flavours")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.listItem()
        .title("What we bake (cards)")
        .child(
          S.documentTypeList("signatureCard")
            .title("What we bake")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.divider(),
      S.listItem()
        .title("The baker (bio)")
        .child(
          S.document()
            .schemaType("storySection")
            .documentId("storySection")
            .title("The baker (bio)")
        ),
      S.listItem()
        .title("Journal / newsletter")
        .child(
          S.document()
            .schemaType("journalSection")
            .documentId("journalSection")
            .title("Journal / newsletter")
        ),
      S.listItem()
        .title("Collab banner")
        .child(
          S.document()
            .schemaType("collabBanner")
            .documentId("collabBanner")
            .title("Collab banner")
        ),
      S.listItem()
        .title("Site settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site settings")
        ),
    ]);
