import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import  prisma  from './prisma'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !await bcrypt.compare(credentials.password, user.password)) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          neighborhood: user.neighborhood
        }
      }
    })
    ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.neighborhood = user.neighborhood
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.neighborhood = token.neighborhood
      }
      return session
    }
  }
}
