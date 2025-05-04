import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { TableRow, TableCell } from "@/components/ui/table"
import { Image, Loader2, Trash2 } from "lucide-react"
import { Medicamento } from "@/api/deposit/get-medicinals"
import { priceFormatter } from "@/utils/formatter"
import { differenceInDays, format, isValid, parseISO } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMedicinal } from "@/api/deposit/delete-medicinal"
import { toast } from "sonner"
import { EditMedDialog } from "./edit-medicinal-dialog"

interface Props {
	medicamento: Medicamento
}

export function MedicinalTableRow({ medicamento }: Props) {
	function calcularDiasParaExpirar(data: string) {
		const validadeDate = parseISO(data)

		if (!isValid(validadeDate)) return "Data inválida"

		const diasRestantes = differenceInDays(validadeDate, new Date())

		return diasRestantes >= 0 ? format(validadeDate, "dd/MM/yyyy") : "Expirado"
	}

	const queryClient = useQueryClient()

	const { mutateAsync: deleteMedicinalFn, isPending } = useMutation({
		mutationFn: (id_medicamento: string) => deleteMedicinal(id_medicamento),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["my-medicines"] })
			toast.warning("Medicamento Eliminado!")
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message || "Erro ao eliminar medicamento"
			)
		},
	})

	async function handleDeleteMedicinal(id_medicamento: string) {
		await deleteMedicinalFn(id_medicamento)
	}

	return (
		<TableRow>
			<TableCell className="py-4 max-xl:py-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button
							className="bg-transparent text-neutral-800 hover:bg-transparent"
							size="sm"
						>
							<Image className="w-4 h-4" />
						</Button>
					</DialogTrigger>

					<DialogContent className="">
						<DialogHeader>
							<DialogTitle>
								Prevezualização para {medicamento.nome_comercial}
							</DialogTitle>
						</DialogHeader>
						{!medicamento.imagem && (
							<div className="flex justify-center p-4">
								<Skeleton className="w-full max-w-[800px] h-[400px] rounded-lg" />
							</div>
						)}
						{medicamento.imagem && (
							<div className="flex justify-center p-4">
								<img
									src={medicamento.imagem}
									alt="Visualização ampliada"
									className="max-w-full max-h-[70vh] object-contain"
								/>
							</div>
						)}
					</DialogContent>
				</Dialog>
			</TableCell>

			<TableCell className="py-4 max-xl:py-2">
				{medicamento.nome_generico}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				{medicamento.nome_comercial}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				{medicamento.categoria}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				{medicamento.quantidade_disponivel}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">{medicamento.origem}</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				{priceFormatter.format(medicamento.preco)}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				{calcularDiasParaExpirar(medicamento.validade).includes("x") ? (
					<span className="px-3 py-1 rounded-full bg-red-50 text-red-600">
						Expirado
					</span>
				) : (
					<span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
						{calcularDiasParaExpirar(medicamento.validade)}
					</span>
				)}
			</TableCell>

			<TableCell>
				<div className="flex items-center gap-6">
					<Button
						disabled={isPending}
						onClick={() => {
							handleDeleteMedicinal(medicamento.id_medicamento)
						}}
						className="bg-transparent text-red-600 hover:bg-transparent"
						size="sm"
					>
						{isPending ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" />
								Aguarde...
							</>
						) : (
							<>
								<Trash2 className="w-4 h-4" />
								Eliminar
							</>
						)}
					</Button>

					<EditMedDialog medicamento={medicamento} />
				</div>
			</TableCell>
		</TableRow>
	)
}
