import { z } from "zod"

export const editMedicinalSchema = z.object({
	image: z
		.any()
		.refine((file) => file instanceof File, "Imagem é obrigatória")
		.refine(
			(file) => file?.size <= 5 * 1024 * 1024,
			`Tamanho máximo do arquivo é 5MB.`
		),

	tradeName: z.string().min(3, "Preencha este campo!"),
	genericName: z.string().min(3, "Preencha este campo!"),
	category: z.string().min(3, "Preencha este campo"),
	origin: z.string().min(3, "Preencha este campo!"),
	validateDate: z.date(),
	unityPrice: z.number().min(1, "Preencha este campo!"),
	quantity: z.number().min(1, "Preencha este campo!"),
})

export type EditMedicinalFormData = z.infer<typeof editMedicinalSchema>
