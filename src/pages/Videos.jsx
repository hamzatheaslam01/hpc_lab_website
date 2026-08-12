import { useEffect } from "react";
import SiteNav from "../components/ui/hero/Site-Nav";
import Footer from "../components/ui/footer";
import ScrollReveal from "../components/ui/ScrollReveal";
import videos from "../data/videos";

export default function Videos() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <SiteNav />

      <main className="section-atmosphere min-h-screen text-white">

        {/* Hero */}
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
                  Videos
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
                  Lectures, demonstrations, workshops, and talks from
                  Dr. Sohail Iqbal and the High Performance Computing Lab.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* Videos */}
        <section className="section-glow">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12">

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {videos.map((video, index) => (
                <ScrollReveal
                  key={video.youtubeId}
                  delay={index * 80}
                  y={35}
                  className="h-full"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      relative
                      flex
                      h-[570px]
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
                      hover:bg-[#0b0b0b]
                    "
                  >

                    {/* Thumbnail */}
                    <div
                      className="
                        relative
                        h-[300px]
                        shrink-0
                        overflow-hidden
                        bg-[#050505]
                      "
                    >

                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          opacity-70
                          transition-all
                          duration-700
                          ease-[cubic-bezier(.2,.7,.2,1)]
                          group-hover:scale-[1.025]
                          group-hover:opacity-90
                        "
                      />

                      {/* Dark overlay */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/80
                          via-black/20
                          to-transparent
                        "
                      />

                      {/* Blue glow */}
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
                          transition-all
                          duration-700
                          group-hover:bg-blue-500/[0.08]
                        "
                      />

                      {/* Yellow glow */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          -bottom-24
                          -left-20
                          h-48
                          w-48
                          rounded-full
                          bg-accent/0
                          blur-[90px]
                          transition-all
                          duration-700
                          group-hover:bg-accent/[0.05]
                        "
                      />

                      {/* Play button */}
                      <div
                        className="
                          absolute
                          inset-0
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <div
                          className="
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            border
                            border-white/20
                            bg-black/50
                            backdrop-blur-sm
                            transition-all
                            duration-500
                            ease-[cubic-bezier(.2,.7,.2,1)]
                            group-hover:scale-110
                            group-hover:border-accent/60
                            group-hover:bg-accent/[0.08]
                          "
                        >
                          <span
                            className="
                              ml-1
                              h-0
                              w-0
                              border-y-[7px]
                              border-l-[11px]
                              border-y-transparent
                              border-l-white/80
                              transition-colors
                              duration-500
                              group-hover:border-l-accent
                            "
                          />
                        </div>
                      </div>

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

                    </div>

                    {/* Content */}
                    <div
                      className="
                        relative
                        flex
                        min-h-0
                        flex-1
                        flex-col
                        border-t
                        border-white/[0.07]
                        p-7
                      "
                    >

                      {/* Title */}
                      <h2
                        className="
                          line-clamp-2
                          text-2xl
                          font-semibold
                          leading-tight
                          tracking-[-0.025em]
                          text-white
                          transition-all
                          duration-500
                          ease-[cubic-bezier(.2,.7,.2,1)]
                          group-hover:translate-x-1
                          group-hover:text-accent
                        "
                      >
                        {video.title}
                      </h2>

                      {/* Description */}
                      <p
                        className="
                          mt-4
                          line-clamp-4
                          min-h-[96px]
                          text-sm
                          leading-6
                          text-white/40
                          transition-colors
                          duration-500
                          group-hover:text-white/60
                        "
                      >
                        {video.description}
                      </p>

                      {/* Bottom metadata */}
                      <div
                        className="
                          mt-auto
                          flex
                          items-end
                          justify-between
                          pt-6
                        "
                      >
                        <span
                          className="
                            label-mono
                            text-white/20
                            transition-colors
                            duration-500
                            group-hover:text-accent/60
                          "
                        >
                          YouTube
                        </span>

                        <span
                          className="
                            text-xs
                            uppercase
                            tracking-[0.16em]
                            text-white/25
                            transition-colors
                            duration-500
                            group-hover:text-white/50
                          "
                        >
                          Watch
                        </span>
                      </div>

                    </div>

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

                  </a>
                </ScrollReveal>
              ))}

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}