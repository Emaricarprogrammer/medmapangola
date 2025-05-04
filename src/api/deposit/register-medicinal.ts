import { api } from "@/services/axios"

interface RegisterMedicinalBody {
	categoria_medicamento: string
	nome_generico: string
	nome_comercial: string
	origem_medicamento: string
	validade_medicamento: string
	preco_medicamento: number
	imagem: File
	quantidade_disponivel: number
	id_entidade_fk: string
}

export async function registerMedicinal({ ...rest }: RegisterMedicinalBody) {
	const storedToken = localStorage.getItem("accessToken")

	if (!storedToken || typeof storedToken !== "string") {
		throw new Error("Token de autenticação ausente ou inválido")
	}

	const formData = new FormData()
	formData.append("imagem", rest.imagem)
	formData.append("categoria_medicamento", rest.categoria_medicamento)
	formData.append("nome_generico", rest.nome_generico)
	formData.append("nome_comercial", rest.nome_comercial)
	formData.append("origem_medicamento", rest.origem_medicamento)
	formData.append("validade_medicamento", rest.validade_medicamento)
	formData.append("preco_medicamento", rest.preco_medicamento.toString())
	formData.append(
		"quantidade_disponivel",
		rest.quantidade_disponivel.toString()
	)
	formData.append("id_entidade_fk", rest.id_entidade_fk)

	await api.post("/entity/deposit/medicines", formData, {
		headers: {
			Authorization: `Bearer ${storedToken}`,
		},
	})
}
