import { api } from "@/services/axios"
import { jwtDecode } from "jwt-decode"

export interface Medicamento {
	categoria: string
	createdAt: string
	id_medicamento: string
	imagem: string
	nome_comercial: string
	nome_generico: string
	origem: string
	preco: number
	quantidade_disponivel: number
	updatedAt: string
	validade: string
}
interface GetMedicinalsResponse {
	pagination: {
		currentPage: number
		itemsPerPage: number
		totalItems: number
		totalPages: number
	}
	response: Medicamento[]
}
export async function getMedicinals() {
	const storedToken = localStorage.getItem("accessToken")

	if (!storedToken || typeof storedToken !== "string") {
		throw new Error("Token de autenticação ausente ou inválido")
	}

	const { id_entidade } = jwtDecode<any>(storedToken)

	try {
		const response = await api.get<GetMedicinalsResponse>(
			`/entity/deposit/myMedicines/${id_entidade}`,
			{
				headers: {
					Authorization: `Bearer ${storedToken}`,
				},
			}
		)
		return response.data
	} catch (error) {
		console.log(error)
	}
}
