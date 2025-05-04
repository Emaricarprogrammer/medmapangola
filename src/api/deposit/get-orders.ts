import { api } from "@/services/axios"

export interface Medicamento {
	id_medicamento: string
	nome_medicamento: string
	preco: number
	quantidade: number
	validade: string
	imagem_url: string
}
interface GetOrdersResponse {
	success: true
	response: [
		{
			id_aquisicao: string
			data_aquisicao: "2025-05-03T13:12:57.567Z"
			status: "pendente" | "concluido" | "cancelado"
			farmacia: {
				id: string
				nome: string
				contacto: number
				endereco: {
					rua: number
					cidade: string
					numero: number
				}
			}
			medicamentos: Medicamento[]
			total_compra: number
		}
	]
	pagination: {
		totalPages: 1
		totalItems: 2
		itemsPerPage: 10
		currentPage: 1
	}
}

export async function getOrders(depositId: string) {
	const storedToken = localStorage.getItem("accessToken")

	if (!storedToken || typeof storedToken !== "string") {
		throw new Error("Token de autenticação ausente ou inválido")
	}

	const response = await api.get<GetOrdersResponse>(
		`/entity/deposit/medicines/my/requests/${depositId}`,
		{
			headers: {
				Authorization: `Bearer ${storedToken}`,
			},
		}
	)
	return response.data
}
