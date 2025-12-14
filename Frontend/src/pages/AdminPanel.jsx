import { useState } from "react";
import api from "../api/axios";

const AdminPanel = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSweet = async (e) => {
    e.preventDefault();
    try {
      await api.post("/sweets", {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
      alert("Sweet added");
      setForm({ name: "", category: "", price: "", quantity: "" });
    } catch (err) {
      alert(err.response?.data?.errors?.[0]?.msg || "Failed to add sweet");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Add New Sweet</h2>

      <form onSubmit={addSweet} className="space-y-3">
        <input
          name="name"
          placeholder="Sweet name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="quantity"
          placeholder="Quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Add Sweet
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
