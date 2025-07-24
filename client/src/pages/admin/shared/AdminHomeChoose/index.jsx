// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Edit from "../../../../assets/edit.svg";
// import Trash from "../../../../assets/trash.svg";
// import { getHomeChoose, updateHomeChoose, deleteHomeChoose, createHomeChoose } from "@/http/homechoose";
// import RichTextEditor from "../../RichTextEditor";

// const AdminHomeChoose = () => {
//   const [cards, setCards] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [content, setContent] = useState("");
  
//   const [form, setForm] = useState({
//     title: "",
//     paragraph: "",
//     image: { file: null, url: "" },
//   });

//   useEffect(() => {
//     getHomeChoose()
//       .then((res) => setCards(res.data || []))
//       .catch(console.error);
//   }, []);

//   const openModal = (card = null) => {
//     if (card) {
//       setEditId(card.id);
//       setForm({
//         title: card.title,
//         paragraph: card.paragraph,
//         image: {
//           file: null,
//           url: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${card.icon}`,
//         },
//       });
//       setContent(card.paragraph);
//     } else {
//       setEditId(null);
//       setForm({ title: "", paragraph: "", image: { file: null, url: "" } });
//       setContent("");
//     }
//     setModalOpen(true);
//   };

//   const resetForm = () => {
//     setModalOpen(false);
//     setEditId(null);
//     setForm({ title: "", paragraph: "", image: { file: null, url: "" } });
//     setContent("");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteHomeChoose(id);
//       const updated = await getHomeChoose();
//       setCards(updated.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();

//       const request = {
//         title: form.title.trim(),
//         paragraph: content.trim(),
//       };

//       formData.append(
//         "request",
//         new Blob([JSON.stringify(request)], { type: "application/json" })
//       );

//       if (form.image.file) {
//         formData.append("icon", form.image.file);
//       }

//       if (editId) {
//         await updateHomeChoose(editId, formData);
//       } else {
//         await createHomeChoose(formData);
//       }

//       const updated = await getHomeChoose();
//       setCards(updated.data);
//       resetForm();
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("Əməliyyat zamanı xəta baş verdi.");
//     }
//   };

//   return (
//     <div className="p-8 mx-auto">
//       {modalOpen && (
//         <div
//           className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-x-hidden"
//           onClick={resetForm}
//         >
//           <div className={clsx(styles.modal)} onClick={(e) => e.stopPropagation()}>
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
//               onClick={resetForm}
//               aria-label="Close modal"
//             >
//               &times;
//             </button>

//             <div className={clsx(styles.cardname)}>Kart {editId ? "redaktə et" : "əlavə et"}</div>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 value={form.title}
//                 onChange={(e) =>
//                   setForm((prev) => ({ ...prev, title: e.target.value }))
//                 }
//                 className={clsx(styles.modalinput)}
//                 placeholder="Başlıq"
//               />

