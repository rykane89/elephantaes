import { Intro } from "@/components/site/intro";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Collab } from "@/components/site/collab";
import { Signatures } from "@/components/site/signatures";
import { Tiramisu } from "@/components/site/tiramisu";
import { Marquee } from "@/components/site/marquee";
import { Gallery } from "@/components/site/gallery";
import { Story } from "@/components/site/story";
import { Journal } from "@/components/site/journal";
import { Inquiry } from "@/components/site/inquiry";
import { Footer } from "@/components/site/footer";
import { getCollab, getGalleryPhotos, getTiramisuMenu } from "@/lib/cms";

export default async function Home() {
  // Fetched from Sanity at build time; falls back to lib/content.ts
  // when the CMS isn't configured or unreachable.
  const [collab, tiramisuMenu, galleryPhotos] = await Promise.all([
    getCollab(),
    getTiramisuMenu(),
    getGalleryPhotos(),
  ]);

  return (
    <>
      <Intro />
      <ScrollProgress />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Collab collab={collab} />
        <Signatures />
        <Tiramisu menu={tiramisuMenu} />
        <Marquee />
        <Gallery photos={galleryPhotos} />
        <Story />
        <Journal />
        <Inquiry />
      </main>
      <Footer />
    </>
  );
}
