// components/Post.js
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  ExclamationTriangleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Post({ post, onUpdate }) {
  const { data: session } = useSession();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(
    post.likes?.some((like) => like.userId === session?.user?.id) || false
  );

  const handleLike = async () => {
    if (!session) return;

    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: "POST",
      });

      if (response.ok) {
        const { liked } = await response.json();
        setIsLiked(liked);
        onUpdate();
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!session || !commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentText }),
      });

      if (response.ok) {
        setCommentText("");
        onUpdate();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInMinutes = Math.floor((now - posted) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Safety & Crime': 'bg-red-100 text-red-800',
      'General': 'bg-blue-100 text-blue-800',
      'For Sale': 'bg-green-100 text-green-800',
      'Lost & Found': 'bg-purple-100 text-purple-800',
      'Recommendations': 'bg-yellow-100 text-yellow-800',
      'Events': 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {post.author.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900 text-sm">
                  {post.author.name}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>{post.author.neighborhood}</span>
                <span>•</span>
                <span>{timeAgo(post.createdAt)} ago</span>
                {post.edited && (
                  <>
                    <span>•</span>
                    <span>Edited</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {post.urgent && (
              <div className="flex items-center space-x-1 text-red-600 bg-red-50 px-2 py-1 rounded-full">
                <ExclamationTriangleIcon className="h-3 w-3" />
                <span className="text-xs font-medium">URGENT</span>
              </div>
            )}
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <EllipsisHorizontalIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          {post.title && (
            <h3 className="font-semibold text-gray-900 mb-2 text-lg leading-tight">
              {post.title}
            </h3>
          )}
          <div className="text-gray-700 text-sm leading-relaxed">
            {post.content.length > 200 ? (
              <>
                {post.content.substring(0, 200)}...
                <button className="text-blue-600 hover:underline ml-1">
                  see more
                </button>
              </>
            ) : (
              <p className="whitespace-pre-wrap">{post.content}</p>
            )}
          </div>
        </div>

        {/* Post Image (if exists) */}
        {post.image && (
          <div className="mb-4 -mx-1">
            <Image
              src={post.image}
              alt="Post image"
              width={600}
              height={400}
              className="rounded-lg w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 text-sm transition-colors ${
                isLiked 
                  ? "text-red-600" 
                  : "text-gray-500 hover:text-red-600"
              }`}
            >
              {isLiked ? (
                <HeartSolidIcon className="h-5 w-5" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
              <span className="font-medium">{post._count?.likes || 0}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ChatBubbleLeftIcon className="h-5 w-5" />
              <span className="font-medium">{post._count?.comments || 0}</span>
            </button>

            <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-green-600 transition-colors">
              <ShareIcon className="h-5 w-5" />
              <span className="font-medium">Share</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {/* Add Comment Form */}
            {session && (
              <form onSubmit={handleComment} className="mb-4">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {session.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      rows={2}
                      className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none bg-gray-50"
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={!commentText.trim() || isSubmitting}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? "Posting..." : "Comment"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {post.comments?.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    {comment.author.avatar ? (
                      <Image
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {comment.author.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">
                          {comment.author.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {timeAgo(comment.createdAt)} ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}