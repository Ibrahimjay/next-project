'use client'
// pages/index.js
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Layout from '../components/Layout'
import PostForm from '../components/PostForm'
import Post from '../components/Post'

export default function Home() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts])
  }

  const handlePostUpdate = () => {
    fetchPosts()
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading posts...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <PostForm onPostCreated={handlePostCreated} />
        
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
            {posts.map(post => (
              <Post 
                key={post.id} 
                post={post} 
                onUpdate={handlePostUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
