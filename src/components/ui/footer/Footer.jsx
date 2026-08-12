import { Link } from "react-router-dom";
import logo from "../../../assets/hpc-logo.png";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Publications", to: "/publications" },
  { label: "People", to: "/people" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#080a0d]">

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div
        className="
          mx-auto
          grid
          max-w-[1400px]
          gap-16
          px-6
          py-24
          md:px-12
          lg:grid-cols-[1.5fr_1fr_1fr]
        "
      >

        {/* =================================================
            BRAND
        ================================================= */}

        <div>

          <Link
            to="/"
            className="group inline-block"
            aria-label="High Performance Computing Lab Home"
          >
            <img
              src={logo}
              alt="High Performance Computing Lab"
              className="
                h-20
                w-auto
                object-contain
                transition-opacity
                duration-500
                group-hover:opacity-75
              "
            />
          </Link>

          <div
            className="
              mt-7
              space-y-2
              text-sm
              leading-relaxed
              text-white/45
            "
          >
            <p>Department of Computing</p>

            <p>
              School of Electrical Engineering & Computer Science
            </p>

            <p>
              National University of Sciences & Technology (NUST)
            </p>
          </div>

        </div>


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <div>

          <h3 className="label-mono text-white/40">
            Navigation
          </h3>

          <nav className="mt-6 flex flex-col gap-4">

            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="
                  nav-link
                  w-fit
                  text-sm
                  text-white/55
                  transition-colors
                  duration-500
                  hover:text-accent
                "
              >
                {link.label}
              </Link>
            ))}

          </nav>

        </div>


        {/* =================================================
            CONTACT
        ================================================= */}

        <div>

          <h3 className="label-mono text-white/40">
            Contact
          </h3>

          <div
            className="
              mt-6
              space-y-5
              text-sm
              leading-relaxed
              text-white/45
            "
          >

            <a
              href="mailto:sohail.iqbal@seecs.edu.pk"
              className="
                block
                w-fit
                transition-colors
                duration-500
                hover:text-accent
              "
            >
              sohail.iqbal@seecs.edu.pk
            </a>

            <p>
              Department of Computing
              <br />
              SEECS, NUST
              <br />
              Islamabad, Pakistan
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div className="border-t border-white/[0.07] bg-[#050607]">

        <div
          className="
            mx-auto
            flex
            max-w-[1400px]
            flex-col
            gap-3
            px-6
            py-6
            text-xs
            text-white/30
            md:flex-row
            md:items-center
            md:justify-between
            md:px-12
          "
        >

          <p>
            © 2026 High Performance Computing Lab, SEECS, NUST.
          </p>

          <p>
            Designed & developed by{" "}

            <a
              href="https://www.linkedin.com/in/mohammad-hamza-aslam-5184b7373"
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-medium
                text-white/50
                transition-colors
                duration-500
                hover:text-accent
              "
            >
              Mohammad Hamza Aslam
            </a>

          </p>

        </div>

      </div>

    </footer>
  );
}