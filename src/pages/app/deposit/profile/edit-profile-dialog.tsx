import { Button } from "@/components/ui/button"
import { DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { getProfile } from "@/api/general/get-profile"
import { editProfile } from "@/api/general/edit-profile"

const editProfileSchema = z.object({
	firma: z.string().min(1, "Firma inválida!"),
	nif: z.string().min(10, "NIF inválido! Deve ter pelo menos 10 caracteres"),
	cidade: z.string().min(3, "Cidade deve ter pelo menos 3 caracteres"),
	rua: z.string().min(1, "Preencha este campo!"),
	numero: z.number().min(1, "Preencha este campo!"),
	logradouro: z.string().min(1, "Preencha este campo!"),
	contacto: z.coerce.number().min(9, "Telefone deve ter pelo menos 9 dígitos"),
	email: z.string().email("E-mail inválido!"),
	password: z
		.string()
		.min(8, "Senha deve ter no mínimo 8 caracteres")
		.optional(),
	newPassword: z
		.string()
		.min(8, "Nova senha deve ter no mínimo 8 caracteres")
		.optional(),
})

type EditProfileFormData = z.infer<typeof editProfileSchema>

export function EditProfileDialog() {
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: getProfile,
	})

	const { mutateAsync: editProfileFn } = useMutation({
		mutationFn: editProfile,
	})

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, dirtyFields },
		getValues,
	} = useForm<EditProfileFormData>({
		defaultValues: profile
			? {
					firma: profile.firma_entidade,
					email: profile.email,
					contacto: profile.contacto,
					nif: String(profile.NIF_entidade),
					logradouro: profile.logradouro,
					rua: profile.rua,
					numero: profile.numero,
					cidade: profile.cidade,
			  }
			: undefined,
	})

	const handleEditProfile = async (data: EditProfileFormData) => {
		try {
			// Criar payload apenas com campos alterados
			const payload: Partial<EditProfileFormData> = {}

			// Adicionar campos modificados
			Object.keys(dirtyFields).forEach((key) => {
				const field = key as keyof EditProfileFormData
				const value = getValues(field)

				if (value !== undefined) {
					// Tratamento específico para cada tipo de campo
					switch (field) {
						case "numero":
						case "contacto":
							payload[field] = Number(value)
							break
						case "password":
						case "newPassword":
							// Só adiciona se não for string vazia
							if (value !== "") {
								payload[field] = value as string
							}
							break
						default:
							// Para todos outros campos (string)
							payload[field] = value as string
					}
				}
			})
			// Adicionar senhas apenas se foram preenchidas
			if (data.password && data.newPassword) {
				payload.password = data.password
				payload.newPassword = data.newPassword
			}

			if (Object.keys(payload).length > 0) {
				await editProfileFn(payload)
				toast.success("Dados atualizados com sucesso!")
			} else {
				toast.info("Nenhuma alteração foi feita")
			}
		} catch (error: any) {
			toast.error(error?.response?.data?.message || "Erro ao atualizar perfil")
		}
	}

	return (
		<DialogContent className="sm:max-w-[700px]">
			<form onSubmit={handleSubmit(handleEditProfile)}>
				<div className="space-y-6">
					<div className="border-b pb-4">
						<h2 className="text-xl font-semibold text-gray-800">
							Editar Perfil - {profile?.firma_entidade}
						</h2>
						<p className="text-sm text-gray-500 mt-1">
							Atualize as informações do seu depósito
						</p>
					</div>

					<div className="grid gap-2">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firma">Nome do Depósito</Label>
								<Input
									id="firma"
									className="h-10"
									{...register("firma")}
									defaultValue={profile?.firma_entidade}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									className="h-10"
									{...register("email")}
									defaultValue={profile?.email}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="contacto">Telefone</Label>
								<Input
									id="contacto"
									type="tel"
									className="h-10"
									{...register("contacto", { valueAsNumber: true })}
									defaultValue={profile?.contacto}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="nif">NIF</Label>
								<Input
									id="nif"
									className="h-10"
									{...register("nif")}
									defaultValue={profile?.NIF_entidade}
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="rua">Rua</Label>
								<Input
									id="rua"
									className="h-10"
									{...register("rua")}
									defaultValue={profile?.rua}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="numero">Número</Label>
								<Input
									id="numero"
									type="number"
									className="h-10"
									{...register("numero", { valueAsNumber: true })}
									defaultValue={profile?.numero}
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="logradouro">Logradouro</Label>
								<Input
									id="logradouro"
									className="h-10"
									{...register("logradouro")}
									defaultValue={profile?.logradouro}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="cidade">Cidade</Label>
								<Input
									id="cidade"
									className="h-10"
									{...register("cidade")}
									defaultValue={profile?.cidade}
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="password">Senha atual</Label>
								<Input
									id="password"
									type="password"
									className="h-10"
									{...register("password")}
									placeholder="••••••••"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="newPassword">Nova senha</Label>
								<Input
									id="newPassword"
									type="password"
									className="h-10"
									{...register("newPassword")}
									placeholder="••••••••"
								/>
							</div>
						</div>
					</div>

					<div className="flex justify-end gap-3 pt-4 border-t">
						<Button type="button" variant="outline" className="h-10">
							Cancelar
						</Button>
						<Button
							type="submit"
							disabled={isSubmitting}
							className="h-10 bg-amber-700 hover:bg-amber-700"
						>
							{isSubmitting ? (
								<span className="flex items-center gap-2">
									<Loader2 className="h-4 w-4 animate-spin" />
									Salvando...
								</span>
							) : (
								"Salvar Alterações"
							)}
						</Button>
					</div>
				</div>
			</form>
		</DialogContent>
	)
}
