import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import Trash from "../../../../assets/trash.svg";
import Open from "../../../../assets/open.svg";
import {
  getAboutOffers,
  createAboutOffers,
  updateAboutOffers,
  deleteAboutOffers,
} from "../../../../api/aboutOffers";

const AdminOffers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [offers, setOffers] = useState([]);
  const [editedOffer, setEditedOffer] = useState({
    id: null,
    name: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const response = await getAboutOffers();
      setOffers(response.abouts || []); 
    } catch (err) {
      console.error("Fetch error:", err);
      setOffers([]);
    }
  };

  const openModal = (offer = null) => {
    if (offer) {
      setEditedOffer({
        id: offer.id,
        name: offer.name,
        description: offer.description,
        image: null,
        imagePreview: offer.image,
      });
      setIsEditing(true);
    } else {
      setEditedOffer({
        id: null,
        name: "",
        description: "",
        image: null,
        imagePreview: "",
      });
      setIsEditing(false);
    }
    setModalOpen(true);
  };

  const resetForm = () => {
    setModalOpen(false);
    setEditedOffer({
      id: null,
      name: "",
      description: "",
      image: null,
      imagePreview: "",
    });
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedOffer((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    try {
      await deleteAboutOffers(id);
      setOffers((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("An error occurred while deleting.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, description, image } = editedOffer;

    if (!name || !description) {
      alert("Name and description are required.");
      return;
    }
    if (!isEditing && !image) {
      alert("An image is required for a new offer.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (image) formData.append("image", image);

      if (isEditing) {
        await updateAboutOffers(id, formData);
      } else {
        await createAboutOffers(formData);
      }

      await loadOffers();
      resetForm();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      alert("An error occurred while saving.");
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
              {isEditing ? "Edit Offer" : "Add New Offer"}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 w-full max-w-lg mx-auto text-black"
            >
              <input
                type="text"
                placeholder="Name"
                value={editedOffer.name}
                onChange={(e) =>
                  setEditedOffer((prev) => ({ ...prev, name: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <textarea
                placeholder="Description"
                value={editedOffer.description}
                onChange={(e) =>
                  setEditedOffer((prev) => ({
                    ...prev,
                    description: e.target.value,
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

              {editedOffer.imagePreview && (
                <div className="mt-2">
                  <img
                    src={
                      editedOffer.imagePreview.startsWith("blob:")
                        ? editedOffer.imagePreview
                        : `http://localhost:3000/${editedOffer.imagePreview.replace(
                            /\\/g,
                            "/"
                          )}`
                    }
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded"
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
                About Offers
                <button
                  className={clsx(styles.cardopen)}
                  onClick={() => openModal()}
                  type="button"
                >
                  <img src={Open} alt="Open modal" />
                </button>
              </td>
            </tr>
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td
                  className={clsx(
                    styles.cardrow,
                    "flex justify-between items-center"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/${offer.image.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={offer.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="text-black">{offer.name}</p>
                      <p className="text-sm">{offer.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      className={clsx(styles.cardedit)}
                      onClick={() => openModal(offer)}
                      type="button"
                      aria-label="Edit"
                    >
                      <img src={Edit} alt="edit icon" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(offer.id)}
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

export default AdminOffers;
