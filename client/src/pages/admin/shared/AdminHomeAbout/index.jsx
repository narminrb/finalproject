import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import Trash from "../../../../assets/trash.svg";
import Open from "../../../../assets/open.svg";
import { createHomeCategory, deleteHomeCategory, getHomeCategory, updateHomeCategory } from "../../../../api/homeCategory";

const AdminHomeCategory = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editedCard, setEditedCard] = useState({
    id: null,
    category: "",
    image: null, 
    imagePreview: "",
  });
  const [cards, setCards] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const data = await getHomeCategory();
      setCards(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const openModal = (card = null) => {
    if (card) {
      setEditedCard({
        id: card.id,
        category: card.category,
        image: null,
        imagePreview: card.image, 
      });
      setIsEditing(true);
    } else {
      setEditedCard({ id: null, category: "", image: null, imagePreview: "" });
      setIsEditing(false);
    }
    setModalOpen(true);
  };

  const resetForm = () => {
    setModalOpen(false);
    setEditedCard({ id: null, category: "", image: null, imagePreview: "" });
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmək istədiyinizə əminsiniz?")) return;
    try {
      await deleteHomeCategory(id);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Silinərkən xəta baş verdi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, category, image } = editedCard;
  
    if (!category.trim()) {
      alert("Kateqoriya adı boş ola bilməz.");
      return;
    }
  
    if (!isEditing && !image) {
      alert("Şəkil seçilməlidir.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      formData.append("category", category.trim());  
      if (image) {
        formData.append("image", image);           
      }
  
      if (isEditing) {
        await updateHomeCategory(id, formData);
      } else {
        await createHomeCategory(formData);
      }
  
      await loadCards();
      resetForm();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      alert("Əməliyyat zamanı xəta baş verdi.");
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedCard((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
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
              {isEditing ? "Kateqoriyanı redaktə et" : "Yeni kateqoriya əlavə et"}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto text-black">
              <input
                type="text"
                placeholder="Kateqoriya adı"
                className={clsx(styles.modalinput)}
                value={editedCard.category}
                onChange={(e) =>
                  setEditedCard((prev) => ({ ...prev, category: e.target.value }))
                }
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={clsx(styles.modalinput)}
              />
{editedCard.imagePreview && (
  <div className="mt-2">
    <img
      src={
        editedCard.imagePreview.startsWith("blob:")
          ? editedCard.imagePreview
          : `http://localhost:3000/${editedCard.imagePreview.replace(/\\/g, "/")}`
      }
      alt="preview"
      className="w-32 h-32 object-cover rounded"
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
                className={clsx(styles.cardname, "flex justify-between items-center")}
              >
                Categories
                      <button
                        className={clsx(styles.cardopen)}
                        onClick={() => openModal()}
                        type="button"
                      >
                      <img src={Open} alt="edit icon" />

                      </button>
                    </td>
                  </tr>
                        {cards.map((card) => (
                              <tr key={card.id}>
                                <td
                                  className={clsx(styles.cardrow, "flex justify-between items-center")}
                                >
                                  <div className="flex items-center gap-4">
                                  <img
                            src={`http://localhost:3000/${card.image.replace(/\\/g, "/")}`}
                            alt={card.category}
                            className="w-16 h-16 object-cover rounded"
                          />


                    <p className="text-black">{card.category}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      className={clsx(styles.cardedit)}
                      onClick={() => openModal(card)}
                      type="button"
                      aria-label="Redaktə et"
                    >
                      <img src={Edit} alt="edit icon" />

                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(card.id)}
                      type="button"
                      aria-label="Sil"
                    >
                      <img src={Trash} alt="edit icon" />

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

export default AdminHomeCategory;
