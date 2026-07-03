import type { StructureResolver } from "sanity/structure";

// Sidebar layout for the studio. Collab banner is a singleton (one document,
// no create/delete), gallery and tiramisu are ordered lists.
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
      S.divider(),
      S.listItem()
        .title("Collab banner")
        .child(
          S.document()
            .schemaType("collabBanner")
            .documentId("collabBanner")
            .title("Collab banner")
        ),
    ]);
