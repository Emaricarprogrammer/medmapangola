import { Button } from "@/components/ui/button"
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	EditMedicinalFormData,
	editMedicinalSchema,
} from "@/schemas/edit-medicinal"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Pencil, UploadCloud } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function EditMedicinalDialog() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		setValue,
	} = useForm<EditMedicinalFormData>({
		resolver: zodResolver(editMedicinalSchema),
	})

	async function handleEditMedicinal(data: EditMedicinalFormData) {
		await new Promise((resolve) => setTimeout(resolve, 2000))

		try {
			toast.success(`${data.tradeName} Medicamento Editado com Sucesso!`)
		} catch {
			toast.error("Ops! Erro ao editar medicamento")
		}
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setValue("image", file)
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Editar Medicamento</DialogTitle>
			</DialogHeader>

			<form
				action=""
				className="mt-4 flex flex-col gap-5"
				onSubmit={handleSubmit(handleEditMedicinal)}
			>
				<div className="flex flex-col gap-2">
					<label className="flex flex-col items-center justify-center h-20 px-4 border-2 border-dashed w-full rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100">
						{watch("image") ? (
							<div className="relative w-full h-full flex items-center justify-center">
								<img
									src={URL.createObjectURL(watch("image"))}
									alt="Preview"
									className="max-h-full max-w-full object-contain p-2"
								/>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<UploadCloud className="animate-ping  w-6 h-6 mb-2 text-foreground/50" />
								<p className="text-sm text-foreground/50">
									<span className="font-semibold">
										Selecione a nova imagem do medicamento
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
						{errors.image && errors.image.message}
					</span>
				</div>

				<div className="grid grid-cols-2 gap-5">
					<div className="flex flex-col gap-2">
						<Label className="text-foreground/80 text-sm">Nome Comercial</Label>
						<Input
							className="bg-neutral-50 h-10"
							placeholder="Paracetamol"
							{...register("tradeName")}
						/>
						<span className="text-sm text-rose-600">
							{errors.tradeName && errors.tradeName.message}
						</span>
					</div>

					<div className="flex flex-col gap-2">
						<Label className="text-foreground/80 text-sm">Nome Genérico</Label>
						<Input
							className="bg-neutral-50 h-10"
							placeholder="Paracetamol"
							{...register("genericName")}
						/>
						<span className="text-sm text-rose-600">
							{errors.genericName && errors.genericName.message}
						</span>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-5">
					<div className="flex flex-col gap-2">
						<Label className="text-foreground/80 text-sm">Origem</Label>
						<Input
							className="bg-neutral-50 h-10"
							placeholder="Portugal"
							{...register("origin")}
						/>
						<span className="text-sm text-rose-600">
							{errors.origin && errors.origin.message}
						</span>
					</div>

					<div className="flex flex-col gap-2">
						<Label className="text-foreground/80 text-sm">Validade</Label>
						<Input
							type="date"
							className="bg-neutral-50 h-10"
							{...register("validateDate", { valueAsDate: true })}
						/>
						<span className="text-sm text-rose-600">
							{errors.validateDate && errors.validateDate.message}
						</span>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-5">
					<div className="flex flex-col gap-2">
						<Label className="text-foreground/80 text-sm">Preço Unitário</Label>
						<Input
							type="number"
							className="bg-neutral-50 h-10"
							placeholder="1900 KZ"
							{...register("unityPrice", { valueAsNumber: true })}
						/>
						<span className="text-sm text-rose-600">
							{errors.unityPrice && errors.unityPrice.message}
						</span>
					</div>

					<div className="flex flex-col gap-2">
						<Label className="text-foreground/80 text-sm">Quantidade</Label>
						<Input
							type="number"
							className="bg-neutral-50 h-10"
							placeholder="12"
							{...register("quantity", { valueAsNumber: true })}
						/>
						<span className="text-sm text-rose-600">
							{errors.quantity && errors.quantity.message}
						</span>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Label className="text-foreground/80 text-sm">Categoria</Label>
					<Input
						className="bg-neutral-50 h-10"
						placeholder="Analgésico"
						{...register("category")}
					/>
					<span className="text-sm text-rose-600">
						{errors.category && errors.category.message}
					</span>
				</div>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="flex items-center font-bold rounded-xl h-11 bg-amber-600 hover:bg-amber-600 gap-1"
				>
					{isSubmitting ? (
						<>
							<Loader2 className="animate-spin w-4 h-4" />
							<span>Salvando alterações...</span>
						</>
					) : (
						<>
							<Pencil className=" w-4 h-4" />
							<span>Salvar alterações</span>
						</>
					)}
				</Button>
			</form>
		</DialogContent>
	)
}
