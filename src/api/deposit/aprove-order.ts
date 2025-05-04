import { api } from "@/services/axios"

interface AproveOrderBody {
	id_aquisicao: string
	aquisicao_status: "concluido" | "cancelado"
	mensagem: string
	contacto_farmacia: number
}

export async function aproveOrder({
	id_aquisicao,
	aquisicao_status,
	contacto_farmacia,
	mensagem,
}: AproveOrderBody) {
	const storedToken = localStorage.getItem("accessToken")

	if (!storedToken || typeof storedToken !== "string") {
		throw new Error("Token de autenticação ausente ou inválido")
	}

	await api.patch(
		`/entity/deposit/medicines/requests/${id_aquisicao}/status`,
		{
			aquisicao_status,
			contacto_farmacia,
			mensagem,
		},
		{
			headers: {
				Authorization: `Bearer ${storedToken}`,
			},
		}
	)
}
