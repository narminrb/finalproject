// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import Edit from "../../../../assets/edit.svg";
// import {
//   getSubs,
//   deleteSub,
//   updateSub,
//   createSub,
// } from "@/http/service"; // Adjust import path if needed

// const AdminSubCategories = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [headCategories, setHeadCategories] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [newHead, setNewHead] = useState({
//     name: "",
//     description: "",
//   });

//   useEffect(() => {
//     loadHeads();
//   }, []);

//   const loadHeads = async () => {
//     try {
//       const res = await getSubs();
//       const items = Array.isArray(res?.data) ? res.data : [];
//       setHeadCategories(items);
//     } catch (error) {
//       console.error("Failed to load head categories:", error);
//       setHeadCategories([]);
//     }
//   };

//   const resetForm = () => {
//     setNewHead({ name: "", description: "" });
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleEdit = (item) => {
//     setIsEditing(true);
//     setEditId(item.id);
//     setNewHead({
//       name: item.name || "",
//       description: item.description || "",
//     });
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Silinsin?")) return;
//     try {
//       await deleteSub(id);
//       setHeadCategories((prev) => prev.filter((h) => h.id !== id));
//     } catch (error) {
//       console.error("Failed to delete head category:", error);
//       alert("Silərkən xəta baş verdi.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newHead.name.trim()) {
//       alert("Adı daxil edin.");
//       return;
//     }

//     try {
//       const payload = {
//         name: newHead.name.trim(),
//         description: newHead.description.trim(),
//       };

//       if (isEditing) {
//         await updateSub(editId, payload);
//       } else {
//         await createSub(payload);
//       }

//       await loadHeads();
//       resetForm();
//     } catch (error) {
//       console.error("Failed to save head category:", error);
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
//           <div
//             className={clsx(styles.modal)}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
//               onClick={resetForm}
//               aria-label="Close modal"
//             >
//               &times;
//             </button>

//             <div className={clsx(styles.cardname)}>
//               {isEditing ? "Başlıq kateqoriyasını yenilə" : "Yeni başlıq kateqoriyası əlavə et"}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Ad"
//                 value={newHead.name}
//                 onChange={(e) =>
//                   setNewHead({ ...newHead, name: e.target.value })
//                 }
//                 className={clsx(styles.modalinput)}
//                 required
//               />

//               <input
//                 type="text"
//                 placeholder="Təsvir"
//                 value={newHead.description}
//                 onChange={(e) =>
//                   setNewHead({ ...newHead, description: e.target.value })
//                 }
//                 className={clsx(styles.modalinput)}
//               />

//               <button className={clsx(styles.modalbtn)} type="submit">
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
//                 Sub 
//                 <br/>
//                 Kateqoriyaları
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
//                     setIsEditing(false);
//                     setEditId(null);
//                     setModalOpen(true);
//                   }}
//                 >
//                   <Open />
//                 </button>
//               </td>
//             </tr>

//             {headCategories
//               .filter((val) =>
//                 val.name?.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((val) => (
//                 <tr key={val.id}>
//                   <td className={clsx(styles.cardrow)}>
//                     <div
//                       className={clsx(styles.cardedit)}
//                       onClick={() => handleEdit(val)}
//                     >
//                       <Edit />
//                     </div>
//                     {val.name}
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => handleDelete(val.id)}
//                       className="text-red-500 hover:underline"
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

// export default AdminSubCategories;



// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import Edit from "../../../../assets/edit.svg";
// import {
//   getSubs,
//   deleteSub,
//   updateSub,
//   createSub,
//   getHeads,
// } from "@/http/service";

// const AdminSubCategories = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [headCategories, setHeadCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [newSub, setNewSub] = useState({
//     name: "",
//     description: "",
//     headCategory: "",
//   });

//   useEffect(() => {
//     loadSubs();
//     loadHeads();
//   }, []);

//   const loadSubs = async () => {
//     try {
//       const res = await getSubs();
//       const items = Array.isArray(res?.data) ? res.data : [];
//       setSubCategories(items);
//     } catch (error) {
//       console.error("Failed to load sub categories:", error);
//       setSubCategories([]);
//     }
//   };

//   const loadHeads = async () => {
//     try {
//       const res = await getHeads();
//       setHeadCategories(res?.data || []);
//     } catch (error) {
//       console.error("Failed to load head categories:", error);
//     }
//   };

