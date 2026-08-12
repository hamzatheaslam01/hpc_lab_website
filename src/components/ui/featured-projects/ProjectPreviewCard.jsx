import { useState } from "react";

export default function ProjectPreviewCard({
  project,
  compact = false,
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((current) => !current);
  };

  /*
   * =========================================================
   * HOMEPAGE COMPACT CARD
   * =========================================================
   */

  if (compact) {
    return (
      <article
        className="
          group
          relative
          flex
          min-h-[460px]
          w-full
          flex-col
          overflow-hidden
          border
          border-white/[0.07]
          bg-[#080808]
          transition-all
          duration-500
          ease-[cubic-bezier(.2,.7,.2,1)]
          hover:-translate-y-1
          hover:border-white/[0.12]
        "
      >
        {/* IMAGE */}

        <div
          className="
            relative
            h-[220px]
            shrink-0
            overflow-hidden
            bg-[#080808]
          "
        >
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                opacity-90
                transition-transform
                duration-700
                ease-[cubic-bezier(.2,.7,.2,1)]
                group-hover:scale-105
              "
            />
          ) : (
            <div className="absolute inset-0 bg-[#080808]" />
          )}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/45
              via-transparent
              to-transparent
            "
          />
        </div>

        {/* CONTENT */}

        <div
          className="
            flex
            flex-1
            flex-col
            border-t
            border-white/[0.07]
            p-7
          "
        >
          <h3
            className="
              text-2xl
              font-semibold
              leading-tight
              tracking-[-0.025em]
              text-white
              transition-colors
              duration-500
              group-hover:text-accent
            "
          >
            {project.title}
          </h3>

          <div
            className={`
              overflow-hidden
              transition-all
              duration-500
              ease-[cubic-bezier(.2,.7,.2,1)]
              ${
                expanded
                  ? "mt-4 max-h-[500px]"
                  : "mt-4 max-h-[48px]"
              }
            `}
          >
            <p
              className="
                text-sm
                leading-6
                text-white/40
                transition-colors
                duration-500
                group-hover:text-white/55
              "
            >
              {project.description}
            </p>
          </div>

          <div className="mt-auto pt-6">
            <button
              type="button"
              onClick={toggleExpanded}
              className="
                inline-flex
                border
                border-white/[0.10]
                bg-white/[0.02]
                px-4
                py-2.5
                text-[11px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-white/45
                transition-all
                duration-300
                hover:border-accent/50
                hover:bg-accent/[0.06]
                hover:text-accent
              "
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>

        {/* GRADIENT BORDERS */}

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
      </article>
    );
  }

  /*
   * =========================================================
   * PROJECTS PAGE — HORIZONTAL CARD
   * =========================================================
   */

  return (
    <article
      className={`
        group
        relative
        w-full
        overflow-hidden
        border
        border-white/[0.07]
        bg-[#080808]
        transition-all
        duration-500
        ease-[cubic-bezier(.2,.7,.2,1)]
        hover:-translate-y-1
        hover:border-white/[0.12]
        ${expanded ? "md:min-h-[380px]" : ""}
      `}
    >
      <div className="flex flex-col md:flex-row">

        {/* IMAGE */}

        <div
          className="
            relative
            h-[240px]
            shrink-0
            overflow-hidden
            bg-[#080808]
            md:min-h-[300px]
            md:w-[34%]
          "
        >
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                opacity-90
                transition-transform
                duration-700
                ease-[cubic-bezier(.2,.7,.2,1)]
                group-hover:scale-105
              "
            />
          ) : (
            <div className="absolute inset-0 bg-[#080808]" />
          )}

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

        {/* CONTENT */}

        <div
          className="
            flex
            flex-1
            flex-col
            justify-center
            border-t
            border-white/[0.07]
            p-7
            md:border-l
            md:border-t-0
            md:p-10
          "
        >
          <h3
            className="
              text-2xl
              font-semibold
              leading-tight
              tracking-[-0.025em]
              text-white
              transition-colors
              duration-500
              group-hover:text-accent
              sm:text-3xl
            "
          >
            {project.title}
          </h3>

          {/* DESCRIPTION */}

          <div
            className={`
              overflow-hidden
              transition-all
              duration-500
              ease-[cubic-bezier(.2,.7,.2,1)]
              ${
                expanded
                  ? "mt-5 max-h-[600px]"
                  : "mt-5 max-h-[56px]"
              }
            `}
          >
            <p
              className="
                max-w-3xl
                text-sm
                leading-6
                text-white/40
                transition-colors
                duration-500
                group-hover:text-white/55
                sm:text-base
                sm:leading-7
              "
            >
              {project.description}
            </p>
          </div>

          {/* READ MORE */}

          <div className="mt-6">
            <button
              type="button"
              onClick={toggleExpanded}
              className="
                inline-flex
                border
                border-white/[0.10]
                bg-white/[0.02]
                px-4
                py-2.5
                text-[11px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-white/45
                transition-all
                duration-300
                hover:border-accent/50
                hover:bg-accent/[0.06]
                hover:text-accent
              "
            >
              {expanded ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>

      {/* GRADIENT BORDERS */}

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
    </article>
  );
}