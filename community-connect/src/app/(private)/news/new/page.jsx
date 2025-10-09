// src/app/news/new/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";

import { storage } from "@/lib/appwrite";
import { ID } from "appwrite";

export default function NewsNewPage() {
  const router = useRouter();
  const [files, setFiles] = useState([]);

  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // for now: image URL
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDrop = (files) => {
    console.log("Dropped files:", files);
    setFiles(files);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!headline || !content) {
      setError("Headline and content are required.");
      return;
    }

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
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline,
          content,
          image: viewUrl || null,
          source,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "unknown" }));
        throw new Error(err?.error || "Failed to save news");
      }

      // success -> go to news listing
      router.push("/news");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Create News</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Headline"
            className="w-full border rounded p-2"
          />

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

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            className="w-full border rounded p-2"
          />

          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source (optional)"
            className="w-full border rounded p-2"
          />

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post News"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
