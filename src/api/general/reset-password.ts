import { api } from "@/services/axios"
import { RecoveryData } from "@/schemas/recovery"

interface ResetPasswordResponse {
	sucess: boolean
	message: string
}
export async function forgotPassword(email: RecoveryData) {
	const response = await api.post<ResetPasswordResponse>(
		"/auth/forgot_password",
		email
	)
	return response.data
}

export async function resetPassword(newPassword: string, authToken: string) {
	const response = await api.post<ResetPasswordResponse>(
		"/auth/reset_password",
		{ newPassword }, // Body com a senha
		{
			params: { auth: authToken }, // Token como query param
			headers: {
				"Content-Type": "application/json", // Garante que o body seja JSON
			},
		}
	)
	return response.data
}
