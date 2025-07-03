
// pages/api/auth/signup.js
import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, password, address, neighborhood } = req.body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        address,
        neighborhood
      }
    })

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
}
