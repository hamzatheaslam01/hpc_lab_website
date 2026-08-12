import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const emptyForm = {
  title: "",
  description: "",
  youtube_id: "",
  category_id: "",
  published: true,
  display_order: 0,
};

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  /* =========================================================
     LOAD DATA
  ========================================================= */

  async function loadData() {
    setLoading(true);
    setError("");

    const [videosResult, categoriesResult] =
      await Promise.all([
        supabase
          .from("videos")
          .select(`
            *,
            categories (
              id,
              name
            )
          `)
          .order("display_order", {
            ascending: true,
          })
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("categories")
          .select("*")
          .eq("type", "video")
          .order("name", {
            ascending: true,
          }),
      ]);

    if (videosResult.error) {
      setError(videosResult.error.message);
    }

    if (categoriesResult.error) {
      setError(categoriesResult.error.message);
    }

    setVideos(videosResult.data || []);
    setCategories(categoriesResult.data || []);

    setLoading(false);
  }

  /* =========================================================
     FORM
  ========================================================= */

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);

    setShowForm(true);
    setShowNewCategory(false);
    setNewCategory("");
    setError("");
  }

  function openEditForm(video) {
    setEditingId(video.id);

    setForm({
      title: video.title || "",
      description: video.description || "",
      youtube_id: video.youtube_id || "",
      category_id: video.category_id || "",
      published:
        video.published === undefined
          ? true
          : video.published,
      display_order: video.display_order || 0,
    });

    setShowForm(true);
    setShowNewCategory(false);
    setNewCategory("");
    setError("");
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);

    setShowNewCategory(false);
    setNewCategory("");
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  /* =========================================================
     YOUTUBE ID
  ========================================================= */

  function extractYoutubeId(value) {
    const input = value.trim();

    /*
     * If the user enters just the ID,
     * use it directly.
     */

    if (
      !input.includes("youtube.com") &&
      !input.includes("youtu.be")
    ) {
      return input;
    }

    try {
      const url = new URL(input);

      if (url.hostname.includes("youtu.be")) {
        return url.pathname.replace("/", "");
      }

      if (url.searchParams.get("v")) {
        return url.searchParams.get("v");
      }

      const parts = url.pathname.split("/");

      const embedIndex =
        parts.indexOf("embed");

      if (embedIndex !== -1) {
        return parts[embedIndex + 1];
      }

      return input;
    } catch {
      return input;
    }
  }

  function getThumbnail() {
    if (!form.youtube_id.trim()) {
      return "";
    }

    const id = extractYoutubeId(
      form.youtube_id
    );

    if (!id) return "";

    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }

  /* =========================================================
     SAVE
  ========================================================= */

  async function handleSave(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!form.youtube_id.trim()) {
      setError("YouTube video ID is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const youtubeId = extractYoutubeId(
        form.youtube_id
      );

      const payload = {
        title: form.title.trim(),

        description:
          form.description.trim() || null,

        youtube_id: youtubeId,

        category_id:
          form.category_id
            ? Number(form.category_id)
            : null,

        published: form.published,

        display_order:
          Number(form.display_order) || 0,
      };

      let result;

      if (editingId) {
        result = await supabase
          .from("videos")
          .update(payload)
          .eq("id", editingId);
      } else {
        result = await supabase
          .from("videos")
          .insert(payload);
      }

      if (result.error) {
        throw new Error(
          result.error.message
        );
      }

      await loadData();
      closeForm();
    } catch (error) {
      console.error(
        "Failed to save video:",
        error
      );

      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     DELETE
  ========================================================= */

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmed) return;

    setError("");

    const { error } = await supabase
      .from("videos")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setVideos((current) =>
      current.filter(
        (video) => video.id !== id
      )
    );
  }

  /* =========================================================
     NEW CATEGORY
  ========================================================= */

  async function handleAddCategory(event) {
    event.preventDefault();

    const name = newCategory.trim();

    if (!name) return;

    setAddingCategory(true);
    setError("");

    const { data, error } =
      await supabase
        .from("categories")
        .insert({
          name,
          type: "video",
        })
        .select()
        .single();

    if (error) {
      setError(error.message);
      setAddingCategory(false);
      return;
    }

    setCategories((current) =>
      [...current, data].sort(
        (a, b) =>
          a.name.localeCompare(b.name)
      )
    );

    setForm((current) => ({
      ...current,
      category_id: data.id,
    }));

    setNewCategory("");
    setShowNewCategory(false);
    setAddingCategory(false);
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="section-atmosphere flex min-h-screen items-center justify-center text-white">
        <p className="label-mono text-white/40">
          Loading videos...
        </p>
      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="section-atmosphere min-h-screen text-white">

      {/* Header */}

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

            <h1 className="mt-2 text-3xl font-bold">
              Videos
            </h1>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="
              border
              border-accent/40
              bg-accent/[0.06]
              px-5
              py-3
              text-sm
              font-medium
              text-accent
              transition-all
              hover:border-accent/70
              hover:bg-accent/[0.10]
            "
          >
            + Add Video
          </button>
        </div>
      </header>

      {/* Content */}

      <div
        className="
          mx-auto
          max-w-[1400px]
          px-6
          py-12
          md:px-12
        "
      >

        {error && (
          <div
            className="
              mb-8
              border
              border-red-500/20
              bg-red-500/[0.05]
              px-5
              py-4
              text-sm
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {videos.length === 0 ? (
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
            <p className="text-xl font-semibold">
              No videos yet
            </p>

            <p className="mt-3 text-sm text-white/40">
              Add your first video above.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">

            {videos.map((video) => (
              <article
                key={video.id}
                className="
                  border
                  border-white/[0.07]
                  bg-[#080808]
                  p-6
                  transition-colors
                  hover:border-white/[0.12]
                  md:p-7
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-6
                    lg:flex-row
                    lg:items-center
                  "
                >

                  {/* Thumbnail */}

                  <div
                    className="
                      h-32
                      w-56
                      shrink-0
                      overflow-hidden
                      border
                      border-white/[0.08]
                      bg-black
                    "
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                      alt={video.title}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  </div>

                  {/* Information */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap gap-3">

                      {video.categories?.name && (
                        <span
                          className="
                            border
                            border-white/[0.08]
                            px-3
                            py-1
                            text-xs
                            text-white/40
                          "
                        >
                          {video.categories.name}
                        </span>
                      )}

                      {!video.published && (
                        <span
                          className="
                            border
                            border-yellow-500/20
                            px-3
                            py-1
                            text-xs
                            text-yellow-400/70
                          "
                        >
                          Draft
                        </span>
                      )}

                    </div>

                    <h2
                      className="
                        mt-4
                        text-xl
                        font-semibold
                        text-white
                        md:text-2xl
                      "
                    >
                      {video.title}
                    </h2>

                    <p
                      className="
                        mt-2
                        line-clamp-2
                        text-sm
                        leading-6
                        text-white/35
                      "
                    >
                      {video.description}
                    </p>

                  </div>

                  {/* Actions */}

                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-3
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        openEditForm(video)
                      }
                      className="
                        border
                        border-white/[0.10]
                        px-4
                        py-2
                        text-xs
                        uppercase
                        tracking-[0.12em]
                        text-white/50
                        transition-colors
                        hover:border-accent/40
                        hover:text-accent
                      "
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(video.id)
                      }
                      className="
                        border
                        border-red-500/10
                        px-4
                        py-2
                        text-xs
                        uppercase
                        tracking-[0.12em]
                        text-red-400/50
                        transition-colors
                        hover:border-red-500/30
                        hover:text-red-400
                      "
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

      </div>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {showForm && (
        <div
          className="
            fixed
            inset-0
            z-50
            overflow-y-auto
            bg-black/80
            px-6
            py-10
            backdrop-blur-sm
          "
        >
          <div className="mx-auto max-w-3xl">

            <div
              className="
                border
                border-white/[0.08]
                bg-[#090909]
                p-7
                shadow-2xl
                md:p-10
              "
            >

              <div className="flex justify-between">

                <div>
                  <p className="label-mono text-accent">
                    {editingId
                      ? "Edit Video"
                      : "New Video"}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    {editingId
                      ? "Update video"
                      : "Add video"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  className="
                    text-2xl
                    text-white/30
                    hover:text-white
                  "
                >
                  ×
                </button>

              </div>

              <form
                onSubmit={handleSave}
                className="mt-10 space-y-6"
              >

                {/* Title */}

                <Field label="Title" required>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Video title"
                  />
                </Field>

                {/* Description */}

                <Field label="Description">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    className={inputClass}
                    placeholder="Video description"
                  />
                </Field>

                {/* YouTube ID */}

                <Field
                  label="YouTube Video ID or URL"
                  required
                >
                  <input
                    name="youtube_id"
                    value={form.youtube_id}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="xXbIGWcTHho"
                  />

                  <p className="mt-2 text-xs text-white/25">
                    You can paste either the video ID or
                    the full YouTube URL.
                  </p>
                </Field>

                {/* Thumbnail */}

                {getThumbnail() && (
                  <div
                    className="
                      overflow-hidden
                      border
                      border-white/[0.08]
                    "
                  >
                    <img
                      src={getThumbnail()}
                      alt="YouTube thumbnail preview"
                      className="
                        aspect-video
                        w-full
                        object-cover
                      "
                    />
                  </div>
                )}

                {/* Category */}

                <Field label="Category">

                  <div className="flex gap-3">

                    <select
                      name="category_id"
                      value={form.category_id}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">
                        No category
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </option>
                        )
                      )}
                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewCategory(
                          (current) => !current
                        )
                      }
                      className="
                        shrink-0
                        border
                        border-white/[0.10]
                        px-4
                        text-xs
                        uppercase
                        tracking-[0.10em]
                        text-white/50
                        hover:border-accent/40
                        hover:text-accent
                      "
                    >
                      + New
                    </button>

                  </div>

                  {showNewCategory && (
                    <div className="mt-3 flex gap-3">

                      <input
                        value={newCategory}
                        onChange={(event) =>
                          setNewCategory(
                            event.target.value
                          )
                        }
                        placeholder="New video category"
                        className={inputClass}
                      />

                      <button
                        type="button"
                        onClick={
                          handleAddCategory
                        }
                        disabled={
                          addingCategory
                        }
                        className="
                          shrink-0
                          border
                          border-accent/40
                          px-4
                          text-xs
                          uppercase
                          tracking-[0.10em]
                          text-accent
                          disabled:opacity-40
                        "
                      >
                        {addingCategory
                          ? "Adding..."
                          : "Add"}
                      </button>

                    </div>
                  )}

                </Field>

                {/* Display Order */}

                <Field label="Display Order">

                  <input
                    name="display_order"
                    type="number"
                    value={
                      form.display_order
                    }
                    onChange={handleChange}
                    className={inputClass}
                  />

                </Field>

                {/* Published */}

                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    justify-between
                    border
                    border-white/[0.08]
                    bg-black
                    px-5
                    py-4
                  "
                >
                  <span>
                    <span className="block text-sm text-white/70">
                      Published
                    </span>

                    <span className="mt-1 block text-xs text-white/30">
                      Visible on the public website
                    </span>
                  </span>

                  <input
                    name="published"
                    type="checkbox"
                    checked={form.published}
                    onChange={handleChange}
                    className="h-4 w-4 accent-yellow-400"
                  />
                </label>

                {/* Error */}

                {error && (
                  <div
                    className="
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

                {/* Buttons */}

                <div className="flex justify-end gap-3 pt-4">

                  <button
                    type="button"
                    onClick={closeForm}
                    className="
                      border
                      border-white/[0.10]
                      px-5
                      py-3
                      text-sm
                      text-white/50
                      hover:text-white
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="
                      border
                      border-accent/40
                      bg-accent/[0.06]
                      px-6
                      py-3
                      text-sm
                      font-medium
                      text-accent
                      hover:border-accent/70
                      hover:bg-accent/[0.10]
                      disabled:opacity-40
                    "
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                        ? "Save Changes"
                        : "Add Video"}
                  </button>

                </div>

              </form>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function Field({
  label,
  required,
  children,
}) {
  return (
    <div>
      <label className="label-mono text-white/40">
        {label}

        {required && (
          <span className="ml-1 text-accent">
            *
          </span>
        )}
      </label>

      <div className="mt-3">
        {children}
      </div>
    </div>
  );
}

const inputClass = `
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
`;