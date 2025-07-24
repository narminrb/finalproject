import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import Trash from "../../../../assets/trash.svg";
import Open from "../../../../assets/open.svg";
import { createContactElement, deleteContactElement, getContactElements, updateContactElement } from "../../../../api/contactelements";


const AdminContactElements = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [elements, setElements] = useState([]);
  const [editedElement, setEditedElement] = useState({
    id: null,
    name: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    loadElements();
  }, []);

  const loadElements = async () => {
    try {
      const response = await getContactElements();
      setElements(response.elements || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setElements([]);
    }
  };

  const openModal = (element = null) => {
    if (element) {
      setEditedElement({
        id: element.id,
        name: element.name,
        description: element.description,
        image: null,
        imagePreview: element.image,
      });
      setIsEditing(true);
    } else {
      setEditedElement({
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
    setEditedElement({
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
      setEditedElement((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this element?")) return;
    try {
      await deleteContactElement(id);
      setElements((prev) => prev.filter((el) => el.id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Error while deleting.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, description, image } = editedElement;

    if (!name || !description) {
      alert("Name and description are required.");
      return;
    }
    if (!isEditing && !image) {
      alert("Image is required for new element.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (image) formData.append("image", image);

      if (isEditing) {
        await updateContactElement(id, formData);
      } else {
        await createContactElement(formData);
      }

      await loadElements();
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
              type="button"
            >
              &times;
            </button>

            <div className={clsx(styles.cardname)}>
              {isEditing ? "Edit Contact Element" : "Add Contact Element"}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 w-full max-w-lg mx-auto text-black"
            >
              <input
                type="text"
                placeholder="Name"
                value={editedElement.name}
                onChange={(e) =>
                  setEditedElement((prev) => ({ ...prev, name: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <textarea
                placeholder="Description"
                value={editedElement.description}
                onChange={(e) =>
                  setEditedElement((prev) => ({
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

              {editedElement.imagePreview && (
                <img
                  src={
                    editedElement.imagePreview.startsWith("blob:")
                      ? editedElement.imagePreview
                      : `http://localhost:3000/${editedElement.imagePreview.replace(
                          /\\/g,
                          "/"
                        )}`
                  }
                  alt="Preview"
                  className="w-28 h-28 object-cover rounded"
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
              <td
                className={clsx(
                  styles.cardname,
                  "flex justify-between items-center"
                )}
              >
                Contact Elements
                <button
                  className={clsx(styles.cardopen)}
                  onClick={() => openModal()}
                  type="button"
                >
                  <img src={Open} alt="Open modal" />
                </button>
              </td>
            </tr>
            {elements.map((el) => (
              <tr key={el.id}>
                <td
                  className={clsx(
                    styles.cardrow,
                    "flex justify-between items-center"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/${el.image.replace(/\\/g, "/")}`}
                      alt={el.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-black font-bold">{el.name}</p>
                      <p className="text-sm">{el.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      className={clsx(styles.cardedit)}
                      onClick={() => openModal(el)}
                      type="button"
                    >
                      <img src={Edit} alt="edit icon" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(el.id)}
                      type="button"
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

export default AdminContactElements;
