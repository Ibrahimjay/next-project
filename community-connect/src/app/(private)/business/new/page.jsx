"use client";

import Layout from "@/components/Layout";
import { useState } from "react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";

import { storage } from "@/lib/appwrite";
import { ID } from "appwrite";

export default function NewBusinessListingPage() {
  const [files, setFiles] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "sale",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleDrop = (files) => {
    console.log("Dropped files:", files);
    setFiles(files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("appwrite payload", files[0]);
      const result = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        ID.unique(),
        files[0]
      );

      const viewUrl = storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        result.$id
      );
      const res = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: form.price ? parseFloat(form.price) : null,
          image: viewUrl || "/images/placeholder.png", // fallback
        }),
      });

      if (res.ok) {
        alert("Listing added successfully!");
        setForm({
          title: "",
          description: "",
          category: "sale",
          price: "",
        });
      } else {
        alert("Failed to add listing.");
      }
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

          <Dropzone
            accept={{ "image/*": [] }}
            maxFiles={10}
            maxSize={1024 * 1024 * 10}
            minSize={1024}
            onDrop={handleDrop}
            onError={console.error}
            src={files}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>

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
    </>
  );
}
