import { api } from "@/services/axios"
import { jwtDecode } from "jwt-decode"

interface RegisterOrderBody {
	id_medicamento: string
	quantidade_aquisicao: number | undefined
	total_compra: number
}

export async function registerOrder({
	id_medicamento,
	quantidade_aquisicao,
	total_compra,
}: RegisterOrderBody) {
	try {
		const storedToken = localStorage.getItem("accessToken")
		if (!storedToken) {
			throw new Error("Token não encontrado no localStorage")
		}

		const { id_entidade } = jwtDecode<any>(storedToken)
		console.log("ID Entidade:", id_entidade)

		const response = await api.post(
			`/entity/pharmacy/request/${id_entidade}`,
			{
				id_medicamento,
				quantidade_aquisicao,
				total_compra,
			},
			{
				headers: {
					Authorization: `Bearer ${storedToken}`,
				},
			}
		)

		console.log("Resposta da API:", response.data)
		return response.data
	} catch (error) {
		console.error("Erro em registerOrder:", error)
		throw error
	}
}
