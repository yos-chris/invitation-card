"use client";

import { useState } from "react";
import { DICT, type Lang } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";
import { Lightbox, type GalleryImage } from "./Lightbox";
import { LotusMark, ClassicDivider, FloralSprig, FrameCorners } from "./Ornaments";

const gold = "#C8A45D";

/* Journey photo data — real uploaded photos with localized captions */
type JourneyPhoto = {
  src: string;
  alt: string;
  label: string;
  titleKey: "j1Title" | "j2Title" | "j3Title" | "j4Title" | "j5Title" | "j6Title" | "j7Title" | "j8Title" | "j9Title";
  subKey: "j1Sub" | "j2Sub" | "j3Sub" | "j4Sub" | "j5Sub" | "j6Sub" | "j7Sub" | "j8Sub" | "j9Sub";
  span: string; // desktop grid span classes
  delay: number;
};

const PHOTOS: JourneyPhoto[] = [
  {
    src: "/invitation/journey/office-grand-opening.jpg",
    alt: "Grand opening group photo at Bali Customer Relation Office",
    label: "Bali Customer Relation Office",
    titleKey: "j1Title",
    subKey: "j1Sub",
    span: "col-span-12 sm:col-span-5 row-span-3",
    delay: 0,
  },
  {
    src: "/invitation/journey/family-gathering.jpg",
    alt: "Family gathering group photo",
    label: "Family Gathering",
    titleKey: "j3Title",
    subKey: "j3Sub",
    span: "col-span-12 sm:col-span-7 row-span-2",
    delay: 80,
  },
  {
    src: "/invitation/journey/cancer-awareness-talk.jpeg",
    alt: "Cancer awareness seminar group moment",
    label: "Health Talk",
    titleKey: "j2Title",
    subKey: "j2Sub",
    span: "col-span-6 sm:col-span-4 row-span-2",
    delay: 160,
  },
  {
    src: "/invitation/journey/health-education.jpeg",
    alt: "Health education session with participants",
    label: "Health Talk",
    titleKey: "j4Title",
    subKey: "j4Sub",
    span: "col-span-6 sm:col-span-3 row-span-2",
    delay: 240,
  },
  {
    src: "/invitation/journey/patient-community-care.jpeg",
    alt: "Patient and community care moment",
    label: "Patient Support",
    titleKey: "j5Title",
    subKey: "j5Sub",
    span: "col-span-12 sm:col-span-5 row-span-2",
    delay: 120,
  },
  {
    src: "/invitation/journey/together-in-care.png",
    alt: "Together in care large group photo",
    label: "Togetherness",
    titleKey: "j7Title",
    subKey: "j7Sub",
    span: "col-span-12 sm:col-span-7 row-span-2",
    delay: 200,
  },
  {
    src: "/invitation/journey/early-cancer-awareness.jpg",
    alt: "Early cancer awareness seminar",
    label: "Community Care",
    titleKey: "j6Title",
    subKey: "j6Sub",
    span: "col-span-12 sm:col-span-5 row-span-2",
    delay: 160,
  },
  {
    src: "/invitation/journey/shared-warmth.jpeg",
    alt: "Shared warmth gathering at dining table",
    label: "Togetherness",
    titleKey: "j8Title",
    subKey: "j8Sub",
    span: "col-span-6 sm:col-span-4 row-span-2",
    delay: 200,
  },
  {
    src: "/invitation/journey/community-health-moment.jpeg",
    alt: "Community health education audience",
    label: "Community Care",
    titleKey: "j9Title",
    subKey: "j9Sub",
    span: "col-span-6 sm:col-span-3 row-span-2",
    delay: 280,
  },
];