//   const resetForm = () => {
//     setNewSub({ name: "", description: "", headCategory: "" });
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleEdit = (item) => {
//     const selectedHead = headCategories.find(
//       (head) => head.slug === item.headCategorySlug
//     );

//     setIsEditing(true);
//     setEditId(item.id);
//     setNewSub({
//       name: item.name || "",
//       description: item.description || "",
//       headCategory: selectedHead || "",
//     });
//     setModalOpen(true);
//   };

//   const generateSlug = (text) =>
//     text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

//   const handleDelete = async (id) => {
//     try {
//       await deleteSub(id);
//       setSubCategories((prev) => prev.filter((h) => h.id !== id));
//     } catch (error) {
//       console.error("Failed to delete sub category:", error);
//       alert("Silərkən xəta baş verdi.");
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!newSub.name.trim() || !newSub.headCategory?.id) {
//   //     alert("Adı və kateqoriya seçin.");
//   //     return;
//   //   }

//   //   const slug = generateSlug(newSub.name.trim());

//   //   try {
//   //     const payload = {
//   //       name: newSub.name.trim(),
//   //       description: newSub.description.trim(),
//   //       slug,
//   //       headCategory: newSub.headCategory.name,
//   //       headCategorySlug: newSub.headCategory.slug,
//   //       ...(isEditing && { id: editId }),
//   //     };

//   //     if (isEditing) {
//   //       await updateSub(editId, payload);
//   //     } else {
//   //       await createSub(payload);
//   //     }

//   //     await loadSubs();
//   //     resetForm();
//   //   } catch (error) {
//   //     console.error("Failed to save sub category:", error);
//   //     alert("Əməliyyat zamanı xəta baş verdi.");
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!newSub.name.trim() || !newSub.headCategory?.id) {
//       alert("Adı və kateqoriya seçin.");
//       return;
//     }
  
//     try {
//       if (isEditing) {
//         // PUT expects JSON with { newName: "string" }
//         await updateSub(editId, { newName: newSub.name.trim() });
//       } else {
//         // POST expects JSON with { name: "string", headCategory: "string" }
//         await createSub({
//           name: newSub.name.trim(),
//           headCategory: newSub.headCategory.name,
//         });
//       }
  
//       await loadSubs();
//       resetForm();
//     } catch (error) {
//       console.error("Failed to save sub category:", error);
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
//           <div
//             className={clsx(styles.modal)}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
//               onClick={resetForm}
//               aria-label="Close modal"
//             >
//               &times;
//             </button>

//             <div className={clsx(styles.cardname)}>
//               {isEditing ? "Sub-kateqoriyanı yenilə" : "Yeni sub-kateqoriya əlavə et"}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Ad"
//                 value={newSub.name}
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, name: e.target.value })
//                 }
//                 className={clsx(styles.modalinput)}
//                 required
//               />

//               <select
//                 value={newSub.headCategory?.id || ""}
//                 onChange={(e) => {
//                   const selected = headCategories.find(
//                     (head) => head.id === Number(e.target.value)
//                   );
//                   setNewSub({
//                     ...newSub,
//                     headCategory: selected || "",
//                   });
//                 }}
//                 required
//                 className={clsx(styles.modalinput)}
//               >
//                 <option value="">Baş kateqoriya seçin</option>
//                 {headCategories.map((head) => (
//                   <option key={head.id} value={head.id}>
//                     {head.name}
//                   </option>
//                 ))}
//               </select>

//               <button className={clsx(styles.modalbtn)} type="submit">
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
//                 Sub <br /> Kateqoriyaları
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
//                     setIsEditing(false);
//                     setEditId(null);
//                     setModalOpen(true);
//                   }}
//                 >
//                   <Open />
//                 </button>
//               </td>
//             </tr>

//             {subCategories
//               .filter((val) =>
//                 val.name?.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((val) => (
//                 <tr key={val.id}>
//                   <td className={clsx(styles.cardrow)}>
//                     <div
//                       className={clsx(styles.cardedit)}
//                       onClick={() => handleEdit(val)}
//                     >
//                       <Edit />
//                     </div>
//                     {val.name} <br />
//                     <span className="text-xs text-gray-500">
//                       ({val.headCategory || "No Head Category"})
//                     </span>
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => handleDelete(val.id)}
//                       className="text-red-500 hover:underline"
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

// export default AdminSubCategories;


// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import Edit from "../../../../assets/edit.svg";
// import {
//   getSubs,
//   deleteSub,
//   updateSub,
//   createSub,
//   getHeads,
// } from "@/http/service";

