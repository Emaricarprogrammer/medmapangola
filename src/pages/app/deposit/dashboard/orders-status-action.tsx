import { aproveOrder } from "@/api/deposit/aprove-order"
import { cancelOrder } from "@/api/deposit/cancel-order"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import { ArrowRight, Loader2, MessageCircle, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface Props {
	status: "pendente" | "concluido" | "cancelado"
	order: {
		id_aquisicao: string
		data_aquisicao: string
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
	const [aproveMessage, setAproveMessage] = useState("")
	const [cancelMessage, setCancelMessage] = useState("")

	const [approveModalVisible, setAproveModalVisible] = useState<boolean>(false)
	const [cancelModalVisible, setCancelModalVisible] = useState<boolean>(false)

	const storedToken = localStorage.getItem("accessToken")
	if (!storedToken || typeof storedToken !== "string") {
		throw new Error("Token de autenticação ausente ou inválido")
	}
	const { id_entidade } = jwtDecode<any>(storedToken)

	const queryClient = useQueryClient()

	const { mutateAsync: aproveOrderFn, isPending: isAproving } = useMutation({
		mutationFn: aproveOrder,
		onSuccess() {
			setAproveModalVisible(false)
			queryClient.invalidateQueries({
				queryKey: ["my-orders", id_entidade || 0],
				refetchType: "active",
			})

			toast.success("Pedido Aprovado!", {
				position: "bottom-right",
			})
		},
		onError(error: any) {
			setAproveModalVisible(false)
			queryClient.invalidateQueries({
				queryKey: ["my-orders", id_entidade || 0],
				refetchType: "active",
			})
			toast.error(error.response.data.message, {
				position: "bottom-right",
			})
		},
	})

	const { mutateAsync: cancelOrderFn, isPending: isCanceling } = useMutation({
		mutationFn: cancelOrder,
		onSuccess() {
			setCancelModalVisible(false)
			queryClient.invalidateQueries({
				queryKey: ["my-orders", id_entidade || 0],
				refetchType: "active",
			})

			toast.success("Pedido Cancelado!", {
				position: "bottom-right",
			})
		},
		onError(error: any) {
			toast.error(error.response.data.message, {
				position: "bottom-right",
			})
		},
	})

	async function hadleAproveOrder(orderId: string) {
		await aproveOrderFn({
			aquisicao_status: "concluido",
			contacto_farmacia: order.farmacia.contacto,
			id_aquisicao: orderId,
			mensagem: aproveMessage,
		})
	}

	async function hadleCancelOrder(orderId: string) {
		await cancelOrderFn({
			aquisicao_status: "cancelado",
			contacto_farmacia: order.farmacia.contacto,
			id_aquisicao: orderId,
			mensagem: cancelMessage,
		})
	}

	return (
		<div className="flex items-center gap-6">
			<Dialog open={approveModalVisible} onOpenChange={setAproveModalVisible}>
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

				<DialogContent>
					<DialogTitle>Aprovar Pedido De: {order.farmacia.nome}</DialogTitle>

					<div className="flex flex-col gap-5">
						<Input
							placeholder="Disponibilidade de Levantamento"
							className="h-16"
							value={aproveMessage}
							onChange={(e) => setAproveMessage(e.target.value)}
						/>
						<Button
							disabled={isAproving}
							className="ml-auto"
							onClick={() => {
								hadleAproveOrder(order.id_aquisicao)
							}}
						>
							{isAproving ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									Aprovando pedido....
								</>
							) : (
								<>
									<MessageCircle />
									Enviar Aprovação
								</>
							)}
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<Dialog open={cancelModalVisible} onOpenChange={setCancelModalVisible}>
				<DialogTrigger asChild>
					<Button
						disabled={
							status.includes("concluido") || status.includes("cancelado")
						}
						title="Cancelar Pedido"
						className="bg-transparent text-red-600 hover:bg-transparent"
						size="sm"
					>
						<X className="w-4 h-4" />
						Cancelar
					</Button>
				</DialogTrigger>

				<DialogContent>
					<DialogTitle>Cancelar Pedido De: {order.farmacia.nome}</DialogTitle>

					<div className="flex flex-col gap-5">
						<Input
							placeholder="Motivo de Cancelamento"
							className="h-16"
							value={cancelMessage}
							onChange={(e) => setCancelMessage(e.target.value)}
						/>
						<Button
							disabled={isCanceling}
							className="ml-auto cursor-pointer bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
							onClick={() => {
								hadleCancelOrder(order.id_aquisicao)
							}}
						>
							{isCanceling ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									Cancelando pedido...
								</>
							) : (
								<>
									<MessageCircle />
									Enviar
								</>
							)}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