/* Localized captions map (inline to keep component self-contained) */
const CAPTIONS: Record<Lang, Record<string, string>> = {
  en: {
    j1Title: "Grand Opening Bali Customer Relation Office",
    j1Sub: "The beginning of our journey in Bali.",
    j2Title: "Cancer Awareness & Hope Talk",
    j2Sub: "Sharing knowledge, care, and support with the community.",
    j3Title: "Family Gathering",
    j3Sub: "Togetherness, warmth, and appreciation.",
    j4Title: "Health Education Session",
    j4Sub: "Encouraging early awareness and modern treatment understanding.",
    j5Title: "Patient & Community Care",
    j5Sub: "Small moments of care that mean a lot.",
    j6Title: "Early Cancer Awareness",
    j6Sub: "Helping people recognize cancer earlier with better understanding.",
    j7Title: "Together in Care",
    j7Sub: "Walking together with patients, families, and community.",
    j8Title: "Shared Warmth",
    j8Sub: "Building connection through meaningful gatherings.",
    j9Title: "Community Health Moment",
    j9Sub: "One step closer to awareness, support, and hope.",
  },
  id: {
    j1Title: "Pembukaan Bali Customer Relation Office",
    j1Sub: "Awal perjalanan pelayanan kami di Bali.",
    j2Title: "Edukasi Kanker & Harapan",
    j2Sub: "Berbagi pengetahuan, kepedulian, dan dukungan bersama masyarakat.",
    j3Title: "Family Gathering",
    j3Sub: "Kebersamaan, kehangatan, dan apresiasi.",
    j4Title: "Sesi Edukasi Kesehatan",
    j4Sub: "Mendorong kesadaran sejak dini dan pemahaman tentang pengobatan modern.",
    j5Title: "Kepedulian untuk Pasien & Komunitas",
    j5Sub: "Momen sederhana yang membawa makna besar.",
    j6Title: "Kenali Kanker Lebih Awal",
    j6Sub: "Membantu masyarakat mengenali kanker lebih awal dengan pemahaman yang tepat.",
    j7Title: "Bersama dalam Kepedulian",
    j7Sub: "Melangkah bersama pasien, keluarga, dan komunitas.",
    j8Title: "Kehangatan Bersama",
    j8Sub: "Membangun hubungan melalui pertemuan yang bermakna.",
    j9Title: "Momen Edukasi Komunitas",
    j9Sub: "Satu langkah lebih dekat menuju kesadaran, dukungan, dan harapan.",
  },
  zh: {
    j1Title: "巴厘岛服务中心开幕",
    j1Sub: "我们在巴厘岛服务旅程的开始。",
    j2Title: "癌症知识与希望分享会",
    j2Sub: "与社区分享知识、关怀与支持。",
    j3Title: "家庭聚会",
    j3Sub: "共同分享温暖、陪伴与感谢。",
    j4Title: "健康教育讲座",
    j4Sub: "提升早期意识与现代治疗认知。",
    j5Title: "患者与社区关怀",
    j5Sub: "每一个关怀的瞬间都意义深远。",
    j6Title: "早期癌症认知",
    j6Sub: "帮助大家更早认识癌症并理解治疗选择。",
    j7Title: "携手关怀同行",
    j7Sub: "与患者、家属和社区一同前行。",
    j8Title: "温暖相聚",
    j8Sub: "在有意义的相聚中建立连接。",
    j9Title: "社区健康时刻",
    j9Sub: "向认知、支持与希望更进一步。",
  },
};

