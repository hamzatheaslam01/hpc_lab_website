import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const emptyForm = {
  headline: "",
  description: "",
  image_url: "",
  link: "",
  published: true,
  display_order: 0,
};

export default function AdminNews() {
  const [news, setNews] = useState([]);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  /* =========================================================
     LOAD DATA
  ========================================================= */

  async function loadData() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("display_order", {
        ascending: true,
      })
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Failed to load news:", error);
      setError(error.message);
    }

    setNews(data || []);
    setLoading(false);
  }

  /* =========================================================
     FORM
  ========================================================= */

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);

    setSelectedImage(null);
    setImagePreview("");

    setShowForm(true);
    setError("");
  }

  function openEditForm(item) {
    setEditingId(item.id);

    setForm({
      headline: item.headline || "",
      description: item.description || "",
      image_url: item.image_url || "",
      link: item.link || "",
      published:
        item.published === undefined
          ? true
          : item.published,
      display_order: item.display_order || 0,
    });

    setSelectedImage(null);
    setImagePreview(item.image_url || "");

    setShowForm(true);
    setError("");
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);

    setForm(emptyForm);

    setSelectedImage(null);
    setImagePreview("");
  }

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  /* =========================================================
     IMAGE
  ========================================================= */

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

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

    const extension =
      file.name.split(".").pop()?.toLowerCase() ||
      "jpg";

    const fileName =
      `${crypto.randomUUID()}.${extension}`;

    const filePath = `news/${fileName}`;

    const { error: uploadError } =
      await supabase.storage
        .from("news-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } =
      supabase.storage
        .from("news-images")
        .getPublicUrl(filePath);

    return data.publicUrl;
  }

  /* =========================================================
     SAVE
  ========================================================= */

  async function handleSave(event) {
    event.preventDefault();

    if (!form.headline.trim()) {
      setError("Headline is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    if (!form.image_url && !selectedImage) {
      setError("Please upload a news image.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const imageUrl =
        await uploadImage(selectedImage);

      const payload = {
        headline: form.headline.trim(),

        description:
          form.description.trim(),

        image_url: imageUrl,

        link:
          form.link.trim() || null,

        published: form.published,

        display_order:
          Number(form.display_order) || 0,
      };

      let result;

      if (editingId) {
        result = await supabase
          .from("news")
          .update(payload)
          .eq("id", editingId);
      } else {
        result = await supabase
          .from("news")
          .insert(payload);
      }

      if (result.error) {
        throw new Error(result.error.message);
      }

      await loadData();
      closeForm();
    } catch (error) {
      console.error(
        "Failed to save news:",
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
      "Are you sure you want to delete this news item?"
    );

    if (!confirmed) return;

    setError("");

    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setNews((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="section-atmosphere flex min-h-screen items-center justify-center text-white">
        <p className="label-mono text-white/40">
          Loading news...
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
              News
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
            + Add News
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

        {news.length === 0 ? (

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
              No news yet
            </p>

            <p className="mt-3 text-sm text-white/40">
              Add your first news item above.
            </p>
          </div>

        ) : (

          <div className="grid gap-3">

            {news.map((item) => (

              <article
                key={item.id}
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

                  {/* Image */}

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
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.headline}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    )}
                  </div>

                  {/* Info */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap gap-3">

                      {!item.published && (
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
                        mt-2
                        text-xl
                        font-semibold
                        text-white
                        md:text-2xl
                      "
                    >
                      {item.headline}
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
                      {item.description}
                    </p>

                    {item.link && (
                      <p className="mt-3 text-xs text-white/20">
                        External link attached
                      </p>
                    )}

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
                        openEditForm(item)
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
                        handleDelete(item.id)
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

              {/* Header */}

              <div className="flex justify-between">

                <div>

                  <p className="label-mono text-accent">
                    {editingId
                      ? "Edit News"
                      : "New News"}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    {editingId
                      ? "Update news"
                      : "Add news"}
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  className="
                    text-2xl
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

                {/* Headline */}

                <Field
                  label="Headline"
                  required
                >
                  <input
                    name="headline"
                    value={form.headline}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="News headline"
                  />
                </Field>


                {/* Description */}

                <Field
                  label="Description"
                  required
                >
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    required
                    className={inputClass}
                    placeholder="Short description"
                  />
                </Field>


                {/* Link */}

                <Field label="Link">

                  <input
                    name="link"
                    type="url"
                    value={form.link}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="https://..."
                  />

                  <p className="mt-2 text-xs text-white/25">
                    Optional. Leave empty if this news
                    item doesn't have an external page.
                  </p>

                </Field>


                {/* Image */}

                <Field
                  label="News Image"
                  required
                >

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

                        <div
                          className="
                            relative
                            aspect-video
                            w-full
                            overflow-hidden
                          "
                        >

                          <img
                            src={imagePreview}
                            alt="News preview"
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-0
                              bg-gradient-to-t
                              from-black/50
                              to-transparent
                            "
                          />

                        </div>

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            border-t
                            border-white/[0.08]
                            px-4
                            py-3
                          "
                        >

                          <label
                            className="
                              cursor-pointer
                              text-xs
                              uppercase
                              tracking-[0.12em]
                              text-white/40
                              hover:text-accent
                            "
                          >
                            Replace Image

                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={
                                handleImageChange
                              }
                              className="hidden"
                            />

                          </label>

                          <button
                            type="button"
                            onClick={
                              removeSelectedImage
                            }
                            className="
                              text-xs
                              uppercase
                              tracking-[0.12em]
                              text-red-400/50
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
                          Upload News Image
                        </p>

                        <p className="mt-2 text-xs text-white/25">
                          PNG, JPG, or WEBP · Maximum 5 MB
                        </p>

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={
                            handleImageChange
                          }
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
                    checked={
                      form.published
                    }
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

                <div
                  className="
                    flex
                    justify-end
                    gap-3
                    pt-4
                  "
                >

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
                      ? "Uploading & Saving..."
                      : editingId
                        ? "Save Changes"
                        : "Add News"}
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
   FIELD
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