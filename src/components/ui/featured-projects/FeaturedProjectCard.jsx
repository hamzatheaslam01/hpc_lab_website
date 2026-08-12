export default function FeaturedProjectCard({ project }) {
  return (
    <article
      className="
        group
        relative
        min-h-[520px]
        overflow-hidden
        border border-white/[0.07]
        bg-[#080808]
        transition-all
        duration-700
        ease-[cubic-bezier(.2,.7,.2,1)]
        hover:-translate-y-1
        hover:border-white/[0.12]
        hover:bg-[#0b0b0b]
      "
    >

      {/* =====================================================
          PROJECT IMAGE
      ===================================================== */}

      {project.image_url && (
        <div className="absolute inset-0 overflow-hidden">

          <img
            src={project.image_url}
            alt={project.title}
            className="
              h-full
              w-full
              object-cover
              opacity-100
              brightness-[0.85]
              transition-all
              duration-1000
              ease-[cubic-bezier(.2,.7,.2,1)]
              group-hover:scale-105
              group-hover:brightness-100
            "
          />

          {/* Dark image overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/75
              to-black/30
            "
          />

          {/* Extra side darkness */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-black/40
              via-transparent
              to-black/30
            "
          />

        </div>
      )}

      {/* =====================================================
          BLUE ATMOSPHERIC GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-500/0
          blur-[130px]
          transition-all
          duration-1000
          ease-out
          group-hover:bg-blue-500/[0.07]
        "
      />

      {/* =====================================================
          YELLOW ATMOSPHERIC GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-32
          h-[380px]
          w-[380px]
          rounded-full
          bg-accent/0
          blur-[120px]
          transition-all
          duration-1000
          ease-out
          group-hover:bg-accent/[0.045]
        "
      />

      {/* =====================================================
          TOP GRADIENT BORDER
      ===================================================== */}

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

      {/* =====================================================
          LEFT GRADIENT BORDER
      ===================================================== */}

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

      {/* =====================================================
          BOTTOM GRADIENT BORDER
      ===================================================== */}

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

      {/* =====================================================
          RIGHT GRADIENT BORDER
      ===================================================== */}

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

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[520px]
          flex-col
          justify-end
          p-10
          md:p-12
        "
      >

        {/* Category */}

        <div className="mb-6">

        </div>

        {/* Title */}

        <h2
          className="
            max-w-4xl
            text-4xl
            font-bold
            leading-[1.05]
            tracking-[-0.035em]
            text-white
            transition-transform
            duration-700
            ease-[cubic-bezier(.2,.7,.2,1)]
            group-hover:translate-x-1
            md:text-5xl
            lg:text-6xl
          "
        >
          {project.title}
        </h2>

        {/* Description */}

        <p
          className="
            mt-6
            max-w-3xl
            text-base
            leading-7
            text-white/50
            transition-all
            duration-700
            ease-[cubic-bezier(.2,.7,.2,1)]
            group-hover:translate-x-1
            group-hover:text-white/70
            md:text-lg
          "
        >
          {project.description}
        </p>

      </div>

    </article>
  );
}