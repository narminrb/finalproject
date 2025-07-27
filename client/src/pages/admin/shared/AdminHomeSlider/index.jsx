import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import Trash from "../../../../assets/trash.svg";
import Open from "../../../../assets/open.svg";
import {
  getHeaderSlides,
  createHomeHeaderSlider,
  updateHomeHeaderSlider,
  deleteHomeHeaderSlider,
} from "../../../../api/headerSlides";

const AdminHomeHeaderSlider = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [slides, setSlides] = useState([]);
  const [editedSlide, setEditedSlide] = useState({
    _id: null,
    name: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  // Load slides from API
  const loadSlides = async () => {
    try {
      const response = await getHeaderSlides();
      const data = response || [];
      setSlides(data);
    } catch (err) {
      console.error("Load error:", err);
      setSlides([]);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  // Open modal to add or edit slide
  const openModal = (slide = null) => {
    if (slide) {
      setEditedSlide({
        _id: slide._id,
        name: slide.name,
        description: slide.description,
        image: null,
        imagePreview: slide.image
          ? `http://localhost:3000/${slide.image.replace(/\\/g, "/")}`
          : "",
      });
      setIsEditing(true);
    } else {
      setEditedSlide({
        _id: null,
        name: "",
        description: "",
        image: null,
        imagePreview: "",
      });
      setIsEditing(false);
    }
    setModalOpen(true);
  };

  // Reset modal form and close
  const resetForm = () => {
    setModalOpen(false);
    setEditedSlide({
      _id: null,
      name: "",
      description: "",
      image: null,
      imagePreview: "",
    });
    setIsEditing(false);
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedSlide((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  // Delete slide by _id
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;
    try {
      await deleteHomeHeaderSlider(_id);
      await loadSlides();
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting.");
    }
  };

  // Submit form for create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id, name, description, image } = editedSlide;

    if (!name || !description || (!image && !isEditing)) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (image) formData.append("image", image);

      if (isEditing) {
        await updateHomeHeaderSlider(_id, formData);
      } else {
        await createHomeHeaderSlider(formData);
      }

      await loadSlides();
      resetForm();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      alert("An error occurred while saving.");
    }
  };

  return (
    <div className="p-8 mx-auto">
      {modalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4"
          onClick={resetForm}
        >
          <div className={clsx(styles.modal)} onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={resetForm}
              type="button"
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className={clsx(styles.cardname)}>
              {isEditing ? "Edit Slide" : "Add New Slide"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-black">
              <input
                type="text"
                placeholder="Title"
                value={editedSlide.name}
                onChange={(e) =>
                  setEditedSlide((prev) => ({ ...prev, name: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <textarea
                placeholder="Description"
                value={editedSlide.description}
                onChange={(e) =>
                  setEditedSlide((prev) => ({ ...prev, description: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={clsx(styles.modalinput)}
              />

              {editedSlide.imagePreview && (
                <img
                  src={editedSlide.imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover mt-2 rounded"
                />
              )}

              <button className={clsx(styles.modalbtn)} type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={clsx(styles.card)}>
        <table className="w-full table-auto border-collapse">
          <tbody>
            <tr>
              <td className="flex justify-between items-center">
                <div className={clsx(styles.cardname)}>Main Slider</div>
                <button
                  onClick={() => openModal()}
                  className={clsx(styles.cardopen)}
                  type="button"
                  aria-label="Add new slide"
                >
                  <img src={Open} alt="Open" />
                </button>
              </td>
            </tr>

            {slides.map((slide) => (
              <tr key={slide._id}>
                <td
                  className={clsx(styles.cardrow, "flex justify-between items-center")}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/${slide.image.replace(/\\/g, "/")}`}
                      alt={slide.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-black">{slide.name}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => openModal(slide)}
                      className={clsx(styles.cardedit)}
                      type="button"
                      aria-label="Edit slide"
                    >
                      <img src={Edit} alt="Edit" />
                    </button>
                    <button
                      onClick={() => handleDelete(slide._id)}
                      className="text-red-600"
                      type="button"
                      aria-label="Delete slide"
                    >
                      <img src={Trash} alt="Delete" />
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

export default AdminHomeHeaderSlider;
