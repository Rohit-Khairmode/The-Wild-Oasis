import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; //trick to convert any value to boolean
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name }); //this awit is important else we immediately move to next line and after that immediatel session callback get called and then we will try to find a user that yet not been created
        //we cannot able to wirte all the code we write inside session here because new "session" will be created once the signIn callback function and entire signIn process completes

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
