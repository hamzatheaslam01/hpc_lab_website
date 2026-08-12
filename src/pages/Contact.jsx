import { useEffect } from "react";
import SiteNav from "../components/ui/hero/Site-Nav";
import Footer from "../components/ui/footer";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function Contact() {
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

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="section-glow border-b border-white/[0.06]">
          <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 md:px-12">

            <ScrollReveal>
              <div>
                <div className="label-mono mb-6 text-accent">
                  Contact
                </div>

                <h1
                  className="
                    text-6xl
                    font-bold
                    tracking-[-0.04em]
                    text-white
                    md:text-7xl
                  "
                >
                  Get in Touch
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
                  Interested in collaborating, conducting research, or
                  learning more about the High Performance Computing Lab?
                  We'd love to hear from you.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </section>


        {/* =====================================================
            CONTACT INFORMATION
        ===================================================== */}

        <section className="section-glow">

          <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12">

            <ScrollReveal y={35}>

              <div className="max-w-3xl">

                <h2
                  className="
                    text-4xl
                    font-bold
                    tracking-[-0.03em]
                    text-white
                    md:text-5xl
                  "
                >
                  Let's build something
                  <br />
                  <span className="text-white/35">
                    worth computing.
                  </span>
                </h2>


                <div className="mt-16 space-y-12">

                  {/* =================================================
                      EMAIL
                  ================================================= */}

                  <div className="group">

                    <p
                      className="
                        label-mono
                        text-white/30
                        transition-colors
                        duration-500
                        group-hover:text-accent/70
                      "
                    >
                      Email
                    </p>

                    <a
                      href="mailto:sohail.iqbal@seecs.edu.pk"
                      className="
                        mt-3
                        inline-block
                        text-xl
                        text-white/70
                        transition-all
                        duration-500
                        ease-[cubic-bezier(.2,.7,.2,1)]
                        hover:translate-x-1
                        hover:text-accent
                      "
                    >
                      sohail.iqbal@seecs.edu.pk
                    </a>

                  </div>


                  {/* =================================================
                      DEPARTMENT
                  ================================================= */}

                  <div className="group">

                    <p
                      className="
                        label-mono
                        text-white/30
                        transition-colors
                        duration-500
                        group-hover:text-accent/70
                      "
                    >
                      Department
                    </p>

                    <p
                      className="
                        mt-3
                        text-lg
                        leading-relaxed
                        text-white/60
                        transition-colors
                        duration-500
                        group-hover:text-white/75
                      "
                    >
                      Department of Computing
                      <br />
                      School of Electrical Engineering & Computer Science
                      (SEECS)
                    </p>

                  </div>


                  {/* =================================================
                      ADDRESS
                  ================================================= */}

                  <div className="group">

                    <p
                      className="
                        label-mono
                        text-white/30
                        transition-colors
                        duration-500
                        group-hover:text-accent/70
                      "
                    >
                      Address
                    </p>

                    <p
                      className="
                        mt-3
                        text-lg
                        leading-relaxed
                        text-white/60
                        transition-colors
                        duration-500
                        group-hover:text-white/75
                      "
                    >
                      National University of Sciences & Technology (NUST)
                      <br />
                      H-12 Campus
                      <br />
                      Islamabad, Pakistan
                    </p>

                  </div>

                </div>

              </div>

            </ScrollReveal>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}