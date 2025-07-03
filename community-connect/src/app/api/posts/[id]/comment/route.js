import { prisma } from '../../../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const { id } = req.query

  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      const { content } = req.body
      const comment = await prisma.comment.create({
        data: {
          content,
          authorId: session.user.id,
          postId: id
        },
        include: {
          author: {
            select: { id: true, name: true, avatar: true }
          }
        }
      })
      res.status(201).json(comment)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create comment' })
    }
  }
}