// const AdminSubCategories = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [headCategories, setHeadCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [newSub, setNewSub] = useState({
//     name: "",
//     description: "",
//     headCategory: "",
//   });

//   useEffect(() => {
//     loadSubs();
//     loadHeads();
//   }, []);

//   const loadSubs = async () => {
//     try {
//       const res = await getSubs();
//       const items = Array.isArray(res?.data) ? res.data : [];
//       setSubCategories(items);
//     } catch (error) {
//       console.error("Failed to load sub categories:", error);
//       setSubCategories([]);
//     }
//   };

//   const loadHeads = async () => {
//     try {
//       const res = await getHeads();
//       setHeadCategories(res?.data || []);
//     } catch (error) {
//       console.error("Failed to load head categories:", error);
//     }
//   };

//   const resetForm = () => {
//     setNewSub({ name: "", description: "", headCategory: "" });
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleEdit = (item) => {
//     const selectedHead = headCategories.find(
//       (head) => head.slug === item.headCategorySlug
//     );

//     setIsEditing(true);
//     setEditId(item.id);
//     setNewSub({
//       name: item.name || "",
//       description: item.description || "",
//       headCategory: selectedHead || "",
//     });
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteSub(id);
//       setSubCategories((prev) => prev.filter((h) => h.id !== id));
//     } catch (error) {
//       console.error("Failed to delete sub category:", error);
//       alert("Silərkən xəta baş verdi.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!newSub.name.trim() || !newSub.headCategory?.name) {
//       alert("Adı və kateqoriya seçin.");
//       return;
//     }
  
//     try {
//       if (isEditing) {
//         await updateSub(editId, {
//           id: editId,
//           name: newSub.name.trim(),
//           headCategory: newSub.headCategory.name, // fix here
//         });
//       } else {
//         await createSub({
//           name: newSub.name.trim(),
//           headCategory: newSub.headCategory.name,
//         });
//       }
  
//       await loadSubs();
//       resetForm();
//     } catch (error) {
//       console.error("Failed to save sub category:", error);
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
//           <div
//             className={clsx(styles.modal)}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
//               onClick={resetForm}
//               aria-label="Close modal"
//             >
//               &times;
//             </button>

//             <div className={clsx(styles.cardname)}>
//               {isEditing
//                 ? "Sub-kateqoriyanı yenilə"
//                 : "Yeni sub-kateqoriya əlavə et"}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                       <input
//             type="text"
//             placeholder="Ad"
//             value={typeof newSub.name === "string" ? newSub.name : ""}
//             onChange={(e) =>
//               setNewSub({ ...newSub, name: e.target.value })
//             }
//             className={clsx(styles.modalinput)}
//             required
//           />


//               <select
//                 value={newSub.headCategory?.id || ""}
//                 onChange={(e) => {
//                   const selected = headCategories.find(
//                     (head) => head.id === Number(e.target.value)
//                   );
//                   setNewSub({
//                     ...newSub,
//                     headCategory: selected || "",
//                   });
//                 }}
//                 required
//                 className={clsx(styles.modalinput)}
//               >
//                 <option value="">Baş kateqoriya seçin</option>
//                 {headCategories.map((head) => (
//                   <option key={head.id} value={head.id}>
//                     {head.name}
//                   </option>
//                 ))}
//               </select>

//               <button className={clsx(styles.modalbtn)} type="submit">
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
//                 Sub <br /> Kateqoriyaları
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
//                     setIsEditing(false);
//                     setEditId(null);
//                     setModalOpen(true);
//                   }}
//                 >
//                   <Open />
//                 </button>
//               </td>
//             </tr>

//             {subCategories
//               .filter((val) =>
//                 val.name?.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((val) => (
//                 <tr key={val.id}>
//                   <td className={clsx(styles.cardrow)}>
//                     <div
//                       className={clsx(styles.cardedit)}
//                       onClick={() => handleEdit(val)}
//                     >
//                       <Edit />
//                     </div>
//                     {val.name} <br />
//                     <span className="text-xs text-gray-500">
//                       ({val.headCategory || "No Head Category"})
//                     </span>
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => handleDelete(val.id)}
//                       className="text-red-500 hover:underline"
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

// export default AdminSubCategories;


// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import Edit from "../../../../assets/edit.svg";
// import {
//   getSubs,
//   deleteSub,
//   updateSub,
//   createSub,
//   getHeads,
// } from "@/http/service";

