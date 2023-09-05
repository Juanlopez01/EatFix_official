
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { ChangeEvent, ChangeEventHandler, FormEvent} from 'react'
import { useState } from 'react'
import { emailRegex, passRegex } from '../regexp'

interface AuthInitialState {
  email?: string
  password?: string
  repeatPassword?: string
  name?: string
  lastname?: string
  validate?: boolean
}

interface UserType {
    email: string
    password: string
}

interface BaseAuth {
  action: string
  redirect?: string
  success: {
    title: string
    text: string
    timer?: number
  }
  validate?: boolean
}

interface signInParams extends BaseAuth {
  inputs: AuthInitialState
  update?: {
    /* Si se quiere actualizar varias propiedades
     hay que mandar un array de propiedades 
     y en las misma posiciones los valores
     EJEMPLO:
     property:['name', 'lastname']
     value: ['Jhon', 'Doe']
      */
    property: keyof UserType | Array<keyof UserType>
    value: string[]
    id: string
  }
}

interface AuthProps extends BaseAuth {
  initialState: AuthInitialState
}

interface ErrorsValidate {
  email?: string
  password?: string
  name?: string
  lastname?: string
  repeatPassword?: string
}

const validateAuth = ({
  email,
  password,
  name,
  lastname,
  repeatPassword,
}: AuthInitialState) => {
  const errors = {} as ErrorsValidate
  if (email === '') {
    errors.email = 'Se requiere un email'
  } else if (email !== undefined && !emailRegex.test(email)) {
    errors.email = 'Email invalido'
  }
  if (password === '') {
    errors.password = 'Se requiere una contraseña'
  } else if (password !== undefined && !passRegex.test(password)) {
    errors.password =
      'La contraseña debe contener almenos 8 caracteres, una letra y un número'
  }

  if (repeatPassword !== undefined && repeatPassword !== password) {
    errors.repeatPassword = 'Las contraseñas deben ser iguales'
  }
  if (name === '') {
    errors.name = 'Se requiere un nombre'
  }
  if (lastname === '') {
    errors.lastname = 'Se requiere un apellido'
  }
  return errors
}

export const useAuth = (authParams: AuthProps) => {
  const { initialState, ...restParams } = authParams
  const router = useRouter()
  const [inputs, setInputs] = useState(initialState)
  const [errors, setErrors] = useState<ErrorsValidate>({})
  const [isLoading, setLoading] = useState(false)
    const {services} = router.query
  const handerInputsChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.target
    setInputs((prevState) => ({ ...prevState, [name]: value }))
  }

  // Validations
  const validateInputs = (inputsToValidate: AuthInitialState) => {
    const errors = validateAuth(inputsToValidate)
    setErrors(errors)
    return Object.keys(errors).length > 0
  }

  const singInAction = async (params: signInParams) => {
    const { action, inputs, redirect, validate, update } =
      params
    if (validate && validateInputs(inputs)) return
    let property = 'e'
    if (update) {
      if (Array.isArray(update.property)) {
        property = update.property.join(' #&&# ')
        update.value[0] = update.value.join(' #&&# ')
      } else property = update.property
    }
    
    setLoading(true)
    const data = await signIn('credentials', {
      redirect: true,
      ...inputs,
      ...update,
      property,
      action,
      callbackUrl: `${window.location.origin}/${redirect}`,
      services: services,
    })
    setLoading(false)
    if (data === undefined){
        return 'error'
    } else {
        const { ok } = data
        if(ok) await router.push('/')
    }
    return 'Error'
      //mensaje de error
    
    // Redirect to the callback
    // if (ok && url) {
    // //   if (onSuccess !== undefined) onSuccess()
    // //   return Swal.fire({
    // //     icon: 'success',
    // //     ...success,
    // //   }).then(() => {
    // //     setInputs(initialState)
    // //     return Boolean(redirect) && router.push(url)
    // //   }) ACA CUANDO SALE BIEN
    // }

    // if (error?.startsWith('EMAIL'))
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     email: ERRORS_AUTH[error as keyof typeof ERRORS_AUTH],
    //   }))
    // else if (error?.startsWith('PASS'))
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     password: ERRORS_AUTH[error as keyof typeof ERRORS_AUTH],
    //   }))
      //ACA FALTA UN ERROR CUANDO NO SE PUDO REALIZAR PERO NO HUBO ERRORES
  }

  const handlerFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await singInAction({ inputs, ...restParams })
  }

  return {
    errors,
    inputs,
    isLoading,
    handerInputsChange,
    validateInputs,
    singInAction,
    handlerFormSubmit,
  }
}
