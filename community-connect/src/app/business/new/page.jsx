"use client";

import { useState } from "react";

export default function NewBusinessListingPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "sale",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/business", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: form.price ? parseFloat(form.price) : null,
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Listing added successfully!");
      setForm({ title: "", description: "", category: "sale", price: "" });
    } else {
      alert("Failed to add listing.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Business Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="e.g. Used Laptop, Plumbing Service"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Describe your item, job, or skill..."
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="sale">For Sale</option>
            <option value="free">Give Away</option>
            <option value="job">Job/Skill</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Price (optional)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter price or leave empty"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Listing"}
        </button>
      </form>
    </div>
  );
}
