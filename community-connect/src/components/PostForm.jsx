"use client";

// components/PostForm.js
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function PostForm({ onPostCreated }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    urgent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "General",
    "Safety & Crime",
    "For Sale",
    "Lost & Found",
    "Recommendations",
    "Events",
    "Free Stuff",
    "Help Map",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newPost = await response.json();
        onPostCreated(newPost);
        setFormData({
          title: "",
          content: "",
          category: "General",
          urgent: false,
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <p className="text-gray-500 text-center">
          Please sign in to create a post
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-4 text-left text-gray-500 hover:bg-gray-50 rounded-lg"
        >
          What's happening in your neighborhood?
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="What's your post about?"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-3 text-gray-500  border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <textarea
              placeholder="Share more details..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={4}
              className="w-full p-3 text-gray-500  border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.urgent}
                onChange={(e) =>
                  setFormData({ ...formData, urgent: e.target.checked })
                }
                className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Mark as urgent</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
