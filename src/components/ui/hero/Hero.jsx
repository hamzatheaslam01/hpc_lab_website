import VantaGlobe from "./VantaGlobe";

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050505]
      "
    >

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <VantaGlobe />


      {/* =================================================
          LEFT DARK OVERLAY
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-gradient-to-r
          from-black
          via-black/70
          to-transparent
        "
      />


      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1400px]
          items-center
          px-5
          pt-20
          sm:px-6
          md:px-10
          md:pt-0
          lg:px-12
          xl:px-16
        "
      >

        <div
          className="
            w-full
            max-w-2xl
          "
        >

          {/* =================================================
              HEADING
          ================================================= */}

          <h1
            className="
              rise
              mt-8
              text-[clamp(3rem,10vw,6.5rem)]
              font-extrabold
              leading-[0.92]
              tracking-[-0.045em]
              text-white
              sm:text-[clamp(3.5rem,9vw,6.5rem)]
            "
            style={{
              animationDelay: "120ms",
            }}
          >
            Intelligence at
            <br />
            the scale of
            <br />
            computation.
          </h1>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              rise
              mt-7
              max-w-xl
              text-base
              leading-7
              text-white/60
              sm:mt-8
              sm:text-lg
              sm:leading-relaxed
            "
            style={{
              animationDelay: "220ms",
            }}
          >
            We design the architectures, numerical
            methods, and software that enable
            researchers to solve computational
            problems at scale across artificial
            intelligence, robotics, networking,
            and scientific computing.
          </p>

        </div>

      </div>

    </section>
  );
}