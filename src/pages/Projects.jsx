import { useEffect, useState } from "react";
import SiteNav from "../components/ui/hero/Site-Nav";
import Footer from "../components/ui/footer";
import ProjectPreviewCard from "../components/ui/featured-projects/ProjectPreviewCard";
import ScrollReveal from "../components/ui/ScrollReveal";
import { supabase } from "../lib/supabase";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .eq("published", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load projects:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setProjects(data || []);
      setLoading(false);
    }

    fetchProjects();
  }, []);

  /* =====================================================
      LOADING
  ===================================================== */

  if (loading) {
    return (
      <>
        <SiteNav />

        <main className="section-atmosphere flex min-h-screen items-center justify-center text-white">
          <p className="label-mono text-white/40">
            Loading projects...
          </p>
        </main>

        <Footer />
      </>
    );
  }

  /* =====================================================
      ERROR
  ===================================================== */

  if (error) {
    return (
      <>
        <SiteNav />

        <main className="section-atmosphere flex min-h-screen items-center justify-center px-6 text-white">
          <div className="border border-red-500/20 bg-red-500/[0.04] px-8 py-6">
            <p className="label-mono text-red-400">
              Failed to load projects
            </p>

            <p className="mt-3 text-sm text-white/50">
              {error}
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

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

                <h1
                  className="
                    text-6xl
                    font-bold
                    tracking-[-0.04em]
                    text-white
                    md:text-7xl
                  "
                >
                  Projects
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
                  Explore software systems, high-performance computing
                  research, artificial intelligence applications, robotics,
                  and engineering projects developed within the High
                  Performance Computing Lab.
                </p>

              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* =====================================================
            PROJECTS
        ===================================================== */}

        <section className="section-glow">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12">

            {projects.length === 0 ? (
              <div
                className="
                  border
                  border-white/[0.07]
                  bg-[#080808]
                  px-8
                  py-16
                  text-center
                "
              >
                <p className="text-xl font-semibold text-white">
                  No projects available
                </p>

                <p className="mt-3 text-sm text-white/40">
                  Projects will appear here once they are published.
                </p>
              </div>
            ) : (
              <div className="space-y-5">

                {projects.map((project, index) => (
                  <ScrollReveal
                    key={project.id}
                    delay={Math.min(index * 60, 300)}
                    y={30}
                  >
                    <ProjectPreviewCard
                      project={{
                        ...project,

                        // Convert Supabase category relation
                        // into the format your card already uses.
                        category:
                          project.categories?.name || "Project",
                      }}
                    />
                  </ScrollReveal>
                ))}

              </div>
            )}

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}