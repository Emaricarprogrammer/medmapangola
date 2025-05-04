type OrderStatus = "pendente" | "concluido" | "cancelado"

interface OrderStatusProps {
	status: OrderStatus
}

export function OrderStatus({ status }: OrderStatusProps) {
	return (
		<div className="flex items-center gap-2">
			{status === "pendente" && (
				<>
					<span className="w-2 h-2 rounded-full bg-yellow-500"></span>
					<span>Pendente</span>
				</>
			)}
			{status === "concluido" && (
				<>
					<span className="w-2 h-2 rounded-full bg-emerald-600"></span>
					<span>Aprovado</span>
				</>
			)}
			{status === "cancelado" && (
				<>
					<span className="w-2 h-2 rounded-full bg-rose-600"></span>
					<span>Cancelado</span>
				</>
			)}
		</div>
	)
}
