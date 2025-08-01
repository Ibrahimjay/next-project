"use client";
// pages/index.js
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import PostForm from "@/components/PostForm";
import Post from "@/components/Post";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

// import Layout from '../components/Layout'
// import PostForm from '../components/PostForm'
// import Post from '../components/Post'

export default function Home() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: "",
    authorId: "",
    urgent: "",
    neighborhood: "",
  });

  const buildQueryString = (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return params.toString();
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const query = buildQueryString(filters);
      const response = await fetch(`/api/posts${query ? `?${query}` : ""}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filters, fetchPosts]);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostUpdate = () => {
    fetchPosts();
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading posts...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between item-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Filters</Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Filter Posts</DialogTitle>
              </DialogHeader>

              <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category */}
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={filters.category || "all"}
                    onValueChange={(value) =>
                      handleFilterChange(
                        "category",
                        value === "all" ? "" : value
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Safety">Safety</SelectItem>
                        <SelectItem value="For Sale">For Sale</SelectItem>
                        <SelectItem value="Lost & Found">
                          Lost & Found
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Urgent */}
                <div>
                  <Label htmlFor="urgent">Urgent</Label>
                  <Select
                    value={filters.urgent || "all"}
                    onValueChange={(value) =>
                      handleFilterChange("urgent", value === "all" ? "" : value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Urgent</SelectLabel>
                        <SelectItem value="true">Urgent</SelectItem>
                        <SelectItem value="false">Not Urgent</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Neighborhood */}
                <div>
                  <Label htmlFor="neighborhood">Neighborhood</Label>
                  <Input
                    id="neighborhood"
                    value={filters.neighborhood}
                    onChange={(e) =>
                      handleFilterChange("neighborhood", e.target.value)
                    }
                    placeholder="Enter neighborhood"
                  />
                </div>
              </form>

              {/* Optional: Close button */}
              <div className="mt-4 flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Apply Filters</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
          <PostForm onPostCreated={handlePostCreated} />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-500">
              Be the first to share something with your neighbors!
            </p>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <Post key={post.id} post={post} onUpdate={handlePostUpdate} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
