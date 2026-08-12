import {
  Cpu,
  Layers3,
  Cloud,
  Settings2,
} from "lucide-react";
import ScrollReveal from "../ScrollReveal";

export default function Infrastructure() {
  const infrastructure = [
    {
      title: "High-Performance Computing Clusters",
      description:
        "State-of-the-art parallel computing systems for research in distributed computing, machine learning, and large-scale simulations.",
      icon: Cpu,
    },
    {
      title: "GPU Computing",
      description:
        "NVIDIA GPU clusters for deep learning, computer vision, and general-purpose GPU computing applications.",
      icon: Layers3,
    },
    {
      title: "Cloud Infrastructure",
      description:
        "Hybrid cloud setup for scalable research computing, supporting containerized applications and microservices architecture.",
      icon: Cloud,
    },
    {
      title: "Robotics Testbed",
      description:
        "Experimental platforms for robotic systems research including manipulation, navigation, and human-robot interaction.",
      icon: Settings2,
    },
  ];

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
            HEADING
        ================================================= */}

        <ScrollReveal>
          <div className="mb-10 sm:mb-12">

            <div
              className="
                label-mono
                mb-4
                text-accent
                sm:mb-5
              "
            >
              Infrastructure
            </div>

            <h2
              className="
                max-w-3xl
                text-3xl
                font-bold
                tracking-[-0.035em]
                text-white
                sm:text-4xl
                md:text-5xl
              "
            >
              Built for computational research.
            </h2>

          </div>
        </ScrollReveal>


        {/* =================================================
            INFRASTRUCTURE GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
          "
        >

          {infrastructure.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal
                key={item.title}
                delay={index * 100}
                y={30}
              >

                <div
                  className="
                    group
                    relative
                    min-h-[250px]
                    overflow-hidden
                    border
                    border-white/[0.07]
                    bg-[#070707]
                    p-6
                    transition-all
                    duration-700
                    ease-[cubic-bezier(.2,.7,.2,1)]
                    hover:-translate-y-1
                    hover:border-white/[0.12]
                    hover:bg-[#0a0a0a]
                    sm:min-h-[270px]
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
                      sm:h-56
                      sm:w-56
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
                      -left-20
                      h-44
                      w-44
                      rounded-full
                      bg-accent/0
                      blur-[80px]
                      transition-all
                      duration-700
                      ease-out
                      group-hover:bg-accent/[0.04]
                      sm:h-48
                      sm:w-48
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

                    {/* Icon */}

                    <div
                      className="
                        mb-8
                        inline-flex
                        text-accent/80
                        transition-all
                        duration-500
                        ease-[cubic-bezier(.2,.7,.2,1)]
                        group-hover:translate-x-1
                        group-hover:text-accent
                        sm:mb-10
                      "
                    >
                      <Icon
                        size={38}
                        strokeWidth={1.5}
                        className="
                          transition-transform
                          duration-500
                          ease-[cubic-bezier(.2,.7,.2,1)]
                          group-hover:scale-105
                        "
                      />
                    </div>


                    {/* Title */}

                    <h3
                      className="
                        max-w-lg
                        text-xl
                        font-semibold
                        tracking-[-0.02em]
                        text-white
                        transition-all
                        duration-500
                        ease-[cubic-bezier(.2,.7,.2,1)]
                        group-hover:translate-x-1
                        sm:text-2xl
                        md:text-3xl
                      "
                    >
                      {item.title}
                    </h3>


                    {/* Description */}

                    <p
                      className="
                        mt-3
                        max-w-xl
                        text-sm
                        leading-6
                        text-white/40
                        transition-all
                        duration-500
                        group-hover:translate-x-1
                        group-hover:text-white/60
                        sm:mt-4
                        sm:text-base
                        sm:leading-7
                      "
                    >
                      {item.description}
                    </p>

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