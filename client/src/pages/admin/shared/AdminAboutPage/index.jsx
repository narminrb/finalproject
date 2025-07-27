import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import Trash from "../../../../assets/trash.svg";
import Open from "../../../../assets/open.svg";
import {
getAboutUs,
  createAboutPages,
  updateAboutPages,
  deleteAboutPages,
} from "../../../../api/aboutus";

const AdminAboutPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pages, setPages] = useState([]);
  const [editedPage, setEditedPage] = useState({
    id: null,
    name: "",
    description: "",
    description2: "",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const response = await getAboutUs();
      setPages(response.abouts || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setPages([]);
    }
  };

  const openModal = (page = null) => {
    if (page) {
      setEditedPage({
        id: page.id,
        name: page.name,
        description: page.description,
        description2: page.description2 || "",
        image: null,
        imagePreview: page.image,
      });
      setIsEditing(true);
    } else {
      setEditedPage({
        id: null,
        name: "",
        description: "",
        description2: "",
        image: null,
        imagePreview: "",
      });
      setIsEditing(false);
    }
    setModalOpen(true);
  };

  const resetForm = () => {
    setModalOpen(false);
    setEditedPage({
      id: null,
      name: "",
      description: "",
      description2: "",
      image: null,
      imagePreview: "",
    });
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedPage((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;
    try {
      await deleteAboutPages(id);
      setPages((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Error while deleting.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, description, description2, image } = editedPage;

    if (!name || !description) {
      alert("Name and description are required.");
      return;
    }
    if (!isEditing && !image) {
      alert("An image is required for a new page.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (description2) formData.append("description2", description2);
      if (image) formData.append("image", image);

      if (isEditing) {
        await updateAboutPages(id, formData);
      } else {
        await createAboutPages(formData);
      }

      await loadPages();
      resetForm();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      alert("Error while saving.");
    }
  };

  return (
    <div className="p-8 mx-auto relative">
      {modalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-x-hidden"
          onClick={resetForm}
          style={{ overflowY: "auto" }}
        >
          <div
            className={clsx(styles.modal)}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={resetForm}
              aria-label="Close modal"
              type="button"
            >
              &times;
            </button>

            <div className={clsx(styles.cardname)}>
              {isEditing ? "Edit About Page" : "Add About Page"}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 w-full max-w-lg mx-auto text-black"
            >
              <input
                type="text"
                placeholder="Name"
                value={editedPage.name}
                onChange={(e) =>
                  setEditedPage((prev) => ({ ...prev, name: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <textarea
                placeholder="Description"
                value={editedPage.description}
                onChange={(e) =>
                  setEditedPage((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={clsx(styles.modalinput)}
              />
              <textarea
                placeholder="Second Description"
                value={editedPage.description2}
                onChange={(e) =>
                  setEditedPage((prev) => ({
                    ...prev,
                    description2: e.target.value,
                  }))
                }
                className={clsx(styles.modalinput)}
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={clsx(styles.modalinput)}
              />

              {editedPage.imagePreview && (
                <div className="mt-2">
                  <img
                    src={
                      editedPage.imagePreview.startsWith("blob:")
                        ? editedPage.imagePreview
                        : `http://localhost:3000/${editedPage.imagePreview.replace(
                            /\\/g,
                            "/"
                          )}`
                    }
                    alt="Preview"
                    className="w-28 h-28 object-cover rounded"
                  />
                </div>
              )}

              <button className={clsx(styles.modalbtn)} type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={clsx(styles.card)} style={{ position: "relative" }}>
        <table className="w-full table-auto border-collapse">
          <tbody>
            <tr>
              <td
                className={clsx(
                  styles.cardname,
                  "flex justify-between items-center"
                )}
              >
                About Page
                <button
                  className={clsx(styles.cardopen)}
                  onClick={() => openModal()}
                  type="button"
                >
                  <img src={Open} alt="Open modal" />
                </button>
              </td>
            </tr>
            {pages.map((page) => (
              <tr key={page.id}>
                <td
                  className={clsx(
                    styles.cardrow,
                    "flex justify-between items-center"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/${page.image.replace(/\\/g, "/")}`}
                      alt={page.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-black">{page.name}</p>
                      <p className="text-sm">{page.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      className={clsx(styles.cardedit)}
                      onClick={() => openModal(page)}
                      type="button"
                      aria-label="Edit"
                    >
                      <img src={Edit} alt="edit icon" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(page.id)}
                      type="button"
                      aria-label="Delete"
                    >
                      <img src={Trash} alt="delete icon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAboutPage;
