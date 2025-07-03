import { prisma } from '../../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: {
            select: { id: true, name: true, avatar: true, neighborhood: true, verified: true }
          },
          comments: {
            include: {
              author: {
                select: { id: true, name: true, avatar: true }
              }
            },
            orderBy: { createdAt: 'asc' }
          },
          likes: true,
          _count: {
            select: { comments: true, likes: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
      res.status(200).json(posts)
    } catch (error) {
              res.status(500).json({ error: 'Failed to fetch posts' })
    }
  }

  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      const { title, content, category, urgent } = req.body
      const post = await prisma.post.create({
        data: {
          title,
          content,
          category,
          urgent: urgent || false,
          authorId: session.user.id
        },
        include: {
          author: {
            select: { id: true, name: true, avatar: true, neighborhood: true, verified: true }
          },
          _count: {
            select: { comments: true, likes: true }
          }
        }
      })
      res.status(201).json(post)
    } catch (error) {
         res.status(500).json({ error: 'Failed to create post' })
    }
  }
}