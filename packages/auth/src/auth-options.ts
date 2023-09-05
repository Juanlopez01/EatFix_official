import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type DefaultSession, type NextAuthOptions } from 'next-auth';
import Auth0Provider, { type Auth0Profile} from 'next-auth/providers/auth0';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@acme/db';
import {
  createAccountHandler,
  createUserHandler,
  getAccountByUserAndProviderHandler,
  getUserByEmailHandler,
  updateAccountHandler,
} from './utils/api';
import { loginUser, registerUser, validateUser } from './utils/utils';

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
  }
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id:'credentials',
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const {services, action} = req.body as {
          services: string
          action: string
        }
        const endpoint = `https://serwwwices.com/api/authorization/${services}`;

        const loginToken = process.env.SERVICES_TOKEN as string; // Get the login token from environment variables
        const headers = {
            Authorization: `Bearer ${loginToken} `,
        };
        const response = await fetch(endpoint, { headers });
        const data = await response.json();  
        if(response.ok){
          const email = data.internal_email_address;
          const cred = {...credentials, email: email}

          if(action === 'register'){
            const user =  await registerUser(cred)
            return user
          } else if (action === 'login'){
            const user =  await loginUser(cred)
            return user
          } else {
            throw new Error('invalid action')
          }
        }
        return null
        
      }
    })
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
  callbacks: {
    /**
     * The callback -> signIn() is a function to next-auth
     * that permits you to customize the sign in process.
     */
    async signIn({ account, profile, user: newUser }): Promise<boolean | string> {
     
      
      if (account?.provider === 'auth0') {
        interface Auth0Extends extends Auth0Profile {
          username: string
          image_url: string
        }
        const { username , image_url, email } = profile as Auth0Extends;
        const { provider, providerAccountId } = account;
        const { name } = newUser;

        // Find the user by email
        const user = await getUserByEmailHandler(email);

        // If the user already exists, update their account, otherwise create a new user
        if (user) {
          const userAccount = await getAccountByUserAndProviderHandler(
            user.id,
            providerAccountId,
            provider,
          );

          /**
           * If the user already has an account with the same provider and providerAccountId,
           * update the account. Otherwise, create a new account for the user.
           */
          if (userAccount) await updateAccountHandler(userAccount.id, username, account);
          else await createAccountHandler(user.id, username, account);
        } else await createUserHandler(name, username, email, image_url, account, 'Free', 1);
      } else if(account?.provider === 'credentials' ){
        const { email } = newUser;
        const { provider, providerAccountId } = account;

        const user = await getUserByEmailHandler(email);

        // If the user already exists, update their account, otherwise create a new user
        if (user) {
          const userAccount = await getAccountByUserAndProviderHandler(
            user.id,
            providerAccountId,
            provider,
          );

          /**
           * If the user already has an account with the same provider and providerAccountId,
           * update the account. Otherwise, create a new account for the user.
           */
          if (userAccount) await updateAccountHandler(userAccount.id, email, account);
          else await createAccountHandler(user.id, email, account);
        } else {
          return false
        }
      }

      /**
       * NOTE: Remember that by returning true, you are telling next-auth to continue the authentication process.
       * the authentication process, i.e., it will create and update again all the tables involved in the authentication process (User, Account, Session, etc.).
       * tables that are involved in the authentication process (User, Account, Session, etc.).
       * Here we should only update the fields that next-auth does not update by default (such as username).
       */
      return true;
    },
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },

    async session({ session, token}) {
      if (session.user) {
        session.user = token.user as {id: string, email: string}
        const email = session.user.email as string
        // session.user.username = token.username
        const services = await validateUser(email) 
        if(services){
          const end = new Date().setUTCHours(23, 59, 59);
          session.expires = end.toString();
          return session
        }
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  session: {
    maxAge: 24 * 60 * 60 ,
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET as string,
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
