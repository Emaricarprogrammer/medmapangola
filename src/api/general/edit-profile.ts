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
	// 1. Pegar token do localStorage
	const token = localStorage.getItem("accessToken")

	// 2. Decodificar token para pegar o ID
	const { id_entidade } = jwtDecode<{ id_entidade: string }>(token || "")

	// 3. Fazer a requisição PATCH
	const response = await api.patch(`/entities/${id_entidade}`, data)

	// 4. Retornar os dados da resposta
	return response.data
}
