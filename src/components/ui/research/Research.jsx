import {
  Cpu,
  Network,
  Calculator,
  BrainCircuit,
  Bot,
} from "lucide-react";

import ScrollReveal from "../ScrollReveal";

export default function Research() {
  const researchAreas = [
    {
      title: "High Performance Computing",
      description:
        "Advanced computational infrastructure and techniques for solving large-scale scientific and engineering problems.",
      icon: Cpu,
    },
    {
      title: "Parallel Computing",
      description:
        "Parallel algorithms and distributed architectures designed to accelerate complex computational workloads.",
      icon: Network,
    },
    {
      title: "Scientific Computing",
      description:
        "Computational methods, simulation, and numerical techniques supporting research across engineering and science.",
      icon: Calculator,
    },
    {
      title: "Artificial Intelligence",
      description:
        "Machine learning and intelligent systems for extracting insights, automating processes, and solving complex problems.",
      icon: BrainCircuit,
    },
    {
      title: "Robotics & Telemedicine",
      description:
        "Intelligent robotic systems and computational technologies enabling advanced healthcare and remote applications.",
      icon: Bot,
    },
    {
      title: "Software Defined Networking",
      description:
        "Programmable and intelligent network architectures for scalable, efficient, and adaptable computing environments.",
      icon: Network,
    },
  ];

  return (
    <section>
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
            HEADING
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
              Research Areas
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
              Our work spans high-performance computing,
              intelligent systems, scientific computing,
              and emerging computational technologies
              that enable cutting-edge research across
              multiple engineering domains.
            </p>

          </div>
        </ScrollReveal>


        {/* =================================================
            RESEARCH GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
          "
        >

          {researchAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <ScrollReveal
                key={area.title}
                delay={index * 80}
                y={35}
              >

                <div
                  className="
                    group
                    relative
                    min-h-[300px]
                    overflow-hidden
                    border
                    border-white/[0.07]
                    bg-[#080808]
                    p-6
                    transition-all
                    duration-500
                    ease-[cubic-bezier(.2,.7,.2,1)]
                    hover:-translate-y-1
                    hover:border-accent/30
                    hover:bg-[#0b0b0b]
                    sm:min-h-[290px]
                    sm:p-8
                    md:p-10
                  "
                >

                  {/* =================================================
                      BLUE GLOW
                  ================================================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-28
                      -top-28
                      h-56
                      w-56
                      rounded-full
                      bg-blue-500/0
                      blur-[100px]
                      transition-all
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
                      group-hover:bg-accent/[0.045]
                      sm:h-64
                      sm:w-64
                    "
                  />


                  {/* =================================================
                      TOP ACCENT
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
                      LEFT ACCENT
                  ================================================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-0
                      top-0
                      h-0
                      w-px
                      bg-accent
                      transition-all
                      duration-500
                      ease-out
                      group-hover:h-full
                    "
                  />


                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-full
                      flex-col
                    "
                  >

                    {/* Icon */}

                    <div
                      className="
                        mb-8
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        border
                        border-white/[0.08]
                        bg-white/[0.02]
                        text-white/40
                        transition-all
                        duration-500
                        ease-[cubic-bezier(.2,.7,.2,1)]
                        group-hover:border-accent/30
                        group-hover:bg-accent/[0.05]
                        group-hover:text-accent
                        sm:mb-10
                        sm:h-12
                        sm:w-12
                      "
                    >
                      <Icon
                        size={23}
                        strokeWidth={1.5}
                        className="
                          transition-transform
                          duration-500
                          ease-[cubic-bezier(.2,.7,.2,1)]
                          group-hover:scale-110
                        "
                      />
                    </div>


                    {/* Text */}

                    <div className="mt-auto">

                      <h3
                        className="
                          max-w-xl
                          text-2xl
                          font-semibold
                          tracking-[-0.025em]
                          text-white
                          transition-all
                          duration-500
                          ease-out
                          group-hover:translate-x-1
                          sm:text-3xl
                          md:text-4xl
                        "
                      >
                        {area.title}
                      </h3>

                      <p
                        className="
                          mt-4
                          max-w-xl
                          text-sm
                          leading-6
                          text-white/40
                          transition-all
                          duration-500
                          ease-out
                          group-hover:translate-x-1
                          group-hover:text-white/65
                          sm:mt-5
                          sm:text-base
                          sm:leading-7
                        "
                      >
                        {area.description}
                      </p>

                    </div>

                  </div>

                </div>

              </ScrollReveal>
            );
          })}

        </div>

      </div>
    </section>
  );
}