// const AdminSubCategories = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [headCategories, setHeadCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [editName, setEditName] = useState("");

//   const [newSub, setNewSub] = useState({
//     name: "",
//     headCategory: "",
//   });

//   useEffect(() => {
//     loadSubs();
//     loadHeads();
//   }, []);

//   const loadSubs = async () => {
//     try {
//       const res = await getSubs();
//       const items = Array.isArray(res?.data) ? res.data : [];
//       setSubCategories(items);
//     } catch (error) {
//       console.error("Failed to load sub categories:", error);
//       setSubCategories([]);
//     }
//   };

//   const loadHeads = async () => {
//     try {
//       const res = await getHeads();
//       setHeadCategories(res?.data || []);
//     } catch (error) {
//       console.error("Failed to load head categories:", error);
//     }
//   };

//   const resetForm = () => {
//     setNewSub({ name: "", headCategory: "" });
//     setEditName("");
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleEdit = (item) => {
//     setIsEditing(true);
//     setEditId(item.id);
//     setEditName(item.name);
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteSub(id);
//       setSubCategories((prev) => prev.filter((h) => h.id !== id));
//     } catch (error) {
//       console.error("Failed to delete sub category:", error);
//       alert("Silərkən xəta baş verdi.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (isEditing) {
//         if (!editName.trim()) {
//           alert("Adı daxil edin.");
//           return;
//         }
//         await updateSub(editId, {
//           newName: editName.trim(),
//         });
//       } else {
//         if (!newSub.name.trim() || !newSub.headCategory.trim()) {
//           alert("Adı və baş kateqoriya seçin.");
//           return;
//         }
//         await createSub({
//           name: newSub.name.trim(),
//           headCategory: newSub.headCategory,
//         });
//       }

//       await loadSubs();
//       resetForm();
//     } catch (error) {
//       console.error("Failed to save sub category:", error);
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

//             <div className={clsx(styles.cardname)}>
//               {isEditing ? "Sub-kateqoriyanı yenilə" : "Yeni sub-kateqoriya əlavə et"}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Ad"
//                 value={isEditing ? editName : newSub.name}
//                 onChange={(e) =>
//                   isEditing
//                     ? setEditName(e.target.value)
//                     : setNewSub({ ...newSub, name: e.target.value })
//                 }
//                 className={clsx(styles.modalinput)}
//                 required
//               />

//               {!isEditing && (
//                 <select
//                   value={newSub.headCategory}
//                   onChange={(e) =>
//                     setNewSub({ ...newSub, headCategory: e.target.value })
//                   }
//                   required
//                   className={clsx(styles.modalinput)}
//                 >
//                   <option value="">Baş kateqoriya seçin</option>
//                   {headCategories.map((head) => (
//                     <option key={head.id} value={head.name}>
//                       {head.name}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               <button className={clsx(styles.modalbtn)} type="submit">
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
//                 Sub <br /> Kateqoriyaları
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
//                     setIsEditing(false);
//                     setEditId(null);
//                     setModalOpen(true);
//                   }}
//                 >
//                   <Open />
//                 </button>
//               </td>
//             </tr>

//             {subCategories
//               .filter((val) =>
//                 val.name?.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((val) => (
//                 <tr key={val.id}>
//                   <td className={clsx(styles.cardrow)}>
//                     <div
//                       className={clsx(styles.cardedit)}
//                       onClick={() => handleEdit(val)}
//                     >
//                       <Edit />
//                     </div>
//                     {val.name} <br />
//                     <span className="text-xs text-gray-500">
//                       ({val.headCategory || "No Head Category"})
//                     </span>
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => handleDelete(val.id)}
//                       className="text-red-500 hover:underline"
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

// export default AdminSubCategories;

