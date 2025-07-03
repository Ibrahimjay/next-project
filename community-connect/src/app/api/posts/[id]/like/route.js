import { prisma } from '../../../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../lib/auth'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const { id } = req.query

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    try {
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId: id
          }
        }
      })

      if (existingLike) {
        await prisma.like.delete({
          where: { id: existingLike.id }
        })
        res.status(200).json({ liked: false })
      } else {
        await prisma.like.create({
          data: {
            userId: session.user.id,
            postId: id
          }
        })
        res.status(200).json({ liked: true })
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to toggle like' })
    }
  }
}
