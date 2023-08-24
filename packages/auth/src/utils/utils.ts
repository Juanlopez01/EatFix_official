import { prisma } from "@acme/db";

interface CreateUserParams {
    name?: string
    lastname?: string
    email: string
    password: string
    image?: string
  }

  