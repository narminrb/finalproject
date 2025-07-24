import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import Trash from "../../../../assets/trash.svg";
import Open from "../../../../assets/open.svg";
import {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../../../api/blog";

const AdminHomeBlog = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [editedBlog, setEditedBlog] = useState({
    id: null,
    name: "",
    descfirst: "",
    descsecond: "",
    descthird: "",
    views: "",
    date: "",
    imagefirst: null,
    imagefirstPreview: "",
    imagesecond: null,
    imagesecondPreview: "",
    imagethird: null,
    imagethirdPreview: "",
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await getBlog();
      setBlogs(response.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setBlogs([]);
    }
  };

  const openModal = (blog = null) => {
    if (blog) {
      setEditedBlog({
        id: blog.id,
        name: blog.name,
        descfirst: blog.descfirst,
        descsecond: blog.descsecond,
        descthird: blog.descthird,
        views: blog.views,
        date: blog.date ? blog.date.split("T")[0] : "",
        imagefirst: null,
        imagefirstPreview: blog.imagefirst,
        imagesecond: null,
        imagesecondPreview: blog.imagesecond || "",
        imagethird: null,
        imagethirdPreview: blog.imagethird || "",
      });
      setIsEditing(true);
    } else {
      setEditedBlog({
        id: null,
        name: "",
        descfirst: "",
        descsecond: "",
        descthird: "",
        views: "",
        date: "",
        imagefirst: null,
        imagefirstPreview: "",
        imagesecond: null,
        imagesecondPreview: "",
        imagethird: null,
        imagethirdPreview: "",
      });
      setIsEditing(false);
    }
    setModalOpen(true);
  };

  const resetForm = () => {
    setModalOpen(false);
    setEditedBlog({
      id: null,
      name: "",
      descfirst: "",
      descsecond: "",
      descthird: "",
      views: "",
      date: "",
      imagefirst: null,
      imagefirstPreview: "",
      imagesecond: null,
      imagesecondPreview: "",
      imagethird: null,
      imagethirdPreview: "",
    });
    setIsEditing(false);
  };

  const handleImageChange = (e, imageKey, previewKey) => {
    const file = e.target.files[0];
    if (file) {
      setEditedBlog((prev) => ({
        ...prev,
        [imageKey]: file,
        [previewKey]: URL.createObjectURL(file),
      }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmək istədiyinizə əminsiniz?")) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
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
      descfirst,
      descsecond,
      descthird,
      views,
      date,
      imagefirst,
      imagesecond,
      imagethird,
    } = editedBlog;

    if (!name || !descfirst || !descsecond || !descthird || !views) {
      alert("Lazımi sahələr doldurulmalıdır.");
      return;
    }
    if (!isEditing && !imagefirst) {
      alert("Ən azı ilk şəkil seçilməlidir.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("descfirst", descfirst);
      formData.append("descsecond", descsecond);
      formData.append("descthird", descthird);
      formData.append("views", views);
      if (date) formData.append("date", date);
      if (imagefirst) formData.append("imagefirst", imagefirst);
      if (imagesecond) formData.append("imagesecond", imagesecond);
      if (imagethird) formData.append("imagethird", imagethird);

      if (isEditing) {
        await updateBlog(id, formData);
      } else {
        await createBlog(formData);
      }

      await loadBlogs();
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
              {isEditing ? "Blog redaktə et" : "Yeni blog əlavə et"}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 w-full max-w-lg mx-auto text-black"
            >
              <input
                type="text"
                placeholder="Başlıq"
                value={editedBlog.name}
                onChange={(e) =>
                  setEditedBlog((prev) => ({ ...prev, name: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <textarea
                placeholder="Birinci təsvir"
                value={editedBlog.descfirst}
                onChange={(e) =>
                  setEditedBlog((prev) => ({ ...prev, descfirst: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <textarea
                placeholder="İkinci təsvir"
                value={editedBlog.descsecond}
                onChange={(e) =>
                  setEditedBlog((prev) => ({ ...prev, descsecond: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <textarea
                placeholder="Üçüncü təsvir"
                value={editedBlog.descthird}
                onChange={(e) =>
                  setEditedBlog((prev) => ({ ...prev, descthird: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="number"
                placeholder="Baxış sayı"
                value={editedBlog.views}
                onChange={(e) =>
                  setEditedBlog((prev) => ({ ...prev, views: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="date"
                placeholder="Tarix"
                value={editedBlog.date}
                onChange={(e) =>
                  setEditedBlog((prev) => ({ ...prev, date: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />

              <label>Birinci şəkil (mütləq):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(e, "imagefirst", "imagefirstPreview")
                }
                className={clsx(styles.modalinput)}
              />
              {editedBlog.imagefirstPreview && (
                <img
                  src={
                    editedBlog.imagefirstPreview.startsWith("blob:")
                      ? editedBlog.imagefirstPreview
                      : `http://localhost:3000/${editedBlog.imagefirstPreview.replace(
                          /\\/g,
                          "/"
                        )}`
                  }
                  alt="Birinci şəkil"
                  className="w-28 h-28 object-cover rounded"
                />
              )}

              <label>İkinci şəkil (istəyə bağlı):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(e, "imagesecond", "imagesecondPreview")
                }
                className={clsx(styles.modalinput)}
              />
              {editedBlog.imagesecondPreview && (
                <img
                  src={
                    editedBlog.imagesecondPreview.startsWith("blob:")
                      ? editedBlog.imagesecondPreview
                      : `http://localhost:3000/${editedBlog.imagesecondPreview.replace(
                          /\\/g,
                          "/"
                        )}`
                  }
                  alt="İkinci şəkil"
                  className="w-28 h-28 object-cover rounded"
                />
              )}

              <label>Üçüncü şəkil (istəyə bağlı):</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(e, "imagethird", "imagethirdPreview")
                }
                className={clsx(styles.modalinput)}
              />
              {editedBlog.imagethirdPreview && (
                <img
                  src={
                    editedBlog.imagethirdPreview.startsWith("blob:")
                      ? editedBlog.imagethirdPreview
                      : `http://localhost:3000/${editedBlog.imagethirdPreview.replace(
                          /\\/g,
                          "/"
                        )}`
                  }
                  alt="Üçüncü şəkil"
                  className="w-28 h-28 object-cover rounded"
                />
              )}

              <button className={clsx(styles.modalbtn)} type="submit">
                Yadda saxla
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
                Bloglar
                <button
                  className={clsx(styles.cardopen)}
                  onClick={() => openModal()}
                  type="button"
                >
                  <img src={Open} alt="Open modal" />
                </button>
              </td>
            </tr>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td
                  className={clsx(
                    styles.cardrow,
                    "flex justify-between items-center"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/${blog.imagefirst.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={blog.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-black font-bold">{blog.name}</p>
                      <p className="text-sm">{blog.views} views</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      className={clsx(styles.cardedit)}
                      onClick={() => openModal(blog)}
                      type="button"
                      aria-label="Redaktə et"
                    >
                      <img src={Edit} alt="edit icon" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(blog.id)}
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

export default AdminHomeBlog;
