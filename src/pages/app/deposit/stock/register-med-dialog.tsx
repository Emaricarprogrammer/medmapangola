import { registerMedicinal } from "@/api/deposit/register-medicinal"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	RegisterMedicinalFormData,
	registerMedicinalSchema,
} from "@/schemas/register-medicinal"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import { Loader2, Plus, UploadCloud } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function RegisterMedDialog() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		setValue,
	} = useForm<RegisterMedicinalFormData>({
		resolver: zodResolver(registerMedicinalSchema),
	})

	const [modalState, setModalState] = useState<boolean>(false)

	const queryClient = useQueryClient()

	const { mutateAsync: registerMedicinalFn } = useMutation({
		mutationFn: registerMedicinal,
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["my-medicines"] })
			setModalState(false)
		},
		onError(error: any) {
			toast.error(error?.response?.data?.message)
		},
	})

	const storedToken = localStorage.getItem("accessToken")
	if (!storedToken || typeof storedToken !== "string") {
		throw new Error("Token de autenticação ausente ou inválido")
	}
	const { id_entidade: id_entidade_fk } = jwtDecode<any>(storedToken)

	async function handleRegisterNewMedicinal({
		categoria_medicamento,
		imagem,
		nome_comercial,
		nome_generico,
		origem_medicamento,
		preco_medicamento,
		quantidade_disponivel,
		validade_medicamento,
	}: RegisterMedicinalFormData) {
		console.log({
			categoria_medicamento,
			imagem,
			nome_comercial,
			nome_generico,
			origem_medicamento,
			preco_medicamento,
			quantidade_disponivel,
			validade_medicamento,
			id_entidade_fk,
		})
		try {
			await registerMedicinalFn({
				categoria_medicamento,
				imagem,
				nome_comercial,
				nome_generico,
				origem_medicamento,
				preco_medicamento,
				quantidade_disponivel,
				validade_medicamento,
				id_entidade_fk,
			})
			toast.success(`${nome_comercial} Cadastrado com Sucesso!`)
		} catch {}
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setValue("imagem", file, { shouldValidate: true })
		}
	}

	return (
		<Dialog open={modalState} onOpenChange={setModalState}>
			<DialogTrigger>
				<Button
					type="button"
					className="flex items-center font-bold rounded-lg bg-gradient-to-tr to-emerald-500 from-emerald-600 gap-1"
				>
					<Plus className="w-4 h-4" />
					<span className="max-sm:hidden">Novo Medicamento</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cadastrar Novo Medicamento</DialogTitle>
				</DialogHeader>

				<form
					action=""
					className="mt-4 flex flex-col gap-5"
					onSubmit={handleSubmit(handleRegisterNewMedicinal)}
				>
					<div className="flex flex-col gap-2">
						<label className="flex flex-col items-center justify-center h-20 px-4 border-2 border-dashed w-full rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100">
							{watch("imagem") ? (
								<div className="relative w-full h-full flex items-center justify-center">
									<img
										src={URL.createObjectURL(watch("imagem"))}
										alt="Preview"
										className="max-h-full max-w-full object-contain p-2"
									/>
								</div>
							) : (
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<UploadCloud className="animate-ping w-6 h-6 mb-2 text-foreground/50" />
									<p className="text-sm text-foreground/50">
										<span className="font-semibold">
											Selecione a imagem do medicamento
										</span>
									</p>
								</div>
							)}
							<input
								type="file"
								className="hidden"
								accept="image/*"
								onChange={handleImageChange}
							/>
						</label>
						<span className="text-sm text-rose-600">
							{errors.imagem && errors.imagem.message}
						</span>
					</div>

					<div className="grid grid-cols-2 gap-5">
						<div className="flex flex-col gap-2">
							<Label className="text-foreground/80 text-sm">
								Nome Comercial
							</Label>
							<Input
								className="bg-neutral-50 h-10"
								placeholder="Paracetamol"
								{...register("nome_comercial")}
							/>
							<span className="text-sm text-rose-600">
								{errors.nome_comercial && errors.nome_comercial.message}
							</span>
						</div>

						<div className="flex flex-col gap-2">
							<Label className="text-foreground/80 text-sm">
								Nome Genérico
							</Label>
							<Input
								className="bg-neutral-50 h-10"
								placeholder="Paracetamol"
								{...register("nome_generico")}
							/>
							<span className="text-sm text-rose-600">
								{errors.nome_generico && errors.nome_generico.message}
							</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-5">
						<div className="flex flex-col gap-2">
							<Label className="text-foreground/80 text-sm">Origem</Label>
							<Input
								className="bg-neutral-50 h-10"
								placeholder="Portugal"
								{...register("origem_medicamento")}
							/>
							<span className="text-sm text-rose-600">
								{errors.origem_medicamento && errors.origem_medicamento.message}
							</span>
						</div>

						<div className="flex flex-col gap-2">
							<Label className="text-foreground/80 text-sm">Validade</Label>
							<Input
								type="date"
								className="bg-neutral-50 h-10"
								{...register("validade_medicamento")}
							/>
							<span className="text-sm text-rose-600">
								{errors.validade_medicamento &&
									errors.validade_medicamento.message}
							</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-5">
						<div className="flex flex-col gap-2">
							<Label className="text-foreground/80 text-sm">
								Preço Unitário
							</Label>
							<Input
								type="number"
								className="bg-neutral-50 h-10"
								placeholder="1900 KZ"
								{...register("preco_medicamento", { valueAsNumber: true })}
							/>
							<span className="text-sm text-rose-600">
								{errors.preco_medicamento && errors.preco_medicamento.message}
							</span>
						</div>

						<div className="flex flex-col gap-2">
							<Label className="text-foreground/80 text-sm">Quantidade</Label>
							<Input
								type="number"
								className="bg-neutral-50 h-10"
								placeholder="12"
								{...register("quantidade_disponivel", { valueAsNumber: true })}
							/>
							<span className="text-sm text-rose-600">
								{errors.quantidade_disponivel &&
									errors.quantidade_disponivel.message}
							</span>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<Label className="text-foreground/80 text-sm">Categoria</Label>
						<Input
							className="bg-neutral-50 h-10"
							placeholder="Analgésico"
							{...register("categoria_medicamento")}
						/>
						<span className="text-sm text-rose-600">
							{errors.categoria_medicamento &&
								errors.categoria_medicamento.message}
						</span>
					</div>

					<Button
						type="submit"
						disabled={isSubmitting}
						className="flex items-center font-bold rounded-xl h-11 bg-emerald-600 hover:bg-emerald-600 gap-1"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="animate-spin w-4 h-4" />
								<span>Cadastrando Medicamento...</span>
							</>
						) : (
							<>
								<Plus className="w-4 h-4" />
								<span>Cadastrar</span>
							</>
						)}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
