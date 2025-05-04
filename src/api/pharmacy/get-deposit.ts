import { api } from "@/services/axios"

export interface Medicamento {
	categoria: string
	id_medicamento: string
	imagem: string
	nome_comercial: string
	nome_generico: string
	origem: string
	preco: number
	quantidade_disponivel: number
	validade: string
}
interface GetDepositResponse {
	success: boolean
	pagination: {
		currentPage: number
		itemsPerPage: number
		totalItems: number
		totalPages: number
	}
	response: {
		cidade: number
		contacto: number
		email: number
		firma_deposito: string
		geolocalizacao_deposito: { latitude: -8.8900875; longitude: 13.2034341 }
		id_deposito: string
		logradouro: string
		medicamentos_deposito: Medicamento[]
		nif_deposito: string
		numero: number
		pais: string
		rua: string
	}
}

export async function getDeposit(depositId: string) {
	const storedToken = localStorage.getItem("accessToken")

	if (!storedToken || typeof storedToken !== "string") {
		throw new Error("Token de autenticação ausente ou inválido")
	}

	const response = await api.get<GetDepositResponse>(
		`/entity/pharmacy/deposit/${depositId}`,
		{
			headers: {
				Authorization: `Bearer ${storedToken}`,
			},
		}
	)
	return response.data
}
