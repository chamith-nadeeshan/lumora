import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Quotes from "@/components/Quotes";
import Signup from "@/components/Signup";
import CategoryShowcase from "@/components/CategoryShowcase";
import BannerCarousel from "@/components/BannerCarousel";
import HScrollGallery from "@/components/HScrollGallery";
import ProductGrid from "@/components/ProductGrid";
import StorySticky from "@/components/StorySticky";
import Instagram from "@/components/Instagram";
import Reveal from "@/components/Reveal";

const PRODUCT_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "table", label: "Table Lamps" },
  { key: "bedside", label: "Bedside" },
  { key: "desk", label: "Desk Lamps" },
  { key: "ambient", label: "Ambient" },
];

const PRODUCT_LIST = [
  { id: 1, default: "/images/products/1/default.jpg", hover: "/images/products/1/hover.jpg", name: "The Aurelle", collection: "DOME COLLECTION", brand: "LUMORA STUDIO®", price: "$240", category: "table", isNew: true },
  { id: 2, default: "/images/products/2/default.jpg", hover: "/images/products/2/hover.jpg", name: "The Soléa", collection: "LINEN COLLECTION", brand: "LUMORA STUDIO®", price: "$285", category: "bedside" },
  { id: 3, default: "/images/products/3/default.jpg", hover: "/images/products/3/hover.jpg", name: "The Mira", collection: "OPAL COLLECTION", brand: "LUMORA STUDIO®", price: "$320", category: "ambient", isNew: true },
  { id: 4, default: "/images/products/4/default.jpg", hover: "/images/products/4/hover.jpg", name: "The Olin", collection: "WALNUT COLLECTION", brand: "LUMORA STUDIO®", price: "$265", category: "desk" },
  { id: 5, default: "/images/products/5/default.jpg", hover: "/images/products/5/hover.jpg", name: "The Vesper", collection: "CERAMIC COLLECTION", brand: "LUMORA STUDIO®", price: "$295", category: "table" },
  { id: 6, default: "/images/products/6/default.jpg", hover: "/images/products/6/hover.jpg", name: "The Lior", collection: "BRASS COLLECTION", brand: "LUMORA STUDIO®", price: "$310", category: "bedside", isNew: true },
];

const GALLERY_ITEMS = [
  { image: "/images/images-g2/Woman_reaching_toward_table_a40787ca.jpg", caption: "Inviting Warmth", ar: 1.3, h: "26rem" },
  { image: "/images/images-g2/Man_reading_book_in_chair_16ebddd5.jpg", caption: "Impeccably Crafted", ar: 0.72, h: "32rem" },
  { image: "/images/images-g2/Woman_reading_book_in_chair_a6326c4c.jpg", caption: "Made to Endure", ar: 1.05, h: "24rem" },
  { image: "/images/images-g2/Table_lamp_base_close-up_3db126b1.jpg", caption: "Considered Design", ar: 0.72, h: "31rem" },
  { image: "/images/images-g2/Lampshade_glowing_with_warm_light_2f47f104.jpg", caption: "Everyday Moments", ar: 1.25, h: "27rem" },
];

const GALLERY_HEADING =
  "A thoughtfully made range that balances warmth, considered design and enduring quality — created to invite pause and elevate everyday moments.";

const BANNER_SLIDES = [
  {
    image: "/images/Woman_reading_book_on_terrace.jpg",
    eyebrow: "Ambient Warmth",
    title: "Light for slower evenings",
    body: "Designed for the quiet hours. Softly glowing, considered in every detail, and crafted to last for years.",
    cta: { href: "#collection", label: "Explore table lamps" },
  },
  {
    image: "/images/Woman_sitting_on_daybed_fa0ed4af.jpg",
    eyebrow: "Bedside Ritual",
    title: "The last light you touch",
    body: "A gentle, dimmable glow for winding down — made to make every night feel calmer.",
    cta: { href: "#collection", label: "Shop bedside lamps" },
  },
];

const VALUES = [
  { icon: "◠", title: "Inviting pause", body: "Warm, dimmable light that turns any corner into a place to rest." },
  { icon: "✶", title: "Impeccably crafted", body: "Turned by hand in small batches, from materials chosen to age beautifully." },
  { icon: "◍", title: "Considered materials", body: "Solid timber, natural linen and mouth-blown glass — nothing superfluous." },
  { icon: "♺", title: "Made to endure", body: "Timeless forms, rewirable fittings and a five-year warranty on every lamp." },
];

export default function Home() {
  return (
    <>
      <Header />

      <main id="top">
        <Hero />

        {/* Intro */}
        <Reveal as="section" className="intro">
          <p className="eyebrow">Lumora</p>
          <h2 className="intro__title">Lighting designed for a softer way of living.</h2>
          <p className="intro__body">
            We believe in the power of pause — in rooms that invite you to slow down. Meticulously
            made, our table lamps bring considered, comforting light into the moments that matter most.
          </p>
        </Reveal>
 {/* Full-bleed looping banner */}
        <BannerCarousel slides={BANNER_SLIDES} interval={5500} />
  {/* Category showcase */}
        <CategoryShowcase />
        {/* Product grid — Live Slow */}
        <ProductGrid
          title="Live Slow."
          categories={PRODUCT_CATEGORIES}
          products={PRODUCT_LIST}
        />

        {/* Horizontal-scroll gallery */}
        <HScrollGallery heading={GALLERY_HEADING} items={GALLERY_ITEMS} />

       
        {/* Values */}
        <section className="values">
          {VALUES.map((v, i) => (
            <Reveal className="values__item" key={v.title} delay={i * 110}>
              <span className="values__icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </Reveal>
          ))}
        </section>

        {/* Sticky story scroll — nav + content + crossfade image */}
        <StorySticky />

      

        {/* Testimonials */}
        <Quotes />

        {/* Newsletter */}
        <Signup />
      </main>

      {/* Instagram strip */}
      <Instagram />

      {/* Footer */}
      <footer className="footer">
        <div className="footer__brand">
          <span className="brand brand--footer">LUMORA</span>
          <p>Table lamps for a softer way of living. Hand-finished to order.</p>
        </div>
        <div className="footer__col">
          <h4>Shop</h4>
          <a href="#">All lamps</a>
          <a href="#">The Aurelle</a>
          <a href="#">Gift cards</a>
        </div>
        <div className="footer__col">
          <h4>Learn more</h4>
          <a href="#">Our story</a>
          <a href="#">Craft &amp; materials</a>
          <a href="#">Journal</a>
        </div>
        <div className="footer__col">
          <h4>Support</h4>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer__bottom">
          <p>© 2026 Lumora. All rights reserved.</p>
          <p>Designed for moments of quiet warmth.</p>
        </div>
      </footer>
    </>
  );
}
