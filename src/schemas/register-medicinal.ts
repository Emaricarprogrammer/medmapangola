import { z } from "zod"

export const registerMedicinalSchema = z.object({
	imagem: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
		message: "O arquivo deve ser uma imagem", // Corrected message
	}),

	nome_comercial: z.string().min(3, "Preencha este campo!"),
	nome_generico: z.string().min(3, "Preencha este campo!"),
	categoria_medicamento: z.string().min(3, "Preencha este campo!"),
	origem_medicamento: z.string().min(3, "Preencha este campo!"),
	validade_medicamento: z.string(),
	preco_medicamento: z.number().min(1, "Preencha este campo!"),
	quantidade_disponivel: z.number().min(1, "Preencha este campo!"),
})

export type RegisterMedicinalFormData = z.infer<typeof registerMedicinalSchema>
