import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    const role = data.user?.app_metadata?.role;

    if (role !== "admin") {
      await supabase.auth.signOut();
      setError("You do not have administrator access.");
      setLoading(false);
      return;
    }

    navigate("/admin");
  }

  return (
    <main className="section-atmosphere flex min-h-screen items-center justify-center px-6 text-white">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-10">

          <div className="mb-5 h-px w-16 bg-accent" />

          <p className="label-mono text-accent">
            HPC LAB / ADMIN
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em]">
            Administrator Login
          </h1>

          <p className="mt-4 text-sm leading-6 text-white/40">
            Sign in to manage publications, projects, people, and videos.
          </p>

        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="
            border
            border-white/[0.08]
            bg-[#080808]
            p-8
          "
        >

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="label-mono text-white/40"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="sohail.iqbal@seecs.edu.pk"
              required
              className="
                mt-3
                w-full
                border
                border-white/[0.10]
                bg-black
                px-4
                py-3
                text-sm
                text-white
                outline-none
                transition-colors
                duration-300
                placeholder:text-white/20
                focus:border-accent/60
              "
            />
          </div>

          {/* Password */}
          <div className="mt-6">
            <label
              htmlFor="password"
              className="label-mono text-white/40"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
              className="
                mt-3
                w-full
                border
                border-white/[0.10]
                bg-black
                px-4
                py-3
                text-sm
                text-white
                outline-none
                transition-colors
                duration-300
                placeholder:text-white/20
                focus:border-accent/60
              "
            />
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                mt-6
                border
                border-red-500/20
                bg-red-500/[0.05]
                px-4
                py-3
                text-sm
                text-red-400
              "
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-8
              w-full
              border
              border-accent/40
              bg-accent/[0.06]
              px-5
              py-3
              text-sm
              font-medium
              tracking-wide
              text-accent
              transition-all
              duration-500
              hover:border-accent/70
              hover:bg-accent/[0.10]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

      </div>

    </main>
  );
}