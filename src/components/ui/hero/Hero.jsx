import VantaGlobe from "./VantaGlobe";

export default function Hero() {
  return (
    <section
      className="
        relative
        h-[440px]
        !min-h-0
        overflow-hidden
        bg-[#050505]

        sm:h-[480px]

        md:h-auto
        md:min-h-screen
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
          MOBILE BOTTOM FADE
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-[1]
          h-24
          bg-gradient-to-t
          from-[#050505]
          to-transparent
          md:hidden
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
    h-full
    w-full
    max-w-[1400px]
    items-center
    px-5
    pt-8

    sm:px-6
    sm:pt-8

    md:min-h-screen
    md:px-10
    md:pt-0

    lg:px-12
    xl:px-16
  "
>
        <div
          className="
            w-full
            max-w-[340px]

            sm:max-w-2xl
          "
        >
          {/* =================================================
              HEADING
          ================================================= */}

          <h1
            className="
              rise
              mt-4
              text-[2.7rem]
              font-extrabold
              leading-[0.91]
              tracking-[-0.045em]
              text-white

              sm:mt-8
              sm:text-[clamp(3.5rem,9vw,6.5rem)]
              sm:leading-[0.92]

              md:mt-8
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
              mt-6
              max-w-[335px]
              text-[0.9rem]
              leading-[1.55]
              text-white/60

              sm:mt-8
              sm:max-w-xl
              sm:text-lg
              sm:leading-relaxed
            "
            style={{
              animationDelay: "220ms",
            }}
          >
            We design the architectures, numerical methods, and software that
            enable researchers to solve computational problems at scale across
            artificial intelligence, robotics, networking, and scientific
            computing.
          </p>
        </div>
      </div>
    </section>
  );
}