function JourneyCard({
  photo,
  lang,
  index,
  onClick,
}: {
  photo: JourneyPhoto;
  lang: Lang;
  index: number;
  onClick: () => void;
}) {
  const captions = CAPTIONS[lang];
  const title = captions[photo.titleKey];
  const sub = captions[photo.subKey];
  const [imgError, setImgError] = useState(false);

  return (
    <Reveal
      delay={photo.delay}
      className={`photo-frame group relative cursor-pointer overflow-hidden ${photo.span}`}
    >
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-0 z-[1] h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        aria-label={title}
        tabIndex={-1}
      />
      {imgError ? (
        /* Fallback card if image fails to load */
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(155deg, #0a2c5e 0%, #031f44 60%, #02152f 100%)",
          }}
        >
          <div className="text-center">
            <LotusMark width={48} color="#C8A45D" className="mx-auto mb-2 opacity-40" />
            <span className="font-cormorant text-xs uppercase tracking-[0.3em] text-ivory/50">
              Journey Photo
            </span>
          </div>
        </div>
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          style={{ objectPosition: "center center" }}
          draggable={false}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}

      {/* brand-cohesion tint (very subtle, doesn't ruin photo colors) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,31,68,0.05) 0%, transparent 30%, transparent 50%, rgba(3,31,68,0.82) 100%)",
        }}
      />

      {/* thin gold inner frame */}
      <div
        className="pointer-events-none absolute inset-0 border transition-all duration-350 group-hover:border-gold/70"
        style={{ borderColor: `${gold}44` }}
      />
      {/* corner ornaments */}
      <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t transition-all duration-300" style={{ borderColor: `${gold}88` }} />
      <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t transition-all duration-300" style={{ borderColor: `${gold}88` }} />
      <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l transition-all duration-300" style={{ borderColor: `${gold}88` }} />
      <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r transition-all duration-300" style={{ borderColor: `${gold}88` }} />

      {/* category label pill — top-left, doesn't cover faces */}
      <div className="pointer-events-none absolute left-3 top-3 z-[2]">
        <span
          className="inline-block rounded-full border border-gold/50 px-2.5 py-0.5 font-cormorant text-[9px] uppercase tracking-[0.2em] text-ivory backdrop-blur-sm"
          style={{ background: "rgba(3,31,68,0.6)" }}
        >
          {photo.label}
        </span>
      </div>

      {/* caption overlay — bottom of photo */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-4">
        {/* small gold line above title */}
        <span className="mb-1.5 block h-px w-8 bg-gold/70" />
        <h3 className="font-serif-inv text-lg font-semibold leading-tight text-ivory sm:text-xl">
          {title}
        </h3>
        <p className="mt-1 font-body-inv text-xs leading-relaxed text-ivory/85 sm:text-sm">
          {sub}
        </p>
      </div>
    </Reveal>
  );
}

export function OurJourney({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const lightboxImages: GalleryImage[] = PHOTOS.map((p) => ({
    src: p.src,
    alt: p.alt,
    caption: CAPTIONS[lang][p.titleKey],
  }));

  return (
    <section className="relative px-4 py-12">
      {/* subtle floral background accent */}
      <FloralSprig
        className="pointer-events-none absolute -left-4 top-1/4 hidden -rotate-12 lg:block"
        width={120}
        opacity={0.08}
      />
      <FloralSprig
        className="pointer-events-none absolute -right-4 bottom-1/4 hidden rotate-12 lg:block"
        width={120}
        opacity={0.08}
      />

      <div className="mx-auto max-w-6xl">
        {/* Title + subline + intro */}
        <SectionTitle title={t.journeyTitle} intro={t.journeySubline} lang={lang} />

        {/* Intro paragraph */}
        <Reveal delay={100}>
          <p className="mx-auto mt-4 max-w-2xl text-center font-body-inv text-sm leading-relaxed text-navy/78">
            {t.journeyIntro}
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-4 flex justify-center">
            <FloralSprig width={80} opacity={0.3} />
          </div>
        </Reveal>

        {/* Desktop: editorial collage grid (12-col, dense) */}
        <div
          className="mt-8 hidden grid-cols-12 gap-5 sm:grid"
          style={{ gridAutoRows: "180px", gridAutoFlow: "dense" }}
        >
          {PHOTOS.map((photo, i) => (
            <JourneyCard
              key={photo.src}
              photo={photo}
              lang={lang}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>

        {/* Mobile: single-column stacked gallery */}
        <div className="mt-6 flex flex-col gap-5 sm:hidden">
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.src} delay={Math.min(i * 80, 400)}>
              <div className="photo-frame group relative cursor-pointer overflow-hidden">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="absolute inset-0 z-[1] h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  aria-label={CAPTIONS[lang][photo.titleKey]}
                  tabIndex={-1}
                />
                <div className="relative" style={{ aspectRatio: "4 / 3" }}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: "center center" }}
                    draggable={false}
                    loading="lazy"
                  />
                  {/* gradient overlay */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(3,31,68,0.05) 0%, transparent 30%, transparent 50%, rgba(3,31,68,0.85) 100%)",
                    }}
                  />
                  {/* gold frame */}
                  <div
                    className="pointer-events-none absolute inset-0 border"
                    style={{ borderColor: `${gold}44` }}
                  />
                  {/* corner ornaments */}
                  <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t" style={{ borderColor: `${gold}88` }} />
                  <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t" style={{ borderColor: `${gold}88` }} />
                  <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l" style={{ borderColor: `${gold}88` }} />
                  <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r" style={{ borderColor: `${gold}88` }} />
                  {/* label */}
                  <div className="pointer-events-none absolute left-3 top-3 z-[2]">
                    <span
                      className="inline-block rounded-full border border-gold/50 px-2.5 py-0.5 font-cormorant text-[9px] uppercase tracking-[0.2em] text-ivory backdrop-blur-sm"
                      style={{ background: "rgba(3,31,68,0.6)" }}
                    >
                      {photo.label}
                    </span>
                  </div>
                  {/* caption */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-4">
                    <span className="mb-1.5 block h-px w-8 bg-gold/70" />
                    <h3 className="font-serif-inv text-lg font-semibold leading-tight text-ivory">
                      {CAPTIONS[lang][photo.titleKey]}
                    </h3>
                    <p className="mt-1 font-body-inv text-xs leading-relaxed text-ivory/85">
                      {CAPTIONS[lang][photo.subKey]}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Closing floral divider */}
        <Reveal className="text-center">
          <div className="mt-8 flex justify-center">
            <ClassicDivider className="max-w-[200px]" color="#031F44" />
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {lightboxIndex >= 0 ? (
        <Lightbox
          lang={lang}
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onIndex={setLightboxIndex}
        />
      ) : null}
    </section>
  );
}