//               <RichTextEditor value={content} onChange={setContent} />

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     setForm((prev) => ({
//                       ...prev,
//                       image: { file, url: URL.createObjectURL(file) },
//                     }));
//                   }
//                 }}
//                 className="border p-2 w-full"
//               />

//               {form.image.url && (
//                 <img
//                   src={form.image.url}
//                   alt="Preview"
//                   className="w-20 h-20 object-contain"
//                 />
//               )}

//               <button className={clsx(styles.modalbtn)} type="submit">
//                 Yadda saxla
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className={clsx(styles.card)}>
//         <table className="w-full table-auto border-collapse">
//           <tbody>
//             <tr>
//               <td className={clsx(styles.cardname)}>
//                 Niyə bizi seçməlisiniz?
//                 <button
//                   className={clsx(styles.cardopen)}
//                   onClick={() => openModal()}
//                 >
//                   <Open />
//                 </button>
//               </td>
//             </tr>

//             {cards.map((val) => (
//               <tr key={val.id}>
//                 <td className="w-15">
//                   <img
//                     src={`${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${val.icon}`}
//                     className="w-12 h-12 object-contain"
//                   />
//                 </td>

//                 <td className={clsx(styles.cardrow)}>
//                   <div className={clsx(styles.cardedit)} onClick={() => openModal(val)}>
//                     <Edit />
//                   </div>
//                   <div>
//                     <strong>{val.title}</strong>
//                     <div dangerouslySetInnerHTML={{ __html: val.paragraph }} />
//                   </div>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => handleDelete(val.id)}
//                     className="text-red-500 hover:underline"
//                   >
//                     <Trash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminHomeChoose;

import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import Trash from "../../../../assets/trash.svg";
import Open from "../../../../assets/open.svg";
import {
  getHomePopular,
  createHomePopular,
  updateHomePopular,
  deleteHomePopular,
} from "../../../../api/homePopular";

const AdminHomePopular = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState([]);
  const [editedCard, setEditedCard] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    painter: "",
    size: "",
    rating: "",
    category: "",
    inStock: true,
    sale: false,
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const response = await getHomePopular(); 
  
      const itemsArray = response.data || [];
      setCards(itemsArray);
    } catch (err) {
      console.error("Fetch error:", err);
      setCards([]); // fallback
    }
  };
  

  const openModal = (card = null) => {
    if (card) {
      setEditedCard({
        id: card.id,
        name: card.name,
        description: card.description,
        price: card.price,
        discountPrice: card.discountPrice || "",
        painter: card.painter,
        size: card.size,
        rating: card.rating || "",
        category: card.category?._id || card.category,
        inStock: card.inStock,
        sale: card.sale,
        image: null,
        imagePreview: card.image,
      });
      setIsEditing(true);
    } else {
      setEditedCard({
        id: null,
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        painter: "",
        size: "",
        rating: "",
        category: "",
        inStock: true,
        sale: false,
        image: null,
        imagePreview: "",
      });
      setIsEditing(false);
    }
    setModalOpen(true);
  };

  const resetForm = () => {
    setModalOpen(false);
    setEditedCard({
      id: null,
      name: "",
      description: "",
      price: "",
      discountPrice: "",
      painter: "",
      size: "",
      rating: "",
      category: "",
      inStock: true,
      sale: false,
      image: null,
      imagePreview: "",
    });
    setIsEditing(false);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Silmək istədiyinizə əminsiniz?")) return;
    try {
      await deleteHomePopular(id);
      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Silinərkən xəta baş verdi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      id,
      name,
      description,
      price,
      discountPrice,
      painter,
      size,
      rating,
      category,
      inStock,
      sale,
      image,
    } = editedCard;

    if (!name || !description || !price || !painter || !size || !category) {
      alert("Lazımi sahələr doldurulmalıdır.");
      return;
    }
    if (!isEditing && !image) {
      alert("Şəkil seçilməlidir.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      if (discountPrice) formData.append("discountPrice", discountPrice);
      formData.append("painter", painter);
      formData.append("size", size);
      formData.append("category", category);
      formData.append("rating", rating || 0);
      formData.append("inStock", inStock);
      formData.append("sale", sale);
      if (image) formData.append("image", image);

      if (isEditing) {
        await updateHomePopular(id, formData);
      } else {
        await createHomePopular(formData);
      }

      await loadCards();
      resetForm();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      alert("Əməliyyat zamanı xəta baş verdi.");
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
              {isEditing ? "Edit item" : "Add new item"}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 w-full max-w-lg mx-auto text-black"
            >
              <input
                type="text"
                placeholder="Adı"
                value={editedCard.name}
                onChange={(e) =>
                  setEditedCard((prev) => ({ ...prev, name: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <textarea
                placeholder="Təsviri"
                value={editedCard.description}
                onChange={(e) =>
                  setEditedCard((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="number"
                placeholder="Qiymət"
                value={editedCard.price}
                onChange={(e) =>
                  setEditedCard((prev) => ({ ...prev, price: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="number"
                placeholder="Endirimli Qiymət (optional)"
                value={editedCard.discountPrice}
                onChange={(e) =>
                  setEditedCard((prev) => ({
                    ...prev,
                    discountPrice: e.target.value,
                  }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="text"
                placeholder="Rəssam"
                value={editedCard.painter}
                onChange={(e) =>
                  setEditedCard((prev) => ({ ...prev, painter: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="text"
                placeholder="Ölçü"
                value={editedCard.size}
                onChange={(e) =>
                  setEditedCard((prev) => ({ ...prev, size: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="text"
                placeholder="Kateqoriya ID"
                value={editedCard.category}
                onChange={(e) =>
                  setEditedCard((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="text"
                placeholder="Reytinq"
                value={editedCard.rating}
                onChange={(e) =>
                  setEditedCard((prev) => ({ ...prev, rating: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <label className="block text-sm">
                <input
                  type="checkbox"
                  checked={editedCard.inStock}
                  onChange={(e) =>
                    setEditedCard((prev) => ({
                      ...prev,
                      inStock: e.target.checked,
                    }))
                  }
                />{" "}
                In Stock
              </label>
              <label className="block text-sm">
                <input
                  type="checkbox"
                  checked={editedCard.sale}
                  onChange={(e) =>
                    setEditedCard((prev) => ({
                      ...prev,
                      sale: e.target.checked,
                    }))
                  }
                />{" "}
                Out Of Stock
              </label>
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
                        : `http://localhost:3000/${editedCard.imagePreview.replace(
                            /\\/g,
                            "/"
                          )}`
                    }
                    alt="preview"
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
                Popular Items
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
                  className={clsx(
                    styles.cardrow,
                    "flex justify-between items-center"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/${card.image.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={card.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-black font-bold">{card.name}</p>
                      <p className="text-sm">{card.price} AZN</p>
                    </div>
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

export default AdminHomePopular;

