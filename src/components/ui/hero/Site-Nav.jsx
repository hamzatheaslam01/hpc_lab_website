import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/hpc-logo.png";

const links = [
  { label: "Projects", to: "/projects" },
  { label: "Publications", to: "/publications" },
  { label: "Videos", to: "/videos" },
  { label: "People", to: "/people" },
  { label: "Contact", to: "/contact" },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu when navigating */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-50
        flex
        justify-center
        transition-all
        duration-500
        ease-[cubic-bezier(.2,.7,.2,1)]
        ${scrolled ? "py-3 sm:py-4" : "py-0"}
      `}
    >
      <nav
        aria-label="Primary"
        className={`
          mx-3
          flex
          h-[72px]
          w-full
          max-w-[1400px]
          items-center
          justify-between
          px-4
          transition-all
          duration-500
          ease-[cubic-bezier(.2,.7,.2,1)]
          sm:mx-4
          sm:px-6
          md:mx-6
          md:h-20
          md:px-12
          ${
            scrolled
              ? `
                rounded-2xl
                border
                border-white/[0.08]
                bg-black/65
                shadow-[0_12px_40px_rgba(0,0,0,0.35)]
                backdrop-blur-xl
              `
              : `
                border-b
                border-white/[0.06]
                bg-black/10
                backdrop-blur-[2px]
              `
          }
        `}
      >

        {/* =================================================
            LOGO
        ================================================= */}

        <NavLink
          to="/"
          onClick={closeMobileMenu}
          className="
            group
            flex
            shrink-0
            items-center
          "
          aria-label="HPC Lab Home"
        >
          <img
            src={logo}
            alt="HPC Lab"
            className="
              h-12
              w-auto
              object-contain
              transition-opacity
              duration-300
              group-hover:opacity-80
              sm:h-14
              md:h-16
            "
          />
        </NavLink>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <ul
          className="
            hidden
            items-center
            gap-9
            md:flex
          "
        >
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `
                    nav-link
                    relative
                    text-[0.8125rem]
                    font-medium
                    tracking-wide
                    transition-colors
                    duration-300
                    ${
                      isActive
                        ? "text-accent"
                        : "text-white/60 hover:text-white"
                    }
                  `
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            setMobileOpen((open) => !open)
          }
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            border
            border-white/[0.10]
            bg-white/[0.02]
            text-white/70
            transition-all
            duration-300
            hover:border-accent/40
            hover:text-accent
            md:hidden
          "
          aria-label={
            mobileOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
        >
          <div className="relative h-4 w-5">

            <span
              className={`
                absolute
                left-0
                top-0
                h-px
                w-5
                bg-current
                transition-all
                duration-300
                ${
                  mobileOpen
                    ? "translate-y-[7px] rotate-45"
                    : ""
                }
              `}
            />

            <span
              className={`
                absolute
                left-0
                top-[7px]
                h-px
                w-5
                bg-current
                transition-all
                duration-300
                ${
                  mobileOpen
                    ? "opacity-0"
                    : "opacity-100"
                }
              `}
            />

            <span
              className={`
                absolute
                left-0
                top-[14px]
                h-px
                w-5
                bg-current
                transition-all
                duration-300
                ${
                  mobileOpen
                    ? "-translate-y-[7px] -rotate-45"
                    : ""
                }
              `}
            />

          </div>
        </button>

      </nav>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`
          absolute
          left-3
          right-3
          top-[84px]
          overflow-hidden
          border
          border-white/[0.08]
          bg-[#080808]/95
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          backdrop-blur-xl
          transition-all
          duration-500
          ease-[cubic-bezier(.2,.7,.2,1)]
          sm:left-4
          sm:right-4
          md:hidden
          ${
            mobileOpen
              ? "pointer-events-auto max-h-[500px] opacity-100"
              : "pointer-events-none max-h-0 border-transparent opacity-0"
          }
        `}
      >

        <div className="p-3">

          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/[0.05]
                  px-4
                  py-4
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  last:border-b-0
                  ${
                    isActive
                      ? "text-accent"
                      : "text-white/60 hover:bg-white/[0.03] hover:text-white"
                  }
                `
              }
            >
              <span>{link.label}</span>

              <span className="text-white/20">
                →
              </span>
            </NavLink>
          ))}

        </div>

      </div>
    </header>
  );
}