import { api } from "@/services/axios"

interface CancelOrderBody {
	id_aquisicao: string
	aquisicao_status: "cancelado"
	mensagem: string
	contacto_farmacia: number
}

export async function cancelOrder({
	id_aquisicao,
	aquisicao_status,
	contacto_farmacia,
	mensagem,
}: CancelOrderBody) {
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
