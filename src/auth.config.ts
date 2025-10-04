import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        return isLoggedIn;
      } else if (isLoggedIn) {
        const redirectUrl: URL = new URL('/dashboard', nextUrl)
        return Response.redirect(redirectUrl);
      }
      return true;
    },
  },
} satisfies NextAuthConfig;