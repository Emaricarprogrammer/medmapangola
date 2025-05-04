import { api } from "@/services/axios"
import { jwtDecode } from "jwt-decode"

interface EditProfileBody {
	cidade: string
	contacto: number
	email: string
	firma: string
	nif: string
	logradouro: string
	numero: number
	rua: string
	password: string
	newPassword: string
}

export async function editProfile(data: Partial<EditProfileBody>) {
	const token = localStorage.getItem("accessToken")

	const { id_entidade } = jwtDecode<{ id_entidade: string }>(token || "")

	const response = await api.patch(`/entities/${id_entidade}`, data)

	return response.data
}
