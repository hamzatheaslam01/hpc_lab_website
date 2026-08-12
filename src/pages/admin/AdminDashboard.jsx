import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [counts, setCounts] = useState({
    publications: 0,
    projects: 0,
    people: 0,
    videos: 0,
    news: 0,
  });

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (
        !user ||
        user.app_metadata?.role !== "admin"
      ) {
        navigate("/admin/login", {
          replace: true,
        });
        return;
      }

      setUser(user);

      const [
        publications,
        projects,
        people,
        videos,
        news,
      ] = await Promise.all([
        supabase
          .from("publications")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("projects")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("people")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("videos")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("news")
          .select("*", {
            count: "exact",
            head: true,
          }),
      ]);

      setCounts({
        publications: publications.count ?? 0,
        projects: projects.count ?? 0,
        people: people.count ?? 0,
        videos: videos.count ?? 0,
        news: news.count ?? 0,
      });

      setLoading(false);
    }

    loadDashboard();
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();

    navigate("/admin/login", {
      replace: true,
    });
  }

  if (loading) {
    return (
      <main className="section-atmosphere flex min-h-screen items-center justify-center text-white">
        <p className="label-mono text-white/40">
          Loading dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="section-atmosphere min-h-screen text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-white/[0.06]">
        <div
          className="
            mx-auto
            flex
            max-w-[1400px]
            items-center
            justify-between
            px-6
            py-6
            md:px-12
          "
        >

          <div>
            <p className="label-mono text-accent">
              HPC LAB / ADMIN
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-5">

            <span
              className="
                hidden
                text-sm
                text-white/40
                md:block
              "
            >
              {user?.email}
            </span>

            <button
              onClick={handleLogout}
              className="
                border
                border-white/[0.10]
                px-4
                py-2
                text-xs
                font-medium
                uppercase
                tracking-[0.14em]
                text-white/50
                transition-all
                duration-300
                hover:border-accent/50
                hover:text-accent
              "
            >
              Sign Out
            </button>

          </div>

        </div>
      </header>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          mx-auto
          max-w-[1400px]
          px-6
          py-16
          md:px-12
        "
      >

        <div className="mb-12">

          <p className="text-lg text-white/50">
            Manage the content displayed across
            the HPC Lab website.
          </p>

        </div>


        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-3
            md:grid-cols-5
          "
        >

          <StatCard
            label="Publications"
            count={counts.publications}
          />

          <StatCard
            label="Projects"
            count={counts.projects}
          />

          <StatCard
            label="People"
            count={counts.people}
          />

          <StatCard
            label="Videos"
            count={counts.videos}
          />

          <StatCard
            label="News"
            count={counts.news}
          />

        </div>


        {/* ===================================================
            MANAGEMENT
        =================================================== */}

        <div className="mt-12">

          <p className="label-mono text-white/30">
            Manage Content
          </p>


          <div
            className="
              mt-5
              grid
              gap-3
              md:grid-cols-2
              lg:grid-cols-3
            "
          >

            {/* Publications */}

            <ManagementCard
              title="Publications"
              description="
                Add, edit, and remove research
                publications.
              "
              onClick={() =>
                navigate(
                  "/admin/publications"
                )
              }
            />


            {/* Projects */}

            <ManagementCard
              title="Projects"
              description="
                Manage laboratory projects and
                featured work.
              "
              onClick={() =>
                navigate(
                  "/admin/projects"
                )
              }
            />


            {/* People */}

            <ManagementCard
              title="People"
              description="
                Manage directors, researchers,
                students, and interns.
              "
              onClick={() =>
                navigate(
                  "/admin/people"
                )
              }
            />


            {/* Videos */}

            <ManagementCard
              title="Videos"
              description="
                Manage lectures, seminars,
                demonstrations, and talks.
              "
              onClick={() =>
                navigate(
                  "/admin/videos"
                )
              }
            />


            {/* News */}

            <ManagementCard
              title="News"
              description="
                Manage announcements, achievements,
                events, and laboratory updates.
              "
              onClick={() =>
                navigate(
                  "/admin/news"
                )
              }
            />

          </div>

        </div>

      </div>

    </main>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ label, count }) {
  return (
    <div
      className="
        border
        border-white/[0.07]
        bg-[#080808]
        p-7
      "
    >

      <p className="label-mono text-white/30">
        {label}
      </p>

      <p
        className="
          mt-5
          text-4xl
          font-bold
          tracking-[-0.03em]
          text-white
        "
      >
        {count}
      </p>

    </div>
  );
}


/* =========================================================
   MANAGEMENT CARD
========================================================= */

function ManagementCard({
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        relative
        min-h-[180px]
        border
        border-white/[0.07]
        bg-[#080808]
        p-7
        text-left
        transition-all
        duration-500
        ease-[cubic-bezier(.2,.7,.2,1)]
        hover:-translate-y-1
        hover:border-accent/30
        hover:bg-[#0b0b0b]
      "
    >

      <p
        className="
          text-xl
          font-semibold
          tracking-[-0.02em]
          text-white
          transition-colors
          duration-300
          group-hover:text-accent
        "
      >
        {title}
      </p>

      <p
        className="
          mt-4
          text-sm
          leading-6
          text-white/40
        "
      >
        {description}
      </p>

      <span
        className="
          absolute
          bottom-6
          right-6
          text-xs
          uppercase
          tracking-[0.15em]
          text-white/20
          transition-colors
          duration-300
          group-hover:text-accent
        "
      >
        Manage
      </span>

    </button>
  );
}