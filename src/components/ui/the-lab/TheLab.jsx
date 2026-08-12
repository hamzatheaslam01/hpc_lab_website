import ScrollReveal from "../ScrollReveal";
import labImage from "../../../assets/the-lab.jpg";

export default function TheLab() {
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

        <div
          className="
            grid
            items-center
            gap-12
            sm:gap-16
            lg:grid-cols-2
            lg:gap-20
          "
        >

          {/* =================================================
              LEFT
          ================================================= */}

          <ScrollReveal y={35}>
            <div>

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
                Computing at
                <br />
                <span className="text-white/40">
                  the edge of possibility.
                </span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-xl
                  text-base
                  leading-7
                  text-white/55
                  sm:mt-8
                  sm:text-lg
                  sm:leading-relaxed
                "
              >
                The High Performance Computing Lab
                at SEECS, NUST provides an environment
                for computational research, scientific
                computing, artificial intelligence, and
                parallel processing. The lab supports
                students and researchers working on
                computationally intensive engineering
                problems through modern computing
                resources and interdisciplinary
                collaboration.
              </p>

            </div>
          </ScrollReveal>


          {/* =================================================
              RIGHT
          ================================================= */}

          <ScrollReveal
            delay={120}
            y={40}
          >
            <div
              className="
                group
                relative
                aspect-[4/3]
                w-full
              "
            >

              {/* =================================================
                  MAIN FRAME
              ================================================= */}

              <div
                className="
                  relative
                  h-full
                  w-full
                  overflow-hidden
                  border
                  border-white/[0.07]
                  bg-[#080808]
                  transition-[border-color,background-color]
                  duration-500
                  ease-[cubic-bezier(.2,.7,.2,1)]
                  group-hover:border-white/[0.12]
                  group-hover:bg-[#0a0a0a]
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
                    h-56
                    w-56
                    rounded-full
                    bg-blue-500/0
                    blur-[100px]
                    transition-[background-color]
                    duration-700
                    ease-out
                    group-hover:bg-blue-500/[0.07]
                    sm:h-72
                    sm:w-72
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
                    -left-24
                    h-52
                    w-52
                    rounded-full
                    bg-accent/0
                    blur-[90px]
                    transition-[background-color]
                    duration-700
                    ease-out
                    group-hover:bg-accent/[0.045]
                    sm:h-64
                    sm:w-64
                  "
                />


                {/* =================================================
                    GRID
                ================================================= */}

                <div
                  className="
                    absolute
                    inset-0
                    grid-field
                    opacity-30
                    transition-opacity
                    duration-700
                    group-hover:opacity-45
                  "
                />


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
                    ease-[cubic-bezier(.2,.7,.2,1)]
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
                    ease-[cubic-bezier(.2,.7,.2,1)]
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
                    ease-[cubic-bezier(.2,.7,.2,1)]
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
                    ease-[cubic-bezier(.2,.7,.2,1)]
                    group-hover:h-full
                  "
                />


                {/* =================================================
                    PLACEHOLDER
                ================================================= */}

                <div
                  className="
                    absolute
                    inset-0
                    overflow-hidden
                  "
                >
                  <img
                    src={labImage}
                    alt="High Performance Computing Lab"
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

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/35
                      via-transparent
                      to-transparent
                    "
                  />
</div>

              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}