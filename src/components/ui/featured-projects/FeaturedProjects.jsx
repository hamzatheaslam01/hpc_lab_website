import { useEffect, useState } from "react";
import FeaturedProjectCard from "./FeaturedProjectCard";
import ProjectPreviewCard from "./ProjectPreviewCard";
import ScrollReveal from "../ScrollReveal";
import { supabase } from "../../../lib/supabase";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        .eq("published", true);

      if (error) {
        console.error(
          "Failed to load featured projects:",
          error
        );
        setLoading(false);
        return;
      }

      /*
       * Randomize the published projects.
       * Homepage picks:
       * 1 large project
       * 3 smaller projects
       */
      const shuffled = [...(data || [])].sort(
        () => Math.random() - 0.5
      );

      setProjects(shuffled.slice(0, 4));
      setLoading(false);
    }

    fetchProjects();
  }, []);

  if (loading) {
    return null;
  }

  if (projects.length === 0) {
    return null;
  }

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1, 4);

  const formatProject = (project) => ({
    ...project,

    category:
      project.categories?.name || "Project",

    image:
      project.image_url || null,
  });

  return (
    <section>
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

        {/* =====================================================
            HEADING
        ===================================================== */}

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
              Featured Work
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
              Explore selected research initiatives,
              software systems, and computational
              projects developed within the High
              Performance Computing Lab.
            </p>

          </div>
        </ScrollReveal>


        {/* =====================================================
            MAIN FEATURED PROJECT
        ===================================================== */}

        <ScrollReveal y={40}>
          <FeaturedProjectCard
            project={formatProject(featuredProject)}
            featured
          />
        </ScrollReveal>


        {/* =====================================================
            THREE SMALLER PROJECTS
        ===================================================== */}

        {otherProjects.length > 0 && (
          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-5
              sm:mt-10
              sm:gap-6
              md:grid-cols-2
              lg:mt-12
              lg:grid-cols-3
              lg:gap-8
            "
          >
            {otherProjects.map((project, index) => (
              <ScrollReveal
                key={project.id}
                delay={index * 100}
                y={35}
              >
                <ProjectPreviewCard
                  project={formatProject(project)}
                  compact
                />
              </ScrollReveal>
            ))}
          </div>
        )}


        {/* =====================================================
            SEE ALL PROJECTS
        ===================================================== */}

        <ScrollReveal delay={300} y={20}>
          <div
            className="
              mt-10
              flex
              justify-center
              sm:mt-12
              md:mt-16
            "
          >

            <a
              href="/projects"
              className="
                group
                inline-flex
                items-center
                border
                border-white/[0.12]
                bg-white/[0.02]
                px-6
                py-3
                text-xs
                font-medium
                tracking-wide
                text-white/60
                transition-all
                duration-500
                ease-[cubic-bezier(.2,.7,.2,1)]
                hover:border-accent/50
                hover:bg-accent/[0.06]
                hover:text-accent
                sm:px-7
                sm:text-sm
              "
            >
              See All Projects
            </a>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}