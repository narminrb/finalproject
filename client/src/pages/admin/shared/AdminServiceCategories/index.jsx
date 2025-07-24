// import { useEffect, useState } from "react";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Open from "../../../../assets/open.svg";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import Edit from "../../../../assets/edit.svg";
// import RichTextEditor from "../../RichTextEditor";
// import {getCards,createCard,deleteCard,getHeads,getSubs, updateCard } from "@/http/service";
// import AdminHeadCategories from "../AdminHeadCategories";
// // import {
// //   getCards,
// //   createCard,
// //   deleteCard,
// //   updateCard,
// //   getHeads,
// //   getSubs,
// //   createHead,
// //   createSub,
// //   deleteHead,
// //   deleteSub
// // } from "@/http/card"; // Adjust if path is different

// const AdminServiceCard = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cards, setCards] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [headCategories, setHeadCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const [formData, setFormData] = useState({
//     headCategory: "",
//     subCategory: "",
//     slug: "",
//     header: "",
//     description: "",
//     content: "",
//     mainImageFile: null,
//     mainImagePreview: null,
//     imageFiles: [],
//     imagePreviews: [],
//   });

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const [cardsRes, headsRes, subsRes] = await Promise.all([
//       getCards(),
//       getHeads(),
//       getSubs(),
//     ]);
//     setCards(cardsRes.data);
//     setHeadCategories(headsRes.data);
//     setSubCategories(subsRes.data);
//   };

//   const handleEdit = (card) => {
//     setIsEditing(true);
//     setEditId(card.id);
//     setFormData({
//       headCategory: card.headCategory,
//       subCategory: card.subCategory,
//       slug: card.slug,
//       header: card.header,
//       description: card.description,
//       content: card.content.contentWrite,
//       mainImageFile: null,
//       mainImagePreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${card.content.mainImage}`,
//       imageFiles: [],
//       imagePreviews: card.content.images.map((img) => ({
//         url: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`,
//         isExisting: true,
//       })),
//     });
//     setModalOpen(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       headCategory: "",
//       subCategory: "",
//       slug: "",
//       header: "",
//       description: "",
//       content: "",
//       mainImageFile: null,
//       mainImagePreview: null,
//       imageFiles: [],
//       imagePreviews: [],
//     });
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dto = {
//       headCategory: formData.headCategory,
//       subCategory: formData.subCategory,
//       slug: formData.slug,
//       header: formData.header,
//       description: formData.description,
//       content: {
//         contentWrite: formData.content,
//       },
//     };

//     const payload = new FormData();
//     payload.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));

//     if (formData.mainImageFile) payload.append("mainImage", formData.mainImageFile);
//     formData.imageFiles.forEach((img) => payload.append("images", img));

//     try {
//       isEditing ? await updateCard(editId, payload) : await createCard(payload);
//       await loadData();
//       resetForm();
//     } catch (err) {
//       console.error(err);
//       alert("Xəta baş verdi");
//     }
//   };

//   return (
//     <div className="p-8 mx-auto">
//       {modalOpen && (
//         <div
//           className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4"
//           onClick={resetForm}
//         >
//           <div
//             className={clsx(styles.modal)}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button onClick={resetForm} className="absolute top-2 right-2">×</button>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <select value={formData.headCategory} onChange={(e) => setFormData({ ...formData, headCategory: e.target.value })}>
//                 <option value="">Baş kateqoriya seçin</option>
//                 {headCategories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>{cat.name}</option>
//                 ))}
//               </select>

//               <select value={formData.subCategory} onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}>
//                 <option value="">Alt kateqoriya seçin</option>
//                 {subCategories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>{cat.name}</option>
//                 ))}
//               </select>

//               <input type="text" placeholder="Slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
//               <input type="text" placeholder="Başlıq" value={formData.header} onChange={(e) => setFormData({ ...formData, header: e.target.value })} />
//               <input type="text" placeholder="Təsvir" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
//               <RichTextEditor value={formData.content} onChange={(val) => setFormData({ ...formData, content: val })} />

//               <input type="file" accept="image/*" onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (!file) return;
//                 setFormData({ ...formData, mainImageFile: file, mainImagePreview: URL.createObjectURL(file) });
//               }} />
//               {formData.mainImagePreview && <img src={formData.mainImagePreview} className="w-20 h-20" />}

//               <input type="file" accept="image/*" multiple onChange={(e) => {
//                 const files = Array.from(e.target.files);
//                 setFormData((prev) => ({
//                   ...prev,
//                   imageFiles: [...prev.imageFiles, ...files],
//                   imagePreviews: [...prev.imagePreviews, ...files.map((file) => ({ url: URL.createObjectURL(file), isExisting: false, file }))],
//                 }));
//               }} />
//               <div className="flex gap-2 flex-wrap">
//                 {formData.imagePreviews.map(({ url }, i) => (
//                   <img key={i} src={url} className="w-12 h-12 object-cover" />
//                 ))}
//               </div>
//               <button type="submit">{isEditing ? "Yenilə" : "Yadda saxla"}</button>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className={clsx(styles.card)}>
//         <table className="w-full">
//           <tbody>
//             <tr>
//               <td className={clsx(styles.cardname)}>
//                 Servis Kartları
//                 <div
//                                   className={clsx(styles.cardsearch, "flex items-center gap-2")}
//                                 >
//                                   <input
//                                     type="text"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="border-b border-gray-400 px-0 w-full text-sm outline-none"
//                                     placeholder="Axtar..."
//                                   />
//                                   <SearchIcon className="w-5 h-5 text-gray-500" />
//                                 </div>
//                 <button className={clsx(styles.cardopen)} onClick={() => setModalOpen(true)}>
//                   <Open />
//                 </button>
//               </td>
//             </tr>
//             {cards
//               .filter((c) => c.header.toLowerCase().includes(searchTerm.toLowerCase()))
//               .map((card) => (
//                 <tr key={card.id}>
//                   <td>{card.header}</td>
//                   <td>
//                     <button onClick={() => handleEdit(card)}><Edit /></button>
//                     <button onClick={async () => { await deleteCard(card.id); loadData(); }}><Trash /></button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminServiceCard;


// import { useEffect, useState } from "react";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Open from "../../../../assets/open.svg";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import Edit from "../../../../assets/edit.svg";
// import RichTextEditor from "../../RichTextEditor";
// import { getCards, createCard, deleteCard, getHeads, getSubs, updateCard } from "@/http/service";

// const AdminServiceCard = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cards, setCards] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [headCategories, setHeadCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const [formData, setFormData] = useState({
//     headCategory: "",
//     subCategory: "",
//     header: "",
//     description: "",
//     content: "",
//     mainImageFile: null,
//     mainImagePreview: null,
//     imageFiles: [],
//     imagePreviews: [],
//   });

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [cardsRes, headsRes, subsRes] = await Promise.all([
//         getCards(),
//         getHeads(),
//         getSubs(),
//       ]);
//       setCards(cardsRes.data);
//       setHeadCategories(headsRes.data);
//       setSubCategories(subsRes.data);
//     } catch (error) {
//       console.error("Failed to load data:", error);
//       setCards([]);
//       setHeadCategories([]);
//       setSubCategories([]);
//     }
//   };

//   const handleEdit = (card) => {
//     setIsEditing(true);
//     setEditId(card.id);
//     setFormData({
//       headCategory: card.headCategory,
//       subCategory: card.subCategory,
//       header: card.header,
//       description: card.description,
//       content: card.content.contentWrite,
//       mainImageFile: null,
//       mainImagePreview: card.content.mainImage
//         ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${card.content.mainImage}`
//         : null,
//       imageFiles: [],
//       imagePreviews: card.content.images.map((img) => ({
//         url: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`,
//         isExisting: true,
//       })),
//     });
//     setModalOpen(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       headCategory: "",
//       subCategory: "",
//       header: "",
//       description: "",
//       content: "",
//       mainImageFile: null,
//       mainImagePreview: null,
//       imageFiles: [],
//       imagePreviews: [],
//     });
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!formData.header.trim() || !formData.headCategory.trim()) {
//       alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
//       return;
//     }
  
//     const cardDto = {
//       headCategory: formData.headCategory,
//       subCategory: formData.subCategory,
//       header: formData.header,
//       description: formData.description,
//       content: {
//         contentWrite: formData.content,
//       },
//     };
  
//     const payload = new FormData();
//     payload.append("cardDto", new Blob([JSON.stringify(cardDto)], { type: "application/json" }));
  
//     if (formData.mainImageFile) payload.append("mainImage", formData.mainImageFile);
//     formData.imageFiles.forEach((img) => payload.append("images", img));
  
//     try {
//       if (isEditing) {
//         await updateCard(editId, payload);
//       } else {
//         await createCard(payload);
//       }
//       await loadData();
//       resetForm();
//     } catch (err) {
//       console.error("Submit error response data:", err.response?.data || err.message);
//       alert("Xəta baş verdi");
//     }
//   };
  
//   return (
//     <div className="p-8 mx-auto">
//       {modalOpen && (
//         <div
//           className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4"
//           onClick={resetForm}
//         >
//           <div
//             className={clsx(styles.modal)}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button onClick={resetForm} className="absolute top-2 right-2 text-xl font-bold">×</button>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <select
//                 value={formData.headCategory}
//                 onChange={(e) => setFormData({ ...formData, headCategory: e.target.value })}
//                 required
//               >
//                 <option value="">Baş kateqoriya seçin</option>
//                 {headCategories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={formData.subCategory}
//                 onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
//               >
//                 <option value="">Alt kateqoriya seçin</option>
//                 {subCategories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="text"
//                 placeholder="Başlıq"
//                 value={formData.header}
//                 onChange={(e) => setFormData({ ...formData, header: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Təsvir"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               />
//               <RichTextEditor
//                 value={formData.content}
//                 onChange={(val) => setFormData({ ...formData, content: val })}
//               />

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (!file) return;
//                   setFormData({
//                     ...formData,
//                     mainImageFile: file,
//                     mainImagePreview: URL.createObjectURL(file),
//                   });
//                 }}
//               />
//               {formData.mainImagePreview && (
//                 <img
//                   src={formData.mainImagePreview}
//                   alt="Main preview"
//                   className="w-20 h-20 object-cover rounded"
//                 />
//               )}

//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={(e) => {
//                   const files = Array.from(e.target.files);
//                   setFormData((prev) => ({
//                     ...prev,
//                     imageFiles: [...prev.imageFiles, ...files],
//                     imagePreviews: [
//                       ...prev.imagePreviews,
//                       ...files.map((file) => ({
//                         url: URL.createObjectURL(file),
//                         isExisting: false,
//                         file,
//                       })),
//                     ],
//                   }));
//                 }}
//               />
//               <div className="flex gap-2 flex-wrap">
//                 {formData.imagePreviews.map(({ url }, i) => (
//                   <img
//                     key={i}
//                     src={url}
//                     alt={`preview-${i}`}
//                     className="w-12 h-12 object-cover rounded"
//                   />
//                 ))}
//               </div>

//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 {isEditing ? "Yenilə" : "Yadda saxla"}
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
//                 Servis Kartları
//                 <div
//                   className={clsx(styles.cardsearch, "flex items-center gap-2")}
//                 >
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="border-b border-gray-400 px-0 w-full text-sm outline-none"
//                     placeholder="Axtar..."
//                   />
//                   <SearchIcon className="w-5 h-5 text-gray-500" />
//                 </div>

//                 <button
//                   className={clsx(styles.cardopen)}
//                   onClick={() => {
//                     resetForm();
//                     setModalOpen(true);
//                   }}
//                 >
//                   <Open />
//                 </button>
//               </td>
//             </tr>

//             {cards
//               .filter((c) =>
//                 c.header?.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((card) => (
//                 <tr key={card.id}>
//                   <td>{card.header}</td>
//                   <td>
//                     <button onClick={() => handleEdit(card)}>
//                       <Edit />
//                     </button>
//                     <button
//                       onClick={async () => {
//                         if (window.confirm("Silinsin?")) {
//                           await deleteCard(card.id);
//                           loadData();
//                         }
//                       }}
//                     >
//                       <Trash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminServiceCard;

// import { useEffect, useState } from "react";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Open from "../../../../assets/open.svg";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import Edit from "../../../../assets/edit.svg";
// import RichTextEditor from "../../RichTextEditor";
// import {
//   getCards,
//   createCard,
//   deleteCard,
//   getHeads,
//   getSubs,
//   updateCard,
// } from "@/http/service";

// const AdminServiceCard = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cards, setCards] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [headCategories, setHeadCategories] = useState([]);
//   const [allSubCategories, setAllSubCategories] = useState([]);
//   const [filteredSubCategories, setFilteredSubCategories] = useState([]);

//   const [formData, setFormData] = useState({
//     headCategory: "",
//     subCategory: "",
//     header: "",
//     description: "",
//     content: "",
//     mainImageFile: null,
//     mainImagePreview: null,
//     imageFiles: [],
//     imagePreviews: [],
//   });

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [cardsRes, headsRes, subsRes] = await Promise.all([
//         getCards(),
//         getHeads(),
//         getSubs(),
//       ]);
//       setCards(cardsRes.data);
//       setHeadCategories(headsRes.data);
//       setAllSubCategories(subsRes.data);
//     } catch (error) {
//       console.error("Failed to load data:", error);
//       setCards([]);
//       setHeadCategories([]);
//       setAllSubCategories([]);
//     }
//   };

//   const handleEdit = (card) => {
//     const filteredSubs = allSubCategories.filter(
//       (sub) => sub.headCategory === card.headCategory
//     );

//     setFilteredSubCategories(filteredSubs);
//     setIsEditing(true);
//     setEditId(card.id);
//     setFormData({
//       headCategory: card.headCategory,
//       subCategory: card.subCategory,
//       header: card.header,
//       description: card.description,
//       content: card.content.contentWrite,
//       mainImageFile: null,
//       mainImagePreview: card.content.mainImage
//         ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${card.content.mainImage}`
//         : null,
//       imageFiles: [],
//       imagePreviews: card.content.images.map((img) => ({
//         url: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`,
//         isExisting: true,
//       })),
//     });
//     setModalOpen(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       headCategory: "",
//       subCategory: "",
//       header: "",
//       description: "",
//       content: "",
//       mainImageFile: null,
//       mainImagePreview: null,
//       imageFiles: [],
//       imagePreviews: [],
//     });
//     setFilteredSubCategories([]);
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.header.trim() || !formData.headCategory.trim()) {
//       alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
//       return;
//     }

//     const cardDto = {
//       headCategory: formData.headCategory,
//       subCategory: formData.subCategory,
//       header: formData.header,
//       description: formData.description,
//       content: {
//         contentWrite: formData.content,
//       },
//     };

//     const payload = new FormData();
//     payload.append(
//       "cardDto",
//       new Blob([JSON.stringify(cardDto)], { type: "application/json" })
//     );

//     if (formData.mainImageFile)
//       payload.append("mainImage", formData.mainImageFile);
//     formData.imageFiles.forEach((img) => payload.append("images", img));

//     try {
//       if (isEditing) {
//         await updateCard(editId, payload);
//       } else {
//         await createCard(payload);
//       }
//       await loadData();
//       resetForm();
//     } catch (err) {
//       console.error("Submit error:", err.response?.data || err.message);
//       alert("Xəta baş verdi");
//     }
//   };

//   const handleHeadCategoryChange = (value) => {
//     const filteredSubs = allSubCategories.filter(
//       (sub) => sub.headCategory === value
//     );
//     setFilteredSubCategories(filteredSubs);
//     setFormData({ ...formData, headCategory: value, subCategory: "" });
//   };

//   return (
//     <div className="p-8 mx-auto">
//       {modalOpen && (
//         <div
//           className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4"
//           onClick={resetForm}
//         >
//           <div
//             className={clsx(styles.modal)}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button onClick={resetForm} className="absolute top-2 right-2 text-xl font-bold">
//               ×
//             </button>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <select
//                 value={formData.headCategory}
//                 onChange={(e) => handleHeadCategoryChange(e.target.value)}
//                 required
//               >
//                 <option value="">Baş kateqoriya seçin</option>
//                 {headCategories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={formData.subCategory}
//                 onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
//               >
//                 <option value="">Alt kateqoriya seçin</option>
//                 {filteredSubCategories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="text"
//                 placeholder="Başlıq"
//                 value={formData.header}
//                 onChange={(e) => setFormData({ ...formData, header: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Təsvir"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               />
//               <RichTextEditor
//                 value={formData.content}
//                 onChange={(val) => setFormData({ ...formData, content: val })}
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (!file) return;
//                   setFormData({
//                     ...formData,
//                     mainImageFile: file,
//                     mainImagePreview: URL.createObjectURL(file),
//                   });
//                 }}
//               />
//               {formData.mainImagePreview && (
//                 <img
//                   src={formData.mainImagePreview}
//                   alt="Main preview"
//                   className="w-20 h-20 object-cover rounded"
//                 />
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={(e) => {
//                   const files = Array.from(e.target.files);
//                   setFormData((prev) => ({
//                     ...prev,
//                     imageFiles: [...prev.imageFiles, ...files],
//                     imagePreviews: [
//                       ...prev.imagePreviews,
//                       ...files.map((file) => ({
//                         url: URL.createObjectURL(file),
//                         isExisting: false,
//                         file,
//                       })),
//                     ],
//                   }));
//                 }}
//               />
//               <div className="flex gap-2 flex-wrap">
//                 {formData.imagePreviews.map(({ url }, i) => (
//                   <img
//                     key={i}
//                     src={url}
//                     alt={`preview-${i}`}
//                     className="w-12 h-12 object-cover rounded"
//                   />
//                 ))}
//               </div>
//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//                 {isEditing ? "Yenilə" : "Yadda saxla"}
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
//                 Servis Kartları
//                 <div className={clsx(styles.cardsearch, "flex items-center gap-2")}>
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="border-b border-gray-400 px-0 w-full text-sm outline-none"
//                     placeholder="Axtar..."
//                   />
//                   <SearchIcon className="w-5 h-5 text-gray-500" />
//                 </div>
//                 <button
//                   className={clsx(styles.cardopen)}
//                   onClick={() => {
//                     resetForm();
//                     setModalOpen(true);
//                   }}
//                 >
//                   <Open />
//                 </button>
//               </td>
//             </tr>
//             {cards
//               .filter((c) =>
//                 c.header?.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((card) => (
//                 <tr key={card.id}>
//                   <td>{card.header}</td>
//                   <td>
//                     <button onClick={() => handleEdit(card)}>
//                       <Edit />
//                     </button>
//                     <button
//                       onClick={async () => {
//                         if (window.confirm("Silinsin?")) {
//                           await deleteCard(card.id);
//                           loadData();
//                         }
//                       }}
//                     >
//                       <Trash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminServiceCard;


// import { useEffect, useState, useRef } from "react";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Open from "../../../../assets/open.svg";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import Edit from "../../../../assets/edit.svg";
// import RichTextEditor from "../../RichTextEditor";
// import {
//   getCards,
//   createCard,
//   deleteCard,
//   getHeads,
//   getSubs,
//   updateCard,
// } from "@/http/service";

// const AdminServiceCard = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cards, setCards] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [headCategories, setHeadCategories] = useState([]);
//   const [allSubCategories, setAllSubCategories] = useState([]);
//   const [filteredSubCategories, setFilteredSubCategories] = useState([]);

//   const [formData, setFormData] = useState({
//     headCategory: "",
//     subCategory: "",
//     header: "",
//     description: "",
//     content: "",
//     mainImageFile: null,
//     mainImagePreview: null,
//     imageFiles: [],
//     imagePreviews: [],
//     existingImages: [],
//   });

//   const formRef = useRef();

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [cardsRes, headsRes, subsRes] = await Promise.all([
//         getCards(),
//         getHeads(),
//         getSubs(),
//       ]);
//       setCards(cardsRes.data);
//       setHeadCategories(headsRes.data);
//       setAllSubCategories(subsRes.data);
//     } catch (error) {
//       console.error("Failed to load data:", error);
//     }
//   };

//   const handleEdit = (card) => {
//     const filteredSubs = allSubCategories.filter(
//       (sub) => sub.headCategory === card.headCategory
//     );

//     setFilteredSubCategories(filteredSubs);
//     setIsEditing(true);
//     setEditId(card.id);
//     setFormData({
//       headCategory: card.headCategory,
//       subCategory: card.subCategory,
//       header: card.header,
//       description: card.description,
//       content: card.content.contentWrite,
//       mainImageFile: null,
//       mainImagePreview: card.content.mainImage
//         ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${card.content.mainImage}`
//         : null,
//       imageFiles: [],
//       imagePreviews: card.content.images.map((img) => ({
//         url: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`,
//         isExisting: true,
//       })),
//       existingImages: card.images.map((url) => url.split("/").pop()),
//     });
//     setModalOpen(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       headCategory: "",
//       subCategory: "",
//       header: "",
//       description: "",
//       content: "",
//       mainImageFile: null,
//       mainImagePreview: null,
//       imageFiles: [],
//       imagePreviews: [],
//       existingImages: [],
//     });
//     setFilteredSubCategories([]);
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };
//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!formData.header.trim() || !formData.headCategory.trim()) {
//   //     alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
//   //     return;
//   //   }

//   //   const cardDto = {
//   //     headCategory: formData.headCategory,
//   //     subCategory: formData.subCategory,
//   //     header: formData.header,
//   //     description: formData.description,
//   //     content: {
//   //       contentWrite: formData.content,
//   //     },
//   //   };

//   //   const payload = new FormData();
//   //   payload.append(
//   //     "cardDto",
//   //     new Blob([JSON.stringify(cardDto)], { type: "application/json" })
//   //   );

//   //   if (formData.mainImageFile)
//   //     payload.append("mainImage", formData.mainImageFile);
//   //   formData.imageFiles.forEach((img) => payload.append("images", img));

//   //   try {
//   //     if (isEditing) {
//   //       await updateCard(editId, payload);
//   //     } else {
//   //       await createCard(payload);
//   //     }
//   //     await loadData();
//   //     resetForm();
//   //   } catch (err) {
//   //     console.error("Submit error:", err.response?.data || err.message);
//   //     alert("Xəta baş verdi");
//   //   }
//   // };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   if (!formData.header.trim() || !formData.headCategory.trim()) {
//   //     alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
//   //     return;
//   //   }
  
//   //   const existingImageNames = formData.imagePreviews
//   //     .filter((img) => img.isExisting)
//   //     .map((img) => img.url.split("/").pop());
  
//   //   const cardDto = {
//   //     headCategory: formData.headCategory,
//   //     subCategory: formData.subCategory,
//   //     header: formData.header,
//   //     description: formData.description,
//   //     content: {
//   //       contentWrite: formData.content,
//   //     },
//   //     images: existingImageNames,
//   //   };
  
//   //   const payload = new FormData();
//   //   payload.append(
//   //     "cardDto",
//   //     new Blob([JSON.stringify(cardDto)], { type: "application/json" })
//   //   );
  

//   //   if (formData.mainImageFile) {
//   //     payload.append("mainImage", formData.mainImageFile);
//   //   }

//   //   formData.imageFiles.forEach((file) => {
//   //     payload.append("images", file);
//   //   });
  
//   //   try {
//   //     if (isEditing) {
//   //       await updateCard(editId, payload);
//   //     } else {
//   //       await createCard(payload);
//   //     }
  
//   //     await loadData();
//   //     resetForm();
//   //   } catch (err) {
//   //     console.error("Submit error:", err.response?.data || err.message);
//   //     alert("Xəta baş verdi");
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!formData.header.trim() || !formData.headCategory.trim()) {
//       alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
//       return;
//     }
  
//     const existingImageNames = formData.imagePreviews
//       .filter((img) => img.isExisting)
//       .map((img) => img.url.split("/").pop());
  
//     const cardDto = {
//       headCategory: formData.headCategory,
//       subCategory: formData.subCategory,
//       header: formData.header,
//       description: formData.description,
//       content: {
//         contentWrite: formData.content,
//       },
//       images: existingImageNames,
//     };
  
//     const payload = new FormData();
//     payload.append(
//       "cardDto",
//       new Blob([JSON.stringify(cardDto)], { type: "application/json" })
//     );
  
//     // Handle main image logic like AdminSetem
//     if (formData.mainImageFile) {
//       payload.append("mainImage", formData.mainImageFile);
//     } else if (formData.mainImagePreview) {
//       try {
//         const existingImageName = formData.mainImagePreview.split("/").pop();
//         const response = await fetch(formData.mainImagePreview);
//         const blob = await response.blob();
//         const file = new File([blob], existingImageName || "mainImage.png", {
//           type: blob.type,
//         });
//         payload.append("mainImage", file);
//       } catch (err) {
//         console.error("Failed to reuse existing main image:", err);
//         alert("Main şəkil yüklənə bilmədi.");
//         return;
//       }
//     } else {
//       alert("Zəhmət olmasa əsas şəkil yükləyin.");
//       return;
//     }
  
//     formData.imageFiles.forEach((file) => {
//       payload.append("images", file);
//     });
  
//     try {
//       if (isEditing) {
//         await updateCard(editId, payload);
//       } else {
//         await createCard(payload);
//       }
  
//       await loadData();
//       resetForm();
//     } catch (err) {
//       console.error("Submit error:", err.response?.data || err.message);
//       alert("Xəta baş verdi");
//     }
//   };
  
  
//   const handleHeadCategoryChange = (value) => {
//     const filteredSubs = allSubCategories.filter(
//       (sub) => sub.headCategory === value
//     );
//     setFilteredSubCategories(filteredSubs);
//     setFormData({ ...formData, headCategory: value, subCategory: "" });
//   };

//   return (
//     <div className="p-8 mx-auto">
//       {modalOpen && (
//         <div
//           className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-y-auto"
//           onClick={resetForm}
//         >
//           <div
//             className={clsx(styles.modal)}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button onClick={resetForm} className="absolute top-2 right-2 text-xl font-bold">
//               ×
//             </button>
//             <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
//               <select
//                 value={formData.headCategory}
//                 onChange={(e) => handleHeadCategoryChange(e.target.value)}
//                 required
//               >
//                 <option value="">Baş kateqoriya seçin</option>
//                 {headCategories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={formData.subCategory}
//                 onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
//               >
//                 <option value="">Alt kateqoriya seçin</option>
//                 {filteredSubCategories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="text"
//                 placeholder="Başlıq"
//                 value={formData.header}
//                 onChange={(e) => setFormData({ ...formData, header: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Təsvir"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               />
//               <RichTextEditor
//                 value={formData.content}
//                 onChange={(val) => setFormData((prev) => ({ ...prev, content: val }))}
//               />
//                 <label className="block font-semibold">İkon yüklə (tək):</label>
//              <div className="border border-gray-300 p-3 my-3 rounded-md">

//              <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     handleInputChange("mainImageFile", file);
//                     handleInputChange("mainImagePreview", URL.createObjectURL(file));
//                   }
//                 }}
//               />
//                         {/* <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   handleInputChange("iconFile", file);
//                   handleInputChange("iconPreview", URL.createObjectURL(file));
//                 }
//               }}
//               className="w-full"
//             /> */}
//              </div>
//               {formData.mainImagePreview && (
//                 <img
//                   src={formData.mainImagePreview}
//                   alt="Main preview"
//                   className="w-20 h-20 object-cover rounded"
//                 />
//               )}
//              <label className="block font-semibold">Şəkillər yüklə (birdən çox):</label>
//              <div className="border border-gray-300 p-3 my-3 rounded-md">
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={(e) => {
//                   const files = Array.from(e.target.files);
//                   setFormData((prev) => ({
//                     ...prev,
//                     imageFiles: [...prev.imageFiles, ...files],
//                     imagePreviews: [
//                       ...prev.imagePreviews,
//                       ...files.map((file) => ({
//                         url: URL.createObjectURL(file),
//                         isExisting: false,
//                         file,
//                       })),
//                     ],
//                   }));
//                 }}
//                 className="w-full"
//               />
//               </div>
//               <div className="flex gap-2 flex-wrap">
//                 {formData.imagePreviews.map(({ url }, index) => (
//                   // <img
//                   //   key={i}
//                   //   src={url}
//                   //   alt={`preview-${i}`}
//                   //   className="w-12 h-12 object-cover rounded"
//                   // />
//                   <div key={index} className="relative">
//                   <img
//                     src={url}
//                     alt={`preview-${index}`}
//                     className="w-10 h-10 object-cover rounded"
//                   />
//                   <button
//                     type="button"
//                     className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                     onClick={() => {
//                       const updatedPreviews = [...formData.imagePreviews];
//                       const removed = updatedPreviews.splice(index, 1)[0];

//                       let updatedFiles = [...formData.imageFiles];
//                       let updatedExisting = [...formData.existingImages];

//                       if (removed.isExisting) {
//                         const filename = removed.url.split("/").pop();
//                         updatedExisting = updatedExisting.filter(
//                           (name) => name !== filename
//                         );
//                       } else {
//                         updatedFiles = updatedFiles.filter(
//                           (f) => f !== removed.file
//                         );
//                       }

//                       setFormData((prev) => ({
//                         ...prev,
//                         imagePreviews: updatedPreviews,
//                         imageFiles: updatedFiles,
//                         existingImages: updatedExisting,
//                       }));
//                     }}
//                   >
//                     ×
//                   </button>
//                 </div>
                  
//                 ))}
//               </div>
//               <button type="submit" className={clsx(styles.modalbtn)} >
//                 {isEditing ? "Yenilə" : "Yadda saxla"}
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
//                 Servis Kartları
//                 <div className={clsx(styles.cardsearch, "flex items-center gap-2")}>
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="border-b border-gray-400 px-0 w-full text-sm outline-none"
//                     placeholder="Axtar..."
//                   />
//                   <SearchIcon className="w-5 h-5 text-gray-500" />
//                 </div>
//                 <button
//                   className={clsx(styles.cardopen)}
//                   onClick={() => {
//                     resetForm();
//                     setModalOpen(true);
//                   }}
//                 >
//                   <Open />
//                 </button>
//               </td>
//             </tr>
//             {cards
//               .filter((c) =>
//                 c.header?.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((card) => (
//                 <tr key={card.id}>
//                   <td>{card.header}
//                   <span className="text-xs text-gray-500">
//                       ({card.headCategory || "No Head Category"})
//                     </span>

//                   </td>
                  
//                   <td>
//                     <button onClick={() => handleEdit(card)}>
//                       <Edit />
//                     </button>
//                     <button
//                       onClick={async () => {
//                         if (window.confirm("Silinsin?")) {
//                           await deleteCard(card.id);
//                           loadData();
//                         }
//                       }}
//                     >
//                       <Trash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminServiceCard;


import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Open from "../../../../assets/open.svg";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import Edit from "../../../../assets/edit.svg";
import RichTextEditor from "../../RichTextEditor";
import {
  getCards,
  createCard,
  deleteCard,
  getHeads,
  getSubs,
  updateCard,
} from "@/http/service";

const AdminServiceCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [headCategories, setHeadCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  // const [formData, setFormData] = useState({
  //   headCategory: "",
  //   subCategory: "",
  //   header: "",
  //   description: "",
  //   content: "",
  //   mainImageFile: null,
  //   mainImagePreview: null,
  //   imageFiles: [],
  //   imagePreviews: [],
  // });

  const [formData, setFormData] = useState({
    headCategory: "",
    subCategory: "",
    header: "",
    description: "",
    content: "",
    mainImageFile: null,
    mainImagePreview: null,
    imageFiles: [],
    imagePreviews: [],
    existingImages: [],  // add this here
  });
  

  const formRef = useRef();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [cardsRes, headsRes, subsRes] = await Promise.all([
        getCards(),
        getHeads(),
        getSubs(),
      ]);
      setCards(cardsRes.data);
      setHeadCategories(headsRes.data);
      setAllSubCategories(subsRes.data);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  // const handleEdit = (card) => {
  //   const filteredSubs = allSubCategories.filter(
  //     (sub) => sub.headCategory === card.headCategory
  //   );

  //   setFilteredSubCategories(filteredSubs);
  //   setIsEditing(true);
  //   setEditId(card.id);
  //   setFormData({
  //     headCategory: card.headCategory,
  //     subCategory: card.subCategory,
  //     header: card.header,
  //     description: card.description,
  //     content: card.content.contentWrite,
  //     mainImageFile: null,
  //     mainImagePreview: card.content.mainImage
  //       ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${card.content.mainImage}`
  //       : null,
  //     imageFiles: [],
  //     imagePreviews: card.content.images.map((img) => ({
  //       url: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`,
  //       isExisting: true,
  //     })),
  //   });
  //   setModalOpen(true);
  // };
  const handleEdit = (card) => {
    const filteredSubs = allSubCategories.filter(
      (sub) => sub.headCategory === card.headCategory
    );
  
    setFilteredSubCategories(filteredSubs);
    setIsEditing(true);
    setEditId(card.id);
    setFormData({
      headCategory: card.headCategory,
      subCategory: card.subCategory,
      header: card.header,
      description: card.description,
      content: card.content.contentWrite,
      mainImageFile: null,
      mainImagePreview: card.content.mainImage
        ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${card.content.mainImage}`
        : null,
      imageFiles: [],
      imagePreviews: card.content.images.map((img) => ({
        url: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`,
        isExisting: true,
      })),
      existingImages: card.content.images,  // add this line
    });
    setModalOpen(true);
  };
  
  const resetForm = () => {
    setFormData({
      headCategory: "",
      subCategory: "",
      header: "",
      description: "",
      content: "",
      mainImageFile: null,
      mainImagePreview: null,
      imageFiles: [],
      imagePreviews: [],
    });
    setFilteredSubCategories([]);
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.header.trim() || !formData.headCategory.trim()) {
  //     alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
  //     return;
  //   }

  //   const cardDto = {
  //     headCategory: formData.headCategory,
  //     subCategory: formData.subCategory,
  //     header: formData.header,
  //     description: formData.description,
  //     content: {
  //       contentWrite: formData.content,
  //     },
  //   };

  //   const payload = new FormData();
  //   payload.append(
  //     "cardDto",
  //     new Blob([JSON.stringify(cardDto)], { type: "application/json" })
  //   );

  //   if (formData.mainImageFile)
  //     payload.append("mainImage", formData.mainImageFile);
  //   formData.imageFiles.forEach((img) => payload.append("images", img));

  //   try {
  //     if (isEditing) {
  //       await updateCard(editId, payload);
  //     } else {
  //       await createCard(payload);
  //     }
  //     await loadData();
  //     resetForm();
  //   } catch (err) {
  //     console.error("Submit error:", err.response?.data || err.message);
  //     alert("Xəta baş verdi");
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!formData.header.trim() || !formData.headCategory.trim()) {
  //     alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
  //     return;
  //   }
  
  //   const existingImageNames = formData.imagePreviews
  //     .filter((img) => img.isExisting)
  //     .map((img) => img.url.split("/").pop());
  
  //   const cardDto = {
  //     headCategory: formData.headCategory,
  //     subCategory: formData.subCategory,
  //     header: formData.header,
  //     description: formData.description,
  //     content: {
  //       contentWrite: formData.content,
  //     },
  //     images: existingImageNames,
  //   };
  
  //   const payload = new FormData();
  //   payload.append(
  //     "cardDto",
  //     new Blob([JSON.stringify(cardDto)], { type: "application/json" })
  //   );
  

  //   if (formData.mainImageFile) {
  //     payload.append("mainImage", formData.mainImageFile);
  //   }

  //   formData.imageFiles.forEach((file) => {
  //     payload.append("images", file);
  //   });
  
  //   try {
  //     if (isEditing) {
  //       await updateCard(editId, payload);
  //     } else {
  //       await createCard(payload);
  //     }
  
  //     await loadData();
  //     resetForm();
  //   } catch (err) {
  //     console.error("Submit error:", err.response?.data || err.message);
  //     alert("Xəta baş verdi");
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!formData.header.trim() || !formData.headCategory.trim()) {
  //     alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
  //     return;
  //   }
  
  //   const existingImageNames = formData.imagePreviews
  //     .filter((img) => img.isExisting)
  //     .map((img) => img.url.split("/").pop());
  
  //   const cardDto = {
  //     headCategory: formData.headCategory,
  //     subCategory: formData.subCategory,
  //     header: formData.header,
  //     description: formData.description,
  //     content: {
  //       contentWrite: formData.content,
  //     },
  //     images: existingImageNames,
  //   };
  
  //   const payload = new FormData();
  //   payload.append(
  //     "cardDto",
  //     new Blob([JSON.stringify(cardDto)], { type: "application/json" })
  //   );
  
  //   // Handle main image logic like AdminSetem
  //   if (formData.mainImageFile) {
  //     payload.append("mainImage", formData.mainImageFile);
  //   } else if (formData.mainImagePreview) {
  //     try {
  //       const existingImageName = formData.mainImagePreview.split("/").pop();
  //       const response = await fetch(formData.mainImagePreview);
  //       const blob = await response.blob();
  //       const file = new File([blob], existingImageName || "mainImage.png", {
  //         type: blob.type,
  //       });
  //       payload.append("mainImage", file);
  //     } catch (err) {
  //       console.error("Failed to reuse existing main image:", err);
  //       alert("Main şəkil yüklənə bilmədi.");
  //       return;
  //     }
  //   } else {
  //     alert("Zəhmət olmasa əsas şəkil yükləyin.");
  //     return;
  //   }
  
  //   formData.imageFiles.forEach((file) => {
  //     payload.append("images", file);
  //   });
  
  //   try {
  //     if (isEditing) {
  //       await updateCard(editId, payload);
  //     } else {
  //       await createCard(payload);
  //     }
  
  //     await loadData();
  //     resetForm();
  //   } catch (err) {
  //     console.error("Submit error:", err.response?.data || err.message);
  //     alert("Xəta baş verdi");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.header.trim() || !formData.headCategory.trim()) {
      alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
      return;
    }
  
    const cardDto = {
      headCategory: formData.headCategory,
      subCategory: formData.subCategory,
      header: formData.header,
      description: formData.description,
      content: {
        contentWrite: formData.content,
      },
    };
  
    // Only in editing mode add existingImages to the DTO
    if (isEditing) {
      cardDto.images = [...formData.existingImages];
    }
  
    const payload = new FormData();
    payload.append(
      "cardDto",
      new Blob([JSON.stringify(cardDto)], { type: "application/json" })
    );
  
    if (formData.mainImageFile) {
      payload.append("mainImage", formData.mainImageFile);
    } else if (formData.mainImagePreview) {
      try {
        const existingImageName = formData.mainImagePreview.split("/").pop();
        const response = await fetch(formData.mainImagePreview);
        const blob = await response.blob();
        const file = new File([blob], existingImageName || "mainImage.png", {
          type: blob.type,
        });
        payload.append("mainImage", file);
      } catch (err) {
        console.error("Failed to reuse existing main image:", err);
        alert("Main şəkil yüklənə bilmədi.");
        return;
      }
    } else {
      alert("Zəhmət olmasa əsas şəkil yükləyin.");
      return;
    }
  
    formData.imageFiles.forEach((file) => {
      payload.append("images", file);
    });
  
    try {
      if (isEditing) {
        await updateCard(editId, payload);
      } else {
        await createCard(payload);
      }
  
      await loadData();
      resetForm();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      alert("Xəta baş verdi");
    }
  };
  
  
  const handleHeadCategoryChange = (value) => {
    const filteredSubs = allSubCategories.filter(
      (sub) => sub.headCategory === value
    );
    setFilteredSubCategories(filteredSubs);
    setFormData({ ...formData, headCategory: value, subCategory: "" });
  };

  return (
    <div className="p-8 mx-auto">
      {modalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-y-auto"
          onClick={resetForm}
        >
          <div
            className={clsx(styles.modal)}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={resetForm} className="absolute top-2 right-2 text-xl font-bold">
              ×
            </button>
            <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
              {/* Form Fields */}
              <select
                value={formData.headCategory}
                onChange={(e) => handleHeadCategoryChange(e.target.value)}
                required
              >
                <option value="">Baş kateqoriya seçin</option>
                {headCategories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={formData.subCategory}
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
              >
                <option value="">Alt kateqoriya seçin</option>
                {filteredSubCategories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Başlıq"
                value={formData.header}
                onChange={(e) => setFormData({ ...formData, header: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Təsvir"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <RichTextEditor
                value={formData.content}
                onChange={(val) => setFormData((prev) => ({ ...prev, content: val }))}
              />

<label className="block font-semibold">İkon yüklə (tək):</label>
             <div className="border border-gray-300 p-3 my-3 rounded-md">
             <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleInputChange("mainImageFile", file);
                    handleInputChange("mainImagePreview", URL.createObjectURL(file));
                  }
                }}
              />
                        {/* <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleInputChange("iconFile", file);
                  handleInputChange("iconPreview", URL.createObjectURL(file));
                }
              }}
              className="w-full"
            /> */}
             </div>
              {formData.mainImagePreview && (
                <img
                  src={formData.mainImagePreview}
                  alt="Main preview"
                  className="w-10 h-10 object-cover rounded"
                />
              )}
              <label className="block font-semibold">Şəkillər yüklə (birdən çox):</label>
             <div className="border border-gray-300 p-3 my-3 rounded-md">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setFormData((prev) => ({
                    ...prev,
                    imageFiles: [...prev.imageFiles, ...files],
                    imagePreviews: [
                      ...prev.imagePreviews,
                      ...files.map((file) => ({
                        url: URL.createObjectURL(file),
                        isExisting: false,
                        file,
                      })),
                    ],
                  }));
                }}
                className="w-full"
              />
              </div>
              {/* <div className="flex gap-2 flex-wrap">
                {formData.imagePreviews.map(({ url }, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`preview-${i}`}
                    className="w-12 h-12 object-cover rounded"
                  />
                ))}
              </div> */}
              <div className="flex gap-2 flex-wrap mt-2">
  {formData.imagePreviews.map(({ url, isExisting, file }, index) => (
    <div key={index} className="relative w-12 h-12 rounded overflow-hidden">
      <img
        src={url}
        alt={`preview-${index}`}
        className="w-10 h-10 object-cover rounded"
      />
      <button
        type="button"
        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
        onClick={() => {
          const updatedPreviews = [...formData.imagePreviews];
          const removed = updatedPreviews.splice(index, 1)[0];

          let updatedFiles = [...formData.imageFiles];
          let updatedExisting = [...formData.existingImages];

          if (removed.isExisting) {
            updatedExisting = updatedExisting.filter((name) => {
              // Remove matching filename from existingImages
              // The filenames in existingImages are just strings like "file.jpg"
              // Extract filename from url for matching:
              const filename = removed.url.split("/").pop();
              return name !== filename;
            });
          } else {
            updatedFiles = updatedFiles.filter((f) => f !== removed.file);
          }

          setFormData((prev) => ({
            ...prev,
            imagePreviews: updatedPreviews,
            imageFiles: updatedFiles,
            existingImages: updatedExisting,
          }));
        }}
        aria-label="Remove image"
      >
        ×
      </button>
    </div>
  ))}
</div>

              <button type="submit" className={clsx(styles.modalbtn)} >
                {isEditing ? "Yenilə" : "Yadda saxla"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={clsx(styles.card)}>
        <table className="w-full table-auto border-collapse">
          <tbody>
            <tr>
              <td className={clsx(styles.cardname)}>
                Servis Kartları
                <div className={clsx(styles.cardsearch, "flex items-center gap-2")}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-b border-gray-400 px-0 w-full text-sm outline-none"
                    placeholder="Axtar..."
                  />
                  <SearchIcon className="w-5 h-5 text-gray-500" />
                </div>
                <button
                  className={clsx(styles.cardopen)}
                  onClick={() => {
                    resetForm();
                    setModalOpen(true);
                  }}
                >
                  <Open />
                </button>
              </td>
            </tr>
            {cards
              .filter((c) =>
                c.header?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((card) => (
                <tr key={card.id}>
                  <td>{card.header}
                  <span className="text-xs text-gray-500">
                      ({card.headCategory || "No Head Category"})
                    </span>

                  </td>
                  
                  <td>
                    <button onClick={() => handleEdit(card)}>
                      <Edit />
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm("Silinsin?")) {
                          await deleteCard(card.id);
                          loadData();
                        }
                      }}
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminServiceCard;