import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import Trash from "../../../../assets/trash.svg";
import Open from "../../../../assets/open.svg";
import {
  getShops,
  createShops,
  updateShops,
  deleteShops,
} from "../../../../api/shop";

const AdminShops = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [shops, setShops] = useState([]);
  const [editedShop, setEditedShop] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    painter: "",
    size: "",
    category: "",
    inStock: true,
    sale: false,
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const response = await getShops();
      setShops(response.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setShops([]);
    }
  };

  const openModal = (shop = null) => {
    if (shop) {
      setEditedShop({
        id: shop.id,
        name: shop.name,
        description: shop.description,
        price: shop.price,
        discountPrice: shop.discountPrice || "",
        painter: shop.painter,
        size: shop.size,
        category: shop.category?._id || shop.category,
        inStock: shop.inStock,
        sale: shop.sale,
        image: null,
        imagePreview: shop.image,
      });
      setIsEditing(true);
    } else {
      setEditedShop({
        id: null,
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        painter: "",
        size: "",
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
    setEditedShop({
      id: null,
      name: "",
      description: "",
      price: "",
      discountPrice: "",
      painter: "",
      size: "",
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
      setEditedShop((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteShops(id);
      setShops((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("An error occurred while deleting.");
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
      category,
      inStock,
      sale,
      image,
    } = editedShop;

    if (!name || !description || !price || !painter || !size || !category) {
      alert("All required fields must be filled.");
      return;
    }
    if (!isEditing && !image) {
      alert("An image must be selected.");
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
      formData.append("inStock", inStock);
      formData.append("sale", sale);
      if (image) formData.append("image", image);

      if (isEditing) {
        await updateShops(id, formData);
      } else {
        await createShops(formData);
      }

      await loadShops();
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
              {isEditing ? "Edit Product" : "Add New Product"}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 w-full max-w-lg mx-auto text-black"
            >
              <input
                type="text"
                placeholder="Name"
                value={editedShop.name}
                onChange={(e) =>
                  setEditedShop((prev) => ({ ...prev, name: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <textarea
                placeholder="Description"
                value={editedShop.description}
                onChange={(e) =>
                  setEditedShop((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="number"
                placeholder="Price"
                value={editedShop.price}
                onChange={(e) =>
                  setEditedShop((prev) => ({ ...prev, price: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="number"
                placeholder="Discount Price (optional)"
                value={editedShop.discountPrice}
                onChange={(e) =>
                  setEditedShop((prev) => ({
                    ...prev,
                    discountPrice: e.target.value,
                  }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="text"
                placeholder="Painter"
                value={editedShop.painter}
                onChange={(e) =>
                  setEditedShop((prev) => ({ ...prev, painter: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="text"
                placeholder="Size"
                value={editedShop.size}
                onChange={(e) =>
                  setEditedShop((prev) => ({ ...prev, size: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="text"
                placeholder="Category ID"
                value={editedShop.category}
                onChange={(e) =>
                  setEditedShop((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className={clsx(styles.modalinput)}
              />

              <label className="block text-sm">
                <input
                  type="checkbox"
                  checked={editedShop.inStock}
                  onChange={(e) =>
                    setEditedShop((prev) => ({
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
                  checked={editedShop.sale}
                  onChange={(e) =>
                    setEditedShop((prev) => ({
                      ...prev,
                      sale: e.target.checked,
                    }))
                  }
                />{" "}
                On Sale
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={clsx(styles.modalinput)}
              />
              {editedShop.imagePreview && (
                <div className="mt-2">
                  <img
                    src={
                      editedShop.imagePreview.startsWith("blob:")
                        ? editedShop.imagePreview
                        : `http://localhost:3000/${editedShop.imagePreview.replace(
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
                Products
                <button
                  className={clsx(styles.cardopen)}
                  onClick={() => openModal()}
                  type="button"
                >
                  <img src={Open} alt="Open modal" />
                </button>
              </td>
            </tr>
            {shops.map((shop) => (
              <tr key={shop.id}>
                <td
                  className={clsx(
                    styles.cardrow,
                    "flex justify-between items-center"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/${shop.image.replace(/\\/g, "/")}`}
                      alt={shop.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-black font-bold">{shop.name}</p>
                      <p className="text-sm">{shop.price} USD</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      className={clsx(styles.cardedit)}
                      onClick={() => openModal(shop)}
                      type="button"
                      aria-label="Edit"
                    >
                      <img src={Edit} alt="edit icon" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(shop.id)}
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

export default AdminShops;
