import { SignInData } from "@/schemas/sign-in"
import { api } from "@/services/axios"

interface SigInResponse {
  sucess: boolean
  logged: boolean
  accessToken: string
}
export async function signIn(entity: SignInData) {
  const response = await api.post<SigInResponse>("/auth/login", entity)

  return response.data
}