import { useEffect, useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import Edit from "../../../../assets/edit.svg";
import {
  getSubs,
  deleteSub,
  updateSub,
  createSub,
  getHeads,
} from "@/http/service";

const AdminSubCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [headCategories, setHeadCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newSub, setNewSub] = useState({
    name: "",
    description: "",
    headCategory: "",
  });

  useEffect(() => {
    loadSubs();
    loadHeads();
  }, []);

  const loadSubs = async () => {
    try {
      const res = await getSubs();
      const items = Array.isArray(res?.data) ? res.data : [];
      setSubCategories(items);
    } catch (error) {
      console.error("Failed to load sub categories:", error);
      setSubCategories([]);
    }
  };

  const loadHeads = async () => {
    try {
      const res = await getHeads();
      setHeadCategories(res?.data || []);
    } catch (error) {
      console.error("Failed to load head categories:", error);
    }
  };

  const resetForm = () => {
    setNewSub({ name: "", description: "", headCategory: "" });
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (item) => {
    const selectedHead = headCategories.find(
      (head) => head.name === (typeof item.headCategory === "string" ? item.headCategory : item.headCategory?.name)
    );
  
    setIsEditing(true);
    setEditId(item.id);
  
    setNewSub({
      name: typeof item.name === "string" ? item.name : item.name.name || "",
      description: typeof item.description === "string" ? item.description : "",
      headCategory: selectedHead || null,
    });
  
    setModalOpen(true);
  };
  

  const handleDelete = async (id) => {
    try {
      await deleteSub(id);
      setSubCategories((prev) => prev.filter((h) => h.id !== id));
    } catch (error) {
      console.error("Failed to delete sub category:", error);
      alert("Silərkən xəta baş verdi.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!newSub.name.trim() || !newSub.headCategory?.name) {
  //     alert("Adı və kateqoriya seçin.");
  //     return;
  //   }

  //   try {
  //     const payload = {
  //       id: isEditing ? editId : undefined,
  //       name: newSub.name.trim(),
  //       headCategory: newSub.headCategory.name,
  //     };

  //     const body = JSON.stringify(payload);

  //     if (isEditing) {
  //       await updateSub(editId, body);
  //     } else {
  //       await createSub(body);
  //     }

  //     await loadSubs();
  //     resetForm();
  //   } catch (error) {
  //     console.error("Failed to save sub category:", error);
  //     alert("Əməliyyat zamanı xəta baş verdi.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!newSub.name.trim() || !newSub.headCategory?.name) {
      alert("Adı və kateqoriya seçin.");
      return;
    }
  
    try {
      const payload = {
        name: newSub.name.trim(),
        headCategory: newSub.headCategory.name,
      };
  
      const body = JSON.stringify(payload);
  
      if (isEditing) {
        await updateSub(editId, body);
      } else {
        await createSub(body);
      }
  
      await loadSubs();
      resetForm();
    } catch (error) {
      console.error("Failed to save sub category:", error);
      alert("Əməliyyat zamanı xəta baş verdi.");
    }
  };
  
  const getNameString = (name) => {
    if (typeof name === "string") return name;
    if (name && typeof name === "object" && typeof name.name === "string") {
      return name.name;
    }
    return "";
  };
  

  return (
    <div className="p-8 mx-auto">
      {modalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-x-hidden"
          onClick={resetForm}
        >
          <div className={clsx(styles.modal)} onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={resetForm}
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className={clsx(styles.cardname)}>
              {isEditing ? "Sub-kateqoriyanı yenilə" : "Yeni sub-kateqoriya əlavə et"}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            <input
  type="text"
  placeholder="Ad"
  value={getNameString(newSub.name)}
  onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
  className={clsx(styles.modalinput)}
  required
/>

              <select
                value={newSub.headCategory?.id || ""}
                onChange={(e) => {
                  const selected = headCategories.find(
                    (head) => head.id === Number(e.target.value)
                  );
                  setNewSub({
                    ...newSub,
                    headCategory: selected || "",
                  });
                }}
                required
                className={clsx(styles.modalinput)}
              >
                <option value="">Baş kateqoriya seçin</option>
                {headCategories.map((head) => (
                  <option key={head.id} value={head.id}>
                    {head.name}
                  </option>
                ))}
              </select>

              <button className={clsx(styles.modalbtn)} type="submit">
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
                Sub <br /> Kateqoriyaları
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
                    setIsEditing(false);
                    setEditId(null);
                    setModalOpen(true);
                  }}
                >
                  <Open />
                </button>
              </td>
            </tr>

            {subCategories
              .filter((val) =>
                val.name?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((val) => (
                <tr key={val.id}>
                  <td className={clsx(styles.cardrow)}>
                    <div className={clsx(styles.cardedit)} onClick={() => handleEdit(val)}>
                      <Edit />
                    </div>
                    {val.name} <br />
                    <span className="text-xs text-gray-500">
                      ({val.headCategory || "No Head Category"})
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(val.id)}
                      className="text-red-500 hover:underline"
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

export default AdminSubCategories;
