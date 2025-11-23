import React, { useState, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";

export default function ProductManagement() {
  const { products, setProducts } = useContext(ProductContext);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      description: "",
      image: "",
    });
    setEditingId(null);
  };

  const saveProduct = (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Name & price are required");
      return;
    }

    if (editingId) {
      const updated = products.map((p) =>
        p.id === editingId ? { ...p, ...form } : p
      );
      setProducts(updated);
      alert("Product updated!");
    } else {
      const newProduct = {
        id: Date.now(),
        ...form,
      };
      setProducts([...products, newProduct]);
      alert("Product added!");
    }

    resetForm();
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
  };

  const editProduct = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>

      {/* Product Form */}
      <form onSubmit={saveProduct} className="bg-white p-6 shadow rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-3">
          {editingId ? "Edit Product" : "Add New Product"}
        </h3>

        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 w-full mb-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full mb-3 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-3 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input type="file" className="mb-3" onChange={handleImage} />

        {form.image && (
          <img src={form.image} alt="preview" className="w-32 mb-3 rounded" />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-3 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Product List */}
      <h3 className="text-xl font-semibold mb-2">All Products</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h4 className="font-bold text-lg">{product.name}</h4>
            <p className="text-gray-600">Rs {product.price}</p>
            <p className="text-gray-500 text-sm">{product.description}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => editProduct(product)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
