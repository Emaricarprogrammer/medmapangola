import { z } from "zod"

export const editMedicinalSchema = z.object({
	categoria_medicamento: z.string().min(1, "Campo obrigatório"),
	nome_generico: z.string().min(1, "Campo obrigatório"),
	nome_comercial: z.string().min(1, "Campo obrigatório"),
	origem_medicamento: z.string().min(1, "Campo obrigatório"),
	validade_medicamento: z.string().min(1, "Campo obrigatório"),
	preco_medicamento: z.number().min(0.01, "Valor deve ser positivo"),
	quantidade_disponivel: z.number().min(1, "Quantidade deve ser positiva"),
	imagem_url: z.string().url("URL inválida"),
})

export type EditMedicinalFormData = z.infer<typeof editMedicinalSchema>
