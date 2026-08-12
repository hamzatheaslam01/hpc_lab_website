import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const emptyForm = {
  title: "",
  description: "",
  category_id: "",
  image_url: "",
  published: true,
  display_order: 0,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

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

    const [projectResult, categoryResult] = await Promise.all([
      supabase
        .from("projects")
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false }),

      supabase
        .from("categories")
        .select("*")
        .eq("type", "project")
        .order("name", { ascending: true }),
    ]);

    if (projectResult.error) {
      setError(projectResult.error.message);
    }

    if (categoryResult.error) {
      setError(categoryResult.error.message);
    }

    setProjects(projectResult.data || []);
    setCategories(categoryResult.data || []);

    setLoading(false);
  }

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);

    setSelectedImage(null);
    setImagePreview("");

    setShowForm(true);
    setShowNewCategory(false);
    setNewCategory("");
    setError("");
  }

  function openEditForm(project) {
    setEditingId(project.id);

    setForm({
      title: project.title || "",
      description: project.description || "",
      category_id: project.category_id || "",
      image_url: project.image_url || "",
      published:
        project.published === undefined
          ? true
          : project.published,
      display_order: project.display_order || 0,
    });

    setSelectedImage(null);
    setImagePreview(project.image_url || "");

    setShowForm(true);
    setShowNewCategory(false);
    setNewCategory("");
    setError("");
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);

    setSelectedImage(null);
    setImagePreview("");

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

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    // Only allow common image formats.
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // 5 MB limit.
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      return;
    }

    setError("");
    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  function removeSelectedImage() {
    setSelectedImage(null);
    setImagePreview("");

    setForm((current) => ({
      ...current,
      image_url: "",
    }));
  }

  async function uploadImage(file) {
    if (!file) {
      return form.image_url || null;
    }

    const fileExtension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${crypto.randomUUID()}.${fileExtension}`;

    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleSave(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Project title is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      // Upload image if Dr. Sohail selected one.
      const imageUrl = await uploadImage(selectedImage);

      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        category_id: form.category_id
          ? Number(form.category_id)
          : null,
        image_url: imageUrl,
        published: form.published,
        display_order: Number(form.display_order) || 0,
      };

      let result;

      if (editingId) {
        result = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editingId);
      } else {
        result = await supabase
          .from("projects")
          .insert(payload);
      }

      if (result.error) {
        throw new Error(result.error.message);
      }

      await loadData();

      closeForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    setError("");

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setProjects((current) =>
      current.filter((project) => project.id !== id)
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
        type: "project",
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
          Loading projects...
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
              Projects
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
            + Add Project
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
              No projects yet
            </p>

            <p className="mt-3 text-sm text-white/40">
              Add your first project using the button above.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">

            {projects.map((project) => (
              <article
                key={project.id}
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

                  {/* Image */}
                  {project.image_url && (
                    <div className="h-24 w-36 shrink-0 overflow-hidden border border-white/[0.08] bg-black">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Information */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      {project.categories?.name && (
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
                          {project.categories.name}
                        </span>
                      )}

                      {!project.published && (
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

                    </div>

                    <h2 className="mt-4 text-xl font-semibold text-white md:text-2xl">
                      {project.title}
                    </h2>

                    {project.description && (
                      <p className="mt-3 max-w-4xl text-sm leading-6 text-white/40">
                        {project.description}
                      </p>
                    )}

                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-3">

                    <button
                      type="button"
                      onClick={() => openEditForm(project)}
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
                      onClick={() => handleDelete(project.id)}
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

              {/* Modal Header */}
              <div className="flex items-start justify-between gap-6">

                <div>
                  <p className="label-mono text-accent">
                    {editingId
                      ? "Edit Project"
                      : "New Project"}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    {editingId
                      ? "Update project"
                      : "Add project"}
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
                    placeholder="Project title"
                  />
                </Field>

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

                  {/* New Category */}
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
                        {addingCategory
                          ? "Adding..."
                          : "Add"}
                      </button>

                    </div>
                  )}

                </Field>

                {/* Description */}
                <Field label="Description">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={7}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe the project..."
                  />
                </Field>

                {/* Image Upload */}
                <Field label="Project Image">

                  <div
                    className="
                      overflow-hidden
                      border
                      border-white/[0.10]
                      bg-black
                    "
                  >

                    {imagePreview ? (
                      <div>

                        <div className="relative aspect-video w-full overflow-hidden">

                          <img
                            src={imagePreview}
                            alt="Project preview"
                            className="h-full w-full object-cover"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                          <div className="absolute bottom-4 left-4">
                            <p className="text-xs uppercase tracking-[0.12em] text-white/60">
                              Image Preview
                            </p>
                          </div>

                        </div>

                        <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-3">

                          <label
                            className="
                              cursor-pointer
                              text-xs
                              uppercase
                              tracking-[0.12em]
                              text-white/40
                              transition-colors
                              hover:text-accent
                            "
                          >
                            Replace Image

                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>

                          <button
                            type="button"
                            onClick={removeSelectedImage}
                            className="
                              text-xs
                              uppercase
                              tracking-[0.12em]
                              text-red-400/50
                              transition-colors
                              hover:text-red-400
                            "
                          >
                            Remove
                          </button>

                        </div>

                      </div>
                    ) : (
                      <label
                        className="
                          flex
                          min-h-[220px]
                          cursor-pointer
                          flex-col
                          items-center
                          justify-center
                          px-6
                          text-center
                          transition-colors
                          hover:bg-white/[0.02]
                        "
                      >

                        <div
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            border
                            border-white/[0.10]
                            text-xl
                            text-white/30
                          "
                        >
                          ↑
                        </div>

                        <p className="mt-5 text-sm font-medium text-white/60">
                          Upload Project Image
                        </p>

                        <p className="mt-2 text-xs text-white/25">
                          PNG, JPG, or WEBP · Maximum 5 MB
                        </p>

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleImageChange}
                          className="hidden"
                        />

                      </label>
                    )}

                  </div>

                </Field>

                {/* Display Order */}
                <Field label="Display Order">
                  <input
                    name="display_order"
                    type="number"
                    value={form.display_order}
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
                      ? "Uploading & Saving..."
                      : editingId
                        ? "Save Changes"
                        : "Add Project"}
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