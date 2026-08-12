import { useEffect, useState } from "react";
import ScrollReveal from "../ScrollReveal";
import { supabase } from "../../../lib/supabase";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [paused, setPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  /* =========================================================
     LOAD NEWS
  ========================================================= */

  useEffect(() => {
    async function loadNews() {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("display_order", {
          ascending: true,
        })
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Failed to load news:", error);
        setLoading(false);
        return;
      }

      setNews(data || []);
      setLoading(false);
    }

    loadNews();
  }, []);

  /* =========================================================
     AUTOMATIC CAROUSEL
  ========================================================= */

  useEffect(() => {
    if (news.length <= 1 || paused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((current) => current + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [news.length, paused]);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  function nextSlide() {
    if (news.length <= 1) return;

    setIsTransitioning(true);
    setCurrentIndex((current) => current + 1);
  }

  function previousSlide() {
    if (news.length <= 1) return;

    setIsTransitioning(true);
    setCurrentIndex((current) => current - 1);
  }

  /* =========================================================
     HANDLE INFINITE LOOP
  ========================================================= */

  function handleTransitionEnd() {
    if (news.length <= 1) return;

    if (currentIndex === news.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });

      return;
    }

    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(news.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }

  /* =========================================================
     LOADING / EMPTY
  ========================================================= */

  if (loading || news.length === 0) {
    return null;
  }

  const slides =
    news.length === 1
      ? news
      : [
          news[news.length - 1],
          ...news,
          news[0],
        ];

  let activeIndex;

  if (news.length === 1) {
    activeIndex = 0;
  } else if (currentIndex === 0) {
    activeIndex = news.length - 1;
  } else if (currentIndex === news.length + 1) {
    activeIndex = 0;
  } else {
    activeIndex = currentIndex - 1;
  }

  return (
    <section
      id="news"
      className="
        border-t
        border-white/[0.06]
        bg-[#050505]
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
              Latest News
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
              Updates, announcements, achievements,
              events, and recent developments from
              the High Performance Computing Lab.
            </p>

          </div>
        </ScrollReveal>


        {/* =================================================
            CAROUSEL
        ================================================= */}

        <ScrollReveal y={30}>
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >

            <div
              className={`
                flex
                ${
                  isTransitioning
                    ? "transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
                    : ""
                }
              `}
              style={{
                transform:
                  news.length === 1
                    ? "translateX(0)"
                    : `translateX(-${currentIndex * 100}%)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >

              {slides.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="
                    w-full
                    shrink-0
                  "
                >
                  <NewsCard
                    item={item}
                    onPrevious={previousSlide}
                    onNext={nextSlide}
                    showControls={news.length > 1}
                  />
                </div>
              ))}

            </div>

          </div>
        </ScrollReveal>


        {/* =================================================
            INDICATORS
        ================================================= */}

        {news.length > 1 && (
          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              sm:mt-8
            "
          >

            <div className="flex items-center gap-2">
              {news.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(index + 1);
                  }}
                  aria-label={`Show news item ${index + 1}`}
                  className={`
                    h-1
                    transition-all
                    duration-500
                    ${
                      index === activeIndex
                        ? "w-8 bg-accent sm:w-10"
                        : "w-2.5 bg-white/20 hover:bg-white/40 sm:w-3"
                    }
                  `}
                />
              ))}
            </div>

            <span
              className="
                label-mono
                text-[10px]
                text-white/20
                sm:text-xs
              "
            >
              {String(activeIndex + 1).padStart(2, "0")}
              {" / "}
              {String(news.length).padStart(2, "0")}
            </span>

          </div>
        )}

      </div>
    </section>
  );
}


/* =========================================================
   NEWS CARD
========================================================= */

function NewsCard({
  item,
  onPrevious,
  onNext,
  showControls,
}) {
  const card = (
    <article
      className="
        group
        relative
        overflow-hidden
        border
        border-white/[0.07]
        bg-[#080808]
        transition-colors
        duration-700
        hover:border-white/[0.12]
        hover:bg-[#0b0b0b]
      "
    >

      {/* =================================================
          TOP ACCENT
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-30
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
          CONTENT
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          md:h-[480px]
          md:grid-cols-[42%_58%]
        "
      >

        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          className="
            group/image
            relative
            h-[230px]
            overflow-hidden
            sm:h-[280px]
            md:h-full
          "
        >

          <img
            src={item.image_url}
            alt={item.headline}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-1000
              ease-[cubic-bezier(.2,.7,.2,1)]
              group-hover:scale-[1.025]
            "
          />


          {/* Image gradient */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-b
              from-transparent
              via-transparent
              to-[#080808]/80
              md:bg-gradient-to-r
              md:from-transparent
              md:via-transparent
              md:to-[#080808]
            "
          />


          {/* =================================================
              IMAGE CONTROLS
          ================================================= */}

          {showControls && (
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-20
                flex
                items-center
                justify-between
                px-3
                opacity-100
                sm:px-4
                md:opacity-0
                md:transition-opacity
                md:duration-300
                md:group-hover/image:opacity-100
              "
            >

              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onPrevious();
                }}
                className="
                  pointer-events-auto
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  border
                  border-white/20
                  bg-black/50
                  text-base
                  text-white/75
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-accent/60
                  hover:bg-black/70
                  hover:text-accent
                  sm:h-11
                  sm:w-11
                  sm:text-lg
                "
                aria-label="Previous news"
              >
                ←
              </button>


              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onNext();
                }}
                className="
                  pointer-events-auto
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  border
                  border-white/20
                  bg-black/50
                  text-base
                  text-white/75
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-accent/60
                  hover:bg-black/70
                  hover:text-accent
                  sm:h-11
                  sm:w-11
                  sm:text-lg
                "
                aria-label="Next news"
              >
                →
              </button>

            </div>
          )}

        </div>


        {/* =================================================
            TEXT
        ================================================= */}

        <div
          className="
            flex
            flex-col
            justify-center
            overflow-hidden
            p-6
            sm:p-8
            md:p-10
            lg:p-14
          "
        >

          {/* Label */}

          <p
            className="
              label-mono
              text-[10px]
              text-accent/70
              sm:text-xs
            "
          >
            HPC LAB / NEWS
          </p>


          {/* Headline */}

          <h3
            className="
              mt-4
              line-clamp-3
              max-w-3xl
              text-2xl
              font-bold
              leading-[1.08]
              tracking-[-0.03em]
              text-white
              transition-colors
              duration-500
              group-hover:text-accent
              sm:mt-5
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
            "
          >
            {item.headline}
          </h3>


          {/* Description */}

          <p
            className="
              mt-4
              line-clamp-4
              max-w-2xl
              text-sm
              leading-6
              text-white/40
              transition-colors
              duration-500
              group-hover:text-white/55
              sm:mt-6
              sm:text-base
              sm:leading-7
              md:text-lg
            "
          >
            {item.description}
          </p>


          {/* Optional link */}

          {item.link && (
            <div
              className="
                mt-6
                flex
                items-center
                gap-2
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-white/30
                transition-colors
                duration-500
                group-hover:text-accent
                sm:mt-8
                sm:text-xs
              "
            >
              Read More

              <span
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                "
              >
                ↗
              </span>
            </div>
          )}

        </div>

      </div>

    </article>
  );

  if (!item.link) {
    return card;
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {card}
    </a>
  );
}