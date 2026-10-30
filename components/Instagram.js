import Image from "next/image";
import Reveal from "./Reveal";

const SHOTS = [
  { img: "/images/image-g1/Woman_reading_book_in_bedroom_510c9af5.jpg", alt: "Reading in bed by warm lamplight" },
  { img: "/images/images-g2/Woman_reaching_toward_table_a40787ca.jpg", alt: "Reaching toward a glowing table lamp" },
  { img: "/images/images-g2/Lampshade_glowing_with_warm_light_2f47f104.jpg", alt: "Lampshade glowing with warm light" },
  { img: "/images/image-g1/Couple_relaxing_on_sofa_2870e94c.jpg", alt: "Couple relaxing on a sofa at dusk" },
  { img: "/images/images-g2/Man_reading_book_in_chair_16ebddd5.jpg", alt: "Man reading in a chair" },
  { img: "/images/image-g1/Man_writing_in_notebook_7ed64cec.jpg", alt: "Writing at a desk under soft light" },
];

export default function Instagram() {
  return (
    <Reveal as="section" className="insta">
      <div className="insta__intro">
        <h2 className="insta__title">Stay inspired</h2>
        <a href="#" className="insta__handle">@lumora.studio</a>
      </div>
      <div className="insta__row">
        {SHOTS.map((s) => (
          <a key={s.img} href="#" className="insta__item" aria-label={s.alt}>
            <Image src={s.img} alt={s.alt} fill sizes="(max-width:760px) 45vw, 15vw" />
          </a>
        ))}
      </div>
    </Reveal>
  );
}
