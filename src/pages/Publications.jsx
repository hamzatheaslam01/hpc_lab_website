import { useEffect, useState } from "react";
import SiteNav from "../components/ui/hero/Site-Nav";
import Footer from "../components/ui/footer";
import ScrollReveal from "../components/ui/ScrollReveal";
import { supabase } from "../lib/supabase";

const categories = [
  {
    key: "journal",
    title: "ISI-Indexed Journal Articles",
    description:
      "Peer-reviewed journal articles published in internationally recognized scientific and engineering venues.",
  },
  {
    key: "book",
    title: "Books & Book Chapters",
    description:
      "Books and contributed chapters covering computational methods, intelligent systems, and related research.",
  },
  {
    key: "conference",
    title: "International Conference Papers",
    description:
      "Research presented at international conferences across computing, robotics, artificial intelligence, and engineering.",
  },
];

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });

  async function fetchPublications() {
    const { data, error } = await supabase
      .from("publications")
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .eq("published", true)
      .order("year", { ascending: false })
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to load publications:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setPublications(data || []);
    setLoading(false);
  }

  fetchPublications();
}, []);

  if (loading) {
    return (
      <>
        <SiteNav />

        <main className="section-atmosphere flex min-h-screen items-center justify-center text-white">
          <p className="label-mono text-white/40">
            Loading research...
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SiteNav />

        <main className="section-atmosphere flex min-h-screen items-center justify-center px-6 text-white">
          <div className="border border-red-500/20 bg-red-500/[0.04] px-8 py-6">
            <p className="label-mono text-red-400">
              Failed to load research
            </p>

            <p className="mt-3 text-sm text-white/50">
              {error}
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <SiteNav />

      <main className="section-atmosphere min-h-screen text-white">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="section-glow border-b border-white/[0.06]">
          <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 md:px-12">

            <ScrollReveal>
              <div>

                <h1
                  className="
                    text-6xl
                    font-bold
                    tracking-[-0.04em]
                    text-white
                    md:text-7xl
                  "
                >
                  Research & Publications
                </h1>

                <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/50">
                  Research outputs published by the High Performance
                  Computing Lab across internationally recognized journals,
                  books, conferences, and scientific venues.
                </p>

              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* =====================================================
            PUBLICATIONS
        ===================================================== */}

        <section className="section-glow">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12">

            <div className="space-y-28">

              {categories.map((category) => {

                /*
                 * Match the Supabase category name to the
                 * category used by this page.
                 *
                 * We support both:
                 *
                 *   journal
                 *   ISI-Indexed Journal Articles
                 *
                 * so the frontend doesn't depend on a
                 * specific internal category ID.
                 */

                const categoryNames = {
                  journal: "ISI-Indexed Journal Articles",
                  book: "Books & Book Chapters",
                  conference: "International Conference Papers",
                };

                const categoryPublications = publications.filter(
                  (paper) =>
                    paper.categories?.name ===
                    categoryNames[category.key]
                );

                return (
                  <section key={category.key}>

                    {/* Category heading */}

                    <ScrollReveal>
                      <div className="mb-12">

                        <div className="mb-5 h-px w-16 bg-accent" />

                        <h2
                          className="
                            text-4xl
                            font-bold
                            tracking-[-0.03em]
                            text-white
                            md:text-5xl
                          "
                        >
                          {category.title}
                        </h2>

                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/40">
                          {category.description}
                        </p>

                        <p className="mt-5 label-mono text-white/25">
                          {categoryPublications.length}{" "}
                          {categoryPublications.length === 1
                            ? "publication"
                            : "publications"}
                        </p>

                      </div>
                    </ScrollReveal>

                    {/* Publication list */}

                    {categoryPublications.length === 0 ? (
                      <div className="border border-white/[0.06] bg-[#080808] px-7 py-8">
                        <p className="text-sm text-white/30">
                          No publications in this category yet.
                        </p>
                      </div>
                    ) : (
                      <div className="grid gap-3">

                        {categoryPublications.map((paper, index) => (

                          <ScrollReveal
                            key={paper.id}
                            delay={Math.min(index * 40, 240)}
                            y={25}
                          >

                            <article
                              className="
                                group
                                relative
                                overflow-hidden
                                border
                                border-white/[0.07]
                                bg-[#080808]
                                px-7
                                py-7
                                transition-all
                                duration-700
                                ease-[cubic-bezier(.2,.7,.2,1)]
                                hover:-translate-y-1
                                hover:border-white/[0.12]
                                hover:bg-[#0b0b0b]
                                md:px-9
                                md:py-8
                              "
                            >

                              {/* Blue atmospheric glow */}

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  -right-28
                                  -top-28
                                  h-60
                                  w-60
                                  rounded-full
                                  bg-blue-500/0
                                  blur-[100px]
                                  transition-all
                                  duration-700
                                  ease-out
                                  group-hover:bg-blue-500/[0.06]
                                "
                              />

                              {/* Yellow atmospheric glow */}

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  -bottom-28
                                  -left-20
                                  h-52
                                  w-52
                                  rounded-full
                                  bg-accent/0
                                  blur-[90px]
                                  transition-all
                                  duration-700
                                  ease-out
                                  group-hover:bg-accent/[0.04]
                                "
                              />

                              {/* Top gradient border */}

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  left-0
                                  top-0
                                  z-20
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

                              {/* Left gradient border */}

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  left-0
                                  top-0
                                  z-20
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

                              {/* Bottom gradient border */}

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  bottom-0
                                  right-0
                                  z-20
                                  h-px
                                  w-0
                                  bg-gradient-to-l
                                  from-accent
                                  via-blue-400
                                  to-transparent
                                  transition-all
                                  duration-700
                                  ease-[cubic-bezier(.2,.7,.2,1)]
                                  group-hover:w-full
                                "
                              />

                              {/* Right gradient border */}

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  bottom-0
                                  right-0
                                  z-20
                                  h-0
                                  w-px
                                  bg-gradient-to-t
                                  from-accent
                                  via-blue-400
                                  to-transparent
                                  transition-all
                                  duration-700
                                  ease-[cubic-bezier(.2,.7,.2,1)]
                                  group-hover:h-full
                                "
                              />

                              {/* Content */}

                              <div className="relative z-10">

                                {/* Number + year */}

                                <div className="mb-4 flex items-center gap-4">

                                  <span
                                    className="
                                      label-mono
                                      text-accent/60
                                      transition-colors
                                      duration-500
                                      group-hover:text-accent
                                    "
                                  >
                                    [
                                    {String(index + 1).padStart(2, "0")}
                                    ]
                                  </span>

                                  {paper.year && (
                                    <>
                                      <span className="h-px w-5 bg-white/10" />

                                      <span className="label-mono text-white/25">
                                        {paper.year}
                                      </span>
                                    </>
                                  )}

                                </div>

                                {/* Title */}

                                <h3
                                  className="
                                    max-w-5xl
                                    text-xl
                                    font-semibold
                                    leading-relaxed
                                    tracking-[-0.015em]
                                    text-white
                                    transition-all
                                    duration-500
                                    ease-[cubic-bezier(.2,.7,.2,1)]
                                    group-hover:translate-x-1
                                    group-hover:text-accent
                                    md:text-2xl
                                  "
                                >
                                  {paper.title}
                                </h3>

                                {/* Authors */}

                                {paper.authors && (
                                  <p
                                    className="
                                      mt-3
                                      max-w-5xl
                                      text-sm
                                      leading-7
                                      text-white/40
                                      transition-colors
                                      duration-500
                                      group-hover:text-white/55
                                    "
                                  >
                                    {paper.authors}
                                  </p>
                                )}

                                {/* Venue */}

                                {paper.venue && (
                                  <p
                                    className="
                                      mt-2
                                      max-w-5xl
                                      text-sm
                                      italic
                                      leading-7
                                      text-white/25
                                      transition-colors
                                      duration-500
                                      group-hover:text-white/40
                                    "
                                  >
                                    {paper.venue}
                                  </p>
                                )}

                                {/* Link */}

                                {paper.link && (
                                  <div className="mt-5">

                                    <a
                                      href={paper.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="
                                        inline-flex
                                        border
                                        border-white/[0.10]
                                        bg-white/[0.02]
                                        px-4
                                        py-2
                                        text-xs
                                        font-medium
                                        tracking-wide
                                        text-white/45
                                        transition-all
                                        duration-500
                                        ease-[cubic-bezier(.2,.7,.2,1)]
                                        hover:border-accent/50
                                        hover:bg-accent/[0.06]
                                        hover:text-accent
                                      "
                                    >
                                      View Publication
                                    </a>

                                  </div>
                                )}

                              </div>

                            </article>

                          </ScrollReveal>

                        ))}

                      </div>
                    )}

                  </section>
                );
              })}

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}