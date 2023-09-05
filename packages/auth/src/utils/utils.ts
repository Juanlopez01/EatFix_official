import { prisma } from "@acme/db";
import { compare, hash } from "bcrypt";

interface RegisterNewUser {
  email?: string
  password?: string
}
export const registerUser = async ({
  email,
  password,
}: RegisterNewUser) : Promise<any | null> => {
  if (!email || !password) return false
  try {
    const userExist = await prisma.user.findUnique({where: {email: email}})
    if (userExist) throw new Error('EMAIL_EXISTS')
    const hashedPassword = await hash(password, 12)

    const newUser =await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        plan: 'services',
        dietQuota: 3,
      }
    })
    
    return newUser
  } catch (error) {
    console.log(error)
    return error
  }
}

interface loginEmail {
  email?: string
  password?: string
}
export const loginUser = async ({ email, password }: loginEmail) => {
  if (!password) throw new Error('PASS_REQUIRED')
  if (!email) throw new Error('EMAIL_REQUIRED')
  const user = await prisma.user.findUnique({where: {email: email}})

  // // Si no existe
  if (!user) {
    throw new Error('EMAIL_NOT_REGISTERED')
  }

  // checkeo la password hasheada
  if(user.hashedPassword){
    const isPasswordCorrect = await compare(password, user.hashedPassword)
    // Si es incorrecta
    if (!isPasswordCorrect) {
      throw new Error('PASS_INVALID')
    }
  } else {
    throw new Error('INVALID_PASS')
  }

  return user
}


export const validateUser = async (email : string) => {
  const user = await prisma.user.findUnique({where: {email: email}});
  if (user) {
    if(user.plan === 'services'){
      return true;
    }
    return false;
  }
  return false
}