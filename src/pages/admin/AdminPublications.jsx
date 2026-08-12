import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const emptyForm = {
  title: "",
  authors: "",
  year: "",
  category_id: "",
  venue: "",
  link: "",
  description: "",
  featured: false,
  published: true,
  display_order: 0,
};

export default function AdminPublications() {
  const [publications, setPublications] = useState([]);
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

  async function loadData() {
    setLoading(true);
    setError("");

    const [publicationResult, categoryResult] = await Promise.all([
      supabase
        .from("publications")
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .order("year", { ascending: false })
        .order("display_order", { ascending: true }),

      supabase
        .from("categories")
        .select("*")
        .eq("type", "publication")
        .order("name", { ascending: true }),
    ]);

    if (publicationResult.error) {
      setError(publicationResult.error.message);
    }

    if (categoryResult.error) {
      setError(categoryResult.error.message);
    }

    setPublications(publicationResult.data || []);
    setCategories(categoryResult.data || []);

    setLoading(false);
  }

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError("");
  }

  function openEditForm(publication) {
    setEditingId(publication.id);

    setForm({
      title: publication.title || "",
      authors: publication.authors || "",
      year: publication.year || "",
      category_id: publication.category_id || "",
      venue: publication.venue || "",
      link: publication.link || "",
      description: publication.description || "",
      featured: publication.featured || false,
      published:
        publication.published === undefined
          ? true
          : publication.published,
      display_order: publication.display_order || 0,
    });

    setShowForm(true);
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
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSave(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Publication title is required.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      title: form.title.trim(),
      authors: form.authors.trim() || null,
      year: form.year ? Number(form.year) : null,
      category_id: form.category_id
        ? Number(form.category_id)
        : null,
      venue: form.venue.trim() || null,
      link: form.link.trim() || null,
      description: form.description.trim() || null,
      featured: form.featured,
      published: form.published,
      display_order: Number(form.display_order) || 0,
      updated_at: new Date().toISOString(),
    };

    let result;

    if (editingId) {
      result = await supabase
        .from("publications")
        .update(payload)
        .eq("id", editingId);
    } else {
      result = await supabase
        .from("publications")
        .insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    await loadData();

    setSaving(false);
    closeForm();
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this publication?"
    );

    if (!confirmed) return;

    setError("");

    const { error } = await supabase
      .from("publications")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setPublications((current) =>
      current.filter((publication) => publication.id !== id)
    );
  }

  async function handleAddCategory(event) {
    event.preventDefault();

    const name = newCategory.trim();

    if (!name) return;

    setAddingCategory(true);
    setError("");

    const { data, error } = await supabase
      .from("categories")
      .insert({
        name,
        type: "publication",
      })
      .select()
      .single();

    if (error) {
      setError(error.message);
      setAddingCategory(false);
      return;
    }

    setCategories((current) =>
      [...current, data].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    );

    // Automatically select the newly-created category.
    setForm((current) => ({
      ...current,
      category_id: data.id,
    }));

    setNewCategory("");
    setShowNewCategory(false);
    setAddingCategory(false);
  }

  if (loading) {
    return (
      <main className="section-atmosphere flex min-h-screen items-center justify-center text-white">
        <p className="label-mono text-white/40">
          Loading publications...
        </p>
      </main>
    );
  }

  return (
    <main className="section-atmosphere min-h-screen text-white">

      {/* Header */}
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12">

          <div>
            <p className="label-mono text-accent">
              HPC LAB / ADMIN
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em]">
              Publications
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
              duration-300
              hover:border-accent/70
              hover:bg-accent/[0.10]
            "
          >
            + Add Publication
          </button>

        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12">

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

        {/* Empty state */}
        {publications.length === 0 ? (
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
              No publications yet
            </p>

            <p className="mt-3 text-sm text-white/40">
              Add your first publication using the button above.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">

            {publications.map((publication) => (
              <article
                key={publication.id}
                className="
                  border
                  border-white/[0.07]
                  bg-[#080808]
                  p-6
                  transition-colors
                  duration-300
                  hover:border-white/[0.12]
                  md:p-7
                "
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  {/* Information */}
                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-3">

                      <span className="label-mono text-accent/70">
                        {publication.year || "—"}
                      </span>

                      {publication.categories?.name && (
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
                          {publication.categories.name}
                        </span>
                      )}

                      {!publication.published && (
                        <span
                          className="
                            border
                            border-yellow-500/20
                            bg-yellow-500/[0.04]
                            px-3
                            py-1
                            text-xs
                            text-yellow-400/70
                          "
                        >
                          Draft
                        </span>
                      )}

                      {publication.featured && (
                        <span
                          className="
                            border
                            border-blue-500/20
                            bg-blue-500/[0.04]
                            px-3
                            py-1
                            text-xs
                            text-blue-400/70
                          "
                        >
                          Featured
                        </span>
                      )}

                    </div>

                    <h2 className="mt-4 text-xl font-semibold text-white md:text-2xl">
                      {publication.title}
                    </h2>

                    {publication.authors && (
                      <p className="mt-2 text-sm text-white/40">
                        {publication.authors}
                      </p>
                    )}

                    {publication.venue && (
                      <p className="mt-2 text-sm text-white/30">
                        {publication.venue}
                      </p>
                    )}

                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-3">

                    <button
                      type="button"
                      onClick={() => openEditForm(publication)}
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
                        duration-300
                        hover:border-accent/40
                        hover:text-accent
                      "
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(publication.id)}
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
                        duration-300
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
          ADD / EDIT MODAL
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

              {/* Modal header */}
              <div className="flex items-start justify-between gap-6">

                <div>
                  <p className="label-mono text-accent">
                    {editingId ? "Edit Publication" : "New Publication"}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    {editingId
                      ? "Update publication"
                      : "Add publication"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  className="
                    text-2xl
                    leading-none
                    text-white/30
                    transition-colors
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
                    placeholder="Publication title"
                  />
                </Field>

                {/* Authors */}
                <Field label="Authors">
                  <input
                    name="authors"
                    value={form.authors}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Authors"
                  />
                </Field>

                {/* Year + Venue */}
                <div className="grid gap-6 md:grid-cols-2">

                  <Field label="Year">
                    <input
                      name="year"
                      type="number"
                      value={form.year}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="2025"
                    />
                  </Field>

                  <Field label="Venue / Journal">
                    <input
                      name="venue"
                      value={form.venue}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="IEEE / Springer / Elsevier..."
                    />
                  </Field>

                </div>

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

                      {categories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewCategory((current) => !current)
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
                        transition-colors
                        hover:border-accent/40
                        hover:text-accent
                      "
                    >
                      + New
                    </button>

                  </div>

                  {/* New category */}
                  {showNewCategory && (
                    <div className="mt-3 flex gap-3">

                      <input
                        value={newCategory}
                        onChange={(event) =>
                          setNewCategory(event.target.value)
                        }
                        placeholder="New category name"
                        className={inputClass}
                      />

                      <button
                        type="button"
                        onClick={handleAddCategory}
                        disabled={addingCategory}
                        className="
                          shrink-0
                          border
                          border-accent/40
                          px-4
                          text-xs
                          uppercase
                          tracking-[0.10em]
                          text-accent
                          transition-colors
                          hover:border-accent/70
                          disabled:opacity-40
                        "
                      >
                        {addingCategory ? "Adding..." : "Add"}
                      </button>

                    </div>
                  )}

                </Field>

                {/* Link */}
                <Field label="DOI / Link">
                  <input
                    name="link"
                    type="url"
                    value={form.link}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="https://doi.org/..."
                  />
                </Field>

                {/* Description */}
                <Field label="Description">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Optional description"
                  />
                </Field>

                {/* Display order */}
                <Field label="Display Order">
                  <input
                    name="display_order"
                    type="number"
                    value={form.display_order}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>

                {/* Toggles */}
                <div className="grid gap-4 md:grid-cols-2">

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
                        Featured
                      </span>

                      <span className="mt-1 block text-xs text-white/30">
                        Eligible for homepage features
                      </span>
                    </span>

                    <input
                      name="featured"
                      type="checkbox"
                      checked={form.featured}
                      onChange={handleChange}
                      className="h-4 w-4 accent-yellow-400"
                    />
                  </label>

                </div>

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

                {/* Actions */}
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
                      transition-colors
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
                      transition-all
                      hover:border-accent/70
                      hover:bg-accent/[0.10]
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                        ? "Save Changes"
                        : "Add Publication"}
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
   FORM COMPONENTS
========================================================= */

function Field({ label, required, children }) {
  return (
    <div>
      <label className="label-mono text-white/40">
        {label}
        {required && (
          <span className="ml-1 text-accent">*</span>
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