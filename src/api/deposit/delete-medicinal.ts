import { api } from "@/services/axios"

export async function deleteMedicinal(id_medicamento: string) {
	const storedToken = localStorage.getItem("accessToken")

	if (!storedToken || typeof storedToken !== "string") {
		throw new Error("Token de autenticação ausente ou inválido")
	}

	const response = await api.delete(
		`/entity/deposit/medicine/${id_medicamento}`,
		{
			headers: {
				Authorization: `Bearer ${storedToken}`,
			},
		}
	)

	console.log(response)
}
