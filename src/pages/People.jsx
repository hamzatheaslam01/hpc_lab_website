import { useEffect, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import SiteNav from "../components/ui/hero/Site-Nav";
import Footer from "../components/ui/footer";
import ScrollReveal from "../components/ui/ScrollReveal";
import { supabase } from "../lib/supabase";

// Keep Dr. Sohail's main profile exactly as it currently is.
import siqbal from "../components/ui/people/../../../assets/siqbal.png";

const director = {
  category: "Lab Director",
  name: "Dr. Sohail Iqbal",
  picture: siqbal,
  role: "Associate Professor",
  description:
    "Leading research in High Performance Computing, Artificial Intelligence, Robotics, and Computational Engineering.",
  profile_url: "https://siqbal.vercel.app/",
};

export default function People() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    async function loadPeople() {
      const { data, error } = await supabase
        .from("people")
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .eq("published", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Failed to load people:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      /*
       * Dr. Sohail is handled separately above.
       *
       * We therefore don't show anyone assigned to
       * "Lab Director" in the database below.
       */
      const otherPeople = (data || []).filter(
        (person) => person.categories?.name !== "Lab Director"
      );

      setPeople(otherPeople);
      setLoading(false);
    }

    loadPeople();
  }, []);

  /*
   * Group database people by category.
   */
  const groupedPeople = people.reduce((groups, person) => {
    const category = person.categories?.name || "Other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(person);

    return groups;
  }, {});

  const categories = Object.keys(groupedPeople);

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {
    return (
      <>
        <SiteNav />

        <main className="section-atmosphere flex min-h-screen items-center justify-center text-white">
          <p className="label-mono text-white/40">
            Loading people...
          </p>
        </main>

        <Footer />
      </>
    );
  }

  /*
   * =========================================================
   * ERROR
   * =========================================================
   */

  if (error) {
    return (
      <>
        <SiteNav />

        <main className="section-atmosphere flex min-h-screen items-center justify-center px-6 text-white">
          <div className="border border-red-500/20 bg-red-500/[0.04] px-8 py-6">
            <p className="label-mono text-red-400">
              Failed to load people
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
                  The People
                </h1>

                <p
                  className="
                    mt-8
                    max-w-3xl
                    text-xl
                    leading-relaxed
                    text-white/50
                  "
                >
                  Researchers, faculty, and students working
                  together across high-performance computing,
                  artificial intelligence, robotics, networking,
                  and scientific computing.
                </p>

              </div>
            </ScrollReveal>

          </div>
        </section>


        {/* =====================================================
            DR. SOHAIL IQBAL — FEATURED DIRECTOR
        ===================================================== */}

        <section className="section-glow">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12">

            <ScrollReveal y={40}>

              <div
                className="
                  group
                  relative
                  overflow-hidden
                  border
                  border-white/[0.07]
                  bg-[#080808]
                  transition-all
                  duration-700
                  ease-[cubic-bezier(.2,.7,.2,1)]
                  hover:-translate-y-1
                  hover:border-white/[0.12]
                  hover:bg-[#0a0a0a]
                "
              >

                {/* Blue glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-40
                    -top-40
                    h-96
                    w-96
                    rounded-full
                    bg-blue-500/0
                    blur-[130px]
                    transition-all
                    duration-1000
                    ease-out
                    group-hover:bg-blue-500/[0.07]
                  "
                />

                {/* Yellow glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-40
                    -left-40
                    h-96
                    w-96
                    rounded-full
                    bg-accent/0
                    blur-[130px]
                    transition-all
                    duration-1000
                    ease-out
                    group-hover:bg-accent/[0.045]
                  "
                />

                {/* Top border */}

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
                    group-hover:w-full
                  "
                />

                {/* Left border */}

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
                    group-hover:h-full
                  "
                />

                {/* Bottom border */}

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
                    group-hover:w-full
                  "
                />

                {/* Right border */}

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
                    group-hover:h-full
                  "
                />

                {/* Main content */}

                <div
                  className="
                    relative
                    z-10
                    grid
                    lg:grid-cols-[360px_1fr]
                  "
                >

                  {/* Portrait */}

                  <div
                    className="
                      relative
                      aspect-[4/5]
                      overflow-hidden
                      lg:aspect-auto
                    "
                  >

                    <img
                      src={director.picture}
                      alt={director.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-1000
                        ease-[cubic-bezier(.2,.7,.2,1)]
                        group-hover:scale-[1.025]
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/40
                        via-transparent
                        to-transparent
                        opacity-60
                        transition-opacity
                        duration-700
                        group-hover:opacity-30
                      "
                    />

                  </div>

                  {/* Content */}

                  <div
                    className="
                      flex
                      flex-col
                      justify-center
                      p-8
                      md:p-12
                      lg:p-16
                    "
                  >

                    <div className="label-mono mb-6 text-accent">
                      {director.category}
                    </div>

                    <h2
                      className="
                        text-4xl
                        font-bold
                        tracking-[-0.03em]
                        text-white
                        transition-transform
                        duration-500
                        group-hover:translate-x-1
                        md:text-5xl
                      "
                    >
                      {director.name}
                    </h2>

                    <p className="mt-4 text-lg text-primary">
                      {director.role}
                    </p>

                    <p
                      className="
                        mt-8
                        max-w-2xl
                        text-lg
                        leading-relaxed
                        text-white/50
                        transition-colors
                        duration-500
                        group-hover:text-white/65
                      "
                    >
                      {director.description}
                    </p>

                    <div className="mt-10">

                      <a
                        href={director.profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          border
                          border-white/[0.12]
                          bg-white/[0.02]
                          px-7
                          py-3
                          text-sm
                          font-medium
                          tracking-wide
                          text-white/60
                          transition-all
                          duration-500
                          hover:border-accent/50
                          hover:bg-accent/[0.06]
                          hover:text-accent
                        "
                      >
                        Personal Website
                      </a>

                    </div>

                  </div>

                </div>

              </div>

            </ScrollReveal>

          </div>
        </section>


        {/* =====================================================
            DATABASE PEOPLE
        ===================================================== */}

        {categories.map((category) => {

          const categoryPeople = groupedPeople[category];

          if (!categoryPeople?.length) {
            return null;
          }

          return (
            <section
              key={category}
              className="
                section-glow
                border-t
                border-white/[0.06]
              "
            >

              <div
                className="
                  mx-auto
                  max-w-[1400px]
                  px-6
                  py-24
                  md:px-12
                "
              >

                {/* Category heading */}

                <ScrollReveal>

                  <div className="mb-12">

                    <h2
                      className="
                        text-4xl
                        font-bold
                        tracking-[-0.03em]
                        text-white
                        md:text-5xl
                      "
                    >
                      {category === "UG Intern"
                        ? "UG Interns"
                        : category}
                    </h2>

                  </div>

                </ScrollReveal>


                {/* People */}

                <div
                  className="
                    grid
                    items-stretch
                    gap-3
                    md:grid-cols-2
                    lg:grid-cols-3
                  "
                >

                  {categoryPeople.map((person, index) => (

                    <ScrollReveal
                      key={person.id}
                      delay={index * 100}
                      y={30}
                      className="h-full"
                    >

                      <div
                        className="
                          group
                          relative
                          flex
                          h-[430px]
                          w-full
                          flex-col
                          overflow-hidden
                          border
                          border-white/[0.07]
                          bg-[#080808]
                          transition-all
                          duration-700
                          ease-[cubic-bezier(.2,.7,.2,1)]
                          hover:-translate-y-1
                          hover:border-white/[0.12]
                          hover:bg-[#0a0a0a]
                        "
                      >

                        {/* =================================================
                            TOP GRADIENT BORDER
                        ================================================= */}

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
                            group-hover:w-full
                          "
                        />

                        {/* =================================================
                            LEFT GRADIENT BORDER
                        ================================================= */}

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
                            group-hover:h-full
                          "
                        />

                        {/* =================================================
                            BOTTOM GRADIENT BORDER
                        ================================================= */}

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
                            group-hover:w-full
                          "
                        />

                        {/* =================================================
                            RIGHT GRADIENT BORDER
                        ================================================= */}

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
                            group-hover:h-full
                          "
                        />


                        {/* =================================================
                            IMAGE
                        ================================================= */}

                        <div
                          className="
                            relative
                            h-[240px]
                            shrink-0
                            overflow-hidden
                            border-b
                            border-white/[0.06]
                            bg-[#050505]
                          "
                        >

                          {person.image_url ? (

                            <img
                              src={person.image_url}
                              alt={person.name}
                              className="
                                h-full
                                w-full
                                object-cover
                                transition-transform
                                duration-700
                                ease-[cubic-bezier(.2,.7,.2,1)]
                                group-hover:scale-[1.025]
                              "
                            />

                          ) : (

                            <div
                              className="
                                relative
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center
                                overflow-hidden
                                bg-[#050505]
                              "
                            >

                              {/* Placeholder ambient glow */}

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  -right-16
                                  -top-16
                                  h-40
                                  w-40
                                  rounded-full
                                  bg-blue-500/[0.025]
                                  blur-[70px]
                                  transition-all
                                  duration-700
                                  group-hover:bg-blue-500/[0.06]
                                "
                              />

                              <div
                                className="
                                  pointer-events-none
                                  absolute
                                  -bottom-16
                                  -left-16
                                  h-40
                                  w-40
                                  rounded-full
                                  bg-accent/[0.02]
                                  blur-[70px]
                                  transition-all
                                  duration-700
                                  group-hover:bg-accent/[0.045]
                                "
                              />

                              {/* Icon frame */}

                              <div
                                className="
                                  relative
                                  flex
                                  h-20
                                  w-20
                                  items-center
                                  justify-center
                                  border
                                  border-white/[0.08]
                                  bg-[#080808]
                                  text-white/20
                                  transition-all
                                  duration-500
                                  group-hover:border-accent/30
                                  group-hover:bg-[#0a0a0a]
                                  group-hover:text-accent/60
                                "
                              >

                                {/* Icon top gradient */}

                                <div
                                  className="
                                    pointer-events-none
                                    absolute
                                    left-0
                                    top-0
                                    h-px
                                    w-full
                                    bg-gradient-to-r
                                    from-accent
                                    via-blue-400
                                    to-transparent
                                    opacity-60
                                  "
                                />

                                {/* Icon left gradient */}

                                <div
                                  className="
                                    pointer-events-none
                                    absolute
                                    left-0
                                    top-0
                                    h-full
                                    w-px
                                    bg-gradient-to-b
                                    from-accent
                                    via-blue-400
                                    to-transparent
                                    opacity-60
                                  "
                                />

                                <ImageIcon
                                  size={32}
                                  strokeWidth={1.25}
                                  className="
                                    transition-transform
                                    duration-500
                                    group-hover:scale-105
                                  "
                                />

                              </div>

                            </div>

                          )}

                          {/* Image bottom gradient */}

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-x-0
                              bottom-0
                              h-24
                              bg-gradient-to-t
                              from-black/40
                              to-transparent
                            "
                          />

                        </div>


                        {/* =================================================
                            CONTENT
                        ================================================= */}

                        <div
                          className="
                            flex
                            min-h-0
                            flex-1
                            flex-col
                            p-7
                          "
                        >

                          <h3
                            className="
                              text-2xl
                              font-semibold
                              tracking-[-0.02em]
                              text-white
                              transition-all
                              duration-500
                              group-hover:translate-x-1
                              group-hover:text-accent
                            "
                          >
                            {person.name}
                          </h3>


                          {/* =================================================
                              LINKS
                              Fixed height so every card stays identical.
                          ================================================= */}

                          <div className="mt-auto flex h-[52px] items-end gap-3">

                            {person.profile_url ? (

                              <a
                                href={person.profile_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                  border
                                  border-white/[0.10]
                                  px-3
                                  py-2
                                  text-xs
                                  uppercase
                                  tracking-[0.10em]
                                  text-white/40
                                  transition-all
                                  duration-300
                                  hover:border-accent/40
                                  hover:text-accent
                                "
                              >
                                Profile
                              </a>

                            ) : null}


                            {person.email ? (

                              <a
                                href={`mailto:${person.email}`}
                                className="
                                  border
                                  border-white/[0.10]
                                  px-3
                                  py-2
                                  text-xs
                                  uppercase
                                  tracking-[0.10em]
                                  text-white/40
                                  transition-all
                                  duration-300
                                  hover:border-accent/40
                                  hover:text-accent
                                "
                              >
                                Email
                              </a>

                            ) : null}

                          </div>

                        </div>

                      </div>

                    </ScrollReveal>

                  ))}

                </div>

              </div>

            </section>
          );
        })}


        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {categories.length === 0 && (
          <section className="section-glow border-t border-white/[0.06]">

            <div
              className="
                mx-auto
                max-w-[1400px]
                px-6
                py-24
                text-center
                md:px-12
              "
            >
              <p className="label-mono text-white/20">
                More members coming soon.
              </p>
            </div>

          </section>
        )}

      </main>

      <Footer />
    </>
  );
}