import { api } from "@/services/axios"
import { jwtDecode } from "jwt-decode"

interface Medicamento {
	firma_deposito: string
	categoria_medicamento: string
	id_medicamento: string
	nome_medicamento: string
	preco: number
	total_compra: number
	validade: string
}
interface GetOrdersResponse {
	success: true
	response: [
		{
			pedidos: [
				{
					data_aquisicao: string
					quantidade_medicamentos: number
					id_aquisicao: string
					status: "pendente" | "concluido" | "cancelado"
					medicamento: Medicamento[]
				}
			]
			totalPedidos: number
		}
	]
	pagination: {
		totalPages: number
		totalItems: number
		itemsPerPage: number
		currentPage: number
	}
}
export async function getOrders() {
	const storedToken = localStorage.getItem("accessToken") as string
	const { id_entidade } = jwtDecode<any>(storedToken)

	const response = await api.get<GetOrdersResponse>(
		`/entity/pharmacy/my/requests/${id_entidade}`,
		{
			headers: {
				Authorization: `Bearer ${storedToken}`,
			},
		}
	)

	console.log(response.data.response)

	return response.data
}
