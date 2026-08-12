import { useEffect, useState } from "react";
import ScrollReveal from "../ScrollReveal";
import { supabase } from "../../../lib/supabase";

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPublications() {
      const { data, error } = await supabase
        .from("publications")
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .eq("published", true);

      if (error) {
        console.error("Failed to load publications:", error);
        setLoading(false);
        return;
      }

      const shuffled = [...(data || [])].sort(
        () => Math.random() - 0.5
      );

      setPublications(shuffled.slice(0, 4));
      setLoading(false);
    }

    loadPublications();
  }, []);

  if (loading || publications.length === 0) {
    return null;
  }

  return (
    <section
      className="
        border-t
        border-white/[0.06]
        bg-[#050505]
      "
      id="publications"
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-5
          py-20
          sm:px-6
          sm:py-24
          md:px-10
          md:py-28
          lg:px-12
          lg:py-32
          xl:px-16
        "
      >

        {/* =====================================================
            HEADING
        ===================================================== */}

        <ScrollReveal>
          <div className="mb-10 sm:mb-12 md:mb-16">

            <h2
              className="
                text-4xl
                font-bold
                tracking-[-0.035em]
                text-white
                sm:text-5xl
                md:text-6xl
              "
            >
              Research & Publications
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-white/50
                sm:mt-6
                sm:text-lg
                sm:leading-relaxed
              "
            >
              Selected research published across international
              journals, conferences, and scientific venues in
              computing, artificial intelligence, robotics, and
              related fields.
            </p>

          </div>
        </ScrollReveal>


        {/* =====================================================
            PUBLICATIONS
        ===================================================== */}

        <div className="grid gap-3">

          {publications.map((paper, index) => (
            <ScrollReveal
              key={paper.id}
              delay={index * 100}
              y={30}
            >
              <a
                href={paper.link || "#"}
                target={paper.link ? "_blank" : undefined}
                rel={
                  paper.link
                    ? "noopener noreferrer"
                    : undefined
                }
                onClick={(event) => {
                  if (!paper.link) {
                    event.preventDefault();
                  }
                }}
                className="
                  group
                  relative
                  block
                  overflow-hidden
                  border
                  border-white/[0.07]
                  bg-[#080808]
                  px-5
                  py-6
                  transition-all
                  duration-700
                  ease-[cubic-bezier(.2,.7,.2,1)]
                  hover:-translate-y-1
                  hover:border-white/[0.12]
                  hover:bg-[#0b0b0b]
                  sm:px-7
                  sm:py-7
                  md:px-9
                  md:py-8
                "
              >

                {/* =================================================
                    BLUE GLOW
                ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-48
                    w-48
                    rounded-full
                    bg-blue-500/0
                    blur-[90px]
                    transition-all
                    duration-700
                    ease-out
                    group-hover:bg-blue-500/[0.07]
                    sm:h-60
                    sm:w-60
                  "
                />


                {/* =================================================
                    YELLOW GLOW
                ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -left-16
                    h-44
                    w-44
                    rounded-full
                    bg-accent/0
                    blur-[80px]
                    transition-all
                    duration-700
                    ease-out
                    group-hover:bg-accent/[0.04]
                    sm:h-52
                    sm:w-52
                  "
                />


                {/* =================================================
                    TOP GRADIENT
                ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    h-px
                    w-0
                    bg-gradient-to-r
                    from-accent
                    via-blue-400
                    to-transparent
                    transition-all
                    duration-700
                    ease-[cubic-bezier(.2,.7,.2,1)]
                    group-hover:w-full
                  "
                />


                {/* =================================================
                    LEFT GRADIENT
                ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    h-0
                    w-px
                    bg-gradient-to-b
                    from-accent
                    via-blue-400
                    to-transparent
                    transition-all
                    duration-700
                    ease-[cubic-bezier(.2,.7,.2,1)]
                    group-hover:h-full
                  "
                />


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="relative z-10">

                  {/* Meta */}

                  <div
                    className="
                      mb-3
                      flex
                      flex-wrap
                      items-center
                      gap-3
                      sm:mb-4
                      sm:gap-4
                    "
                  >
                    <span
                      className="
                        label-mono
                        text-[10px]
                        text-accent/70
                        sm:text-xs
                      "
                    >
                      {paper.categories?.name || "Publication"}
                    </span>

                    <span className="h-px w-4 bg-white/10 sm:w-6" />

                    <span
                      className="
                        label-mono
                        text-[10px]
                        text-white/30
                        sm:text-xs
                      "
                    >
                      {paper.year}
                    </span>
                  </div>


                  {/* Title */}

                  <h3
                    className="
                      max-w-4xl
                      text-xl
                      font-semibold
                      leading-tight
                      tracking-[-0.02em]
                      text-white
                      transition-all
                      duration-500
                      ease-[cubic-bezier(.2,.7,.2,1)]
                      group-hover:translate-x-1
                      group-hover:text-accent
                      sm:text-2xl
                      md:text-3xl
                    "
                  >
                    {paper.title}
                  </h3>


                  {/* Authors */}

                  <p
                    className="
                      mt-3
                      max-w-4xl
                      text-xs
                      leading-5
                      text-white/35
                      transition-colors
                      duration-500
                      group-hover:text-white/50
                      sm:text-sm
                      sm:leading-relaxed
                    "
                  >
                    {paper.authors}
                  </p>


                  {/* Venue */}

                  <p
                    className="
                      mt-2
                      text-xs
                      italic
                      leading-5
                      text-white/25
                      transition-colors
                      duration-500
                      group-hover:text-white/40
                      sm:text-sm
                    "
                  >
                    {paper.venue}
                  </p>

                </div>

              </a>
            </ScrollReveal>
          ))}

        </div>


        {/* =====================================================
            VIEW ALL
        ===================================================== */}

        <ScrollReveal delay={450} y={20}>
          <div
            className="
              mt-10
              flex
              justify-center
              sm:mt-12
              md:mt-14
            "
          >
            <a
              href="/publications"
              className="
                border
                border-white/[0.12]
                bg-white/[0.02]
                px-6
                py-3
                text-xs
                font-medium
                tracking-wide
                text-white/60
                transition-all
                duration-500
                ease-[cubic-bezier(.2,.7,.2,1)]
                hover:border-accent/50
                hover:bg-accent/[0.06]
                hover:text-accent
                sm:px-7
                sm:text-sm
              "
            >
              View All Publications
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}