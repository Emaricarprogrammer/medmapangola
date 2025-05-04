import { jwtDecode } from "jwt-decode"

import { api } from "@/services/axios"

interface GetProfile {
	success: true
	response: {
		id_entidade: string
		email: string
		firma_entidade: string
		contacto: number
		logradouro: string
		rua: string
		numero: number
		cidade: string
		NIF_entidade: number
		geolocalizacao_entidade: {
			latitude: number
			longitude: number
		}
	}
}
export async function getProfile() {
	const storedToken = localStorage.getItem("accessToken") as string
	const { id_entidade } = jwtDecode<any>(storedToken)

	const response = await api.get<GetProfile>(`/entities/me/${id_entidade}`)

	return response.data.response
}
