import siqbal from "../../../assets/siqbal.png";
import ScrollReveal from "../ScrollReveal";

export default function People() {
  return (
    <section
      className="
        section-atmosphere
        section-glow
        border-t
        border-white/[0.06]
      "
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

        {/* =================================================
            SECTION HEADING
        ================================================= */}

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
              Director
            </h2>

          </div>
        </ScrollReveal>


        {/* =================================================
            DIRECTOR
        ================================================= */}

        <div
          className="
            grid
            items-center
            gap-10
            sm:gap-12
            md:gap-16
            lg:grid-cols-[280px_1fr]
            lg:gap-16
            xl:grid-cols-[340px_1fr]
            xl:gap-20
          "
        >

          {/* =================================================
              PORTRAIT
          ================================================= */}

          <ScrollReveal y={40}>
            <div className="group relative">

              <div
                className="
                  relative
                  aspect-[4/5]
                  w-full
                  max-w-[340px]
                  overflow-hidden
                  border
                  border-white/[0.07]
                  bg-[#080808]
                  transition-all
                  duration-500
                  ease-[cubic-bezier(.2,.7,.2,1)]
                  group-hover:border-white/[0.12]
                  sm:max-w-[320px]
                  lg:max-w-none
                "
              >

                {/* Blue atmospheric glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-56
                    w-56
                    rounded-full
                    bg-blue-500/0
                    blur-[90px]
                    transition-all
                    duration-700
                    ease-out
                    group-hover:bg-blue-500/[0.07]
                    sm:h-72
                    sm:w-72
                  "
                />


                {/* Yellow atmospheric glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-24
                    -left-20
                    h-52
                    w-52
                    rounded-full
                    bg-accent/0
                    blur-[90px]
                    transition-all
                    duration-700
                    ease-out
                    group-hover:bg-accent/[0.045]
                    sm:h-64
                    sm:w-64
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


                {/* Portrait */}

                <img
                  src={siqbal}
                  alt="Dr. Sohail Iqbal"
                  className="
                    relative
                    z-10
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-[cubic-bezier(.2,.7,.2,1)]
                    group-hover:scale-[1.025]
                  "
                />

              </div>

            </div>
          </ScrollReveal>


          {/* =================================================
              CONTENT
          ================================================= */}

          <ScrollReveal delay={120} y={30}>
            <div>

              {/* Name */}

              <h3
                className="
                  text-3xl
                  font-bold
                  tracking-[-0.03em]
                  text-white
                  sm:text-4xl
                  md:text-5xl
                "
              >
                Dr. Sohail Iqbal
              </h3>


              {/* Position */}

              <p
                className="
                  mt-3
                  max-w-3xl
                  text-base
                  leading-7
                  text-primary
                  sm:mt-4
                  sm:text-lg
                  sm:leading-relaxed
                "
              >
                Associate Professor, NUST School
                of Electrical Engineering and
                Computer Science
              </p>


              {/* Affiliation */}

              <div
                className="
                  mt-6
                  space-y-2
                  border-l
                  border-white/10
                  pl-4
                  text-sm
                  leading-6
                  text-white/45
                  sm:mt-8
                  sm:pl-5
                  sm:text-base
                  sm:leading-relaxed
                "
              >

                <p>
                  Department of Computing
                </p>

                <p>
                  School of Electrical Engineering
                  &amp; Computer Science (SEECS)
                </p>

                <p>
                  National University of Sciences
                  &amp; Technology (NUST)
                </p>

              </div>


              {/* Research Description */}

              <p
                className="
                  mt-8
                  max-w-2xl
                  text-base
                  leading-7
                  text-white/60
                  sm:mt-10
                  sm:text-lg
                  sm:leading-relaxed
                "
              >
                Leading research in high-performance
                computing, robotics, artificial
                intelligence, scientific computing,
                and advanced computational
                engineering.
              </p>


              {/* Website */}

              <div className="mt-8 sm:mt-12">

                <a
                  href="https://siqbal.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    border
                    border-white/[0.12]
                    bg-white/[0.02]
                    px-6
                    py-3
                    text-sm
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
                  "
                >
                  Personal Website
                </a>

              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}