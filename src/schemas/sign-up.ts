import {
	Control,
	useForm,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form"
import { z } from "zod"

export const signUpScheme = z.object({
	firma: z.string().min(1, "Firma inválido!"),
	nif: z.string().min(10, "NIF tem de ter (10) Dígitos!"),
	tipo_entidade: z.enum(["farmacia", "deposito"]),
	cidade: z.string().min(3, "Preenha este campo!"),

	rua: z.string({ message: "Preencha este campo!" }),
	numero: z.number({ message: "Preencha este campo!" }),
	logradouro: z.string({ message: "Preencha este campo!" }),
	latitude: z.number({ message: "Coordenada inválida!" }),
	longitude: z.number({ message: "Coordenada inválida!" }),

	contacto: z.number({ message: "Telefone inválido!" }).min(9),
	email: z.string().email("E-mail inválido!"),
	password: z
		.string()
		.min(8, "Introduza uma palavra-passe de no mínimo 8 dígitos!"),
})

export type SignUpData = z.infer<typeof signUpScheme>

export interface FormStepProps {
	register: UseFormRegister<SignUpData>
	errors: ReturnType<typeof useForm>["formState"]["errors"]
	control?: Control<SignUpData>
	setValue: UseFormSetValue<SignUpData>
}
