import { aproveOrder } from "@/api/deposit/aprove-order"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { ArrowRight, MessageCircle, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface Props {
	status: "pendente" | "concluido" | "cancelado"
	order: {
		id_aquisicao: string
		data_aquisicao: "2025-05-03T13:12:57.567Z"
		status: "pendente" | "concluido" | "cancelado"
		farmacia: {
			id: string
			nome: string
			contacto: number
		}
		total_compra: number
	}
}
export function OrdersStatusAction({ status, order }: Props) {
	const [message, setMessage] = useState("")
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const { mutateAsync: aproveOrderFn } = useMutation({
		mutationFn: aproveOrder,
		onSuccess() {
			setIsOpen(false)
			toast.success("Medicamento Aprovado!")
		},
		onError(error: any) {
			toast.error(error.response.data.message)
		},
	})

	async function hadleAproveOrder(orderId: string) {
		await aproveOrderFn({
			aquisicao_status: "concluido",
			contacto_farmacia: order.farmacia.contacto,
			id_aquisicao: orderId,
			mensagem: message,
		})
	}

	return (
		<div className="flex items-center gap-6">
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button
						disabled={
							status.includes("concluido") || status.includes("cancelado")
						}
						title="Aprovar Pedido"
						className="bg-transparent text-emerald-600 hover:bg-transparent"
						size="sm"
					>
						<ArrowRight className="w-4 h-4" />
						Aprovar
					</Button>
				</DialogTrigger>
				<DialogContent className="w-full max-w-md">
  						<div className="space-y-6">
    					<DialogTitle className="text-lg font-medium text-gray-900">Pedido: {order.id_aquisicao}</DialogTitle>
						<div className="space-y-4"><div className="space-y-2">
							<Input
							placeholder="Ex: Disponível para levantamento das 9h às 17h"
							className="h-24"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							/>
							<p className="text-xs text-gray-500">Informe os detalhes de disponibilidade de levantamento para o cliente</p>
							</div>
							<Button
							onClick={() => hadleAproveOrder(order.id_aquisicao)}
							className="w-full sm:w-auto ml-auto gap-2"
							disabled={!message.trim()}>
								<MessageCircle className="h-4 w-4" />Aprovar este pedido</Button>
								</div>
								</div>
							</DialogContent>
			</Dialog>

			<Button
				disabled={status.includes("concluido") || status.includes("cancelado")}
				title="Cancelar Pedido"
				className="bg-transparent text-red-600 hover:bg-transparent"
				size="sm">
				<X className="w-4 h-4" />
				Cancelar
			</Button>
		</div>
	)
}
