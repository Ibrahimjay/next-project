"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

export function PostFormCommand() {
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDrop = (files) => {
    console.log("Dropped files:", files);
    setFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    console.log("submitting....");
    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);

    if (files?.length) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Failed to submit post");
        return;
      }

      const post = await response.json();
      console.log("Post created:", post);

      // ✅ close dialog after success
      setOpen(false);

      // reset form
      setContent("");
      setFiles([]);
    } catch (err) {
      console.error("Error submitting post:", err);
    } finally {
      setLoading(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full rounded-full text-left justify-start"
        >
          What&apos;s on your mind
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="w-full" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Post</DialogTitle>
            <DialogDescription>What&apos;s on your mind</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write something..."
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

            {files.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {files.map((file, idx) => (
                  <Image
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    width={100}
                    height={100}
                    className="rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={loading} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
