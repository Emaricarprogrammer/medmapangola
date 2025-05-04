import { TableRow, TableCell } from "@/components/ui/table"
import { OrderStatus } from "./order-status"

import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { priceFormatter } from "@/utils/formatter"

interface OrderProps {
	order: {
		firma_deposito: string
		categoria_medicamento: string
		id_medicamento: string
		nome_medicamento: string
		preco: number
		total_compra: number
		validade: string
	}
	data_aquisicao: string
	quantidade_medicamentos: number
	status: "pendente" | "concluido" | "cancelado"
}

export function OrderTableRow({
	order,
	data_aquisicao,
	quantidade_medicamentos,
	status,
}: OrderProps) {
	return (
		<TableRow>
			<TableCell className="py-4 max-xl:py-2">
				{order.nome_medicamento}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				{order.categoria_medicamento}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">{order.firma_deposito}</TableCell>
			<TableCell className="py-4 max-xl:py-2 text-center">
				{quantidade_medicamentos}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				{priceFormatter.format(order.preco)}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				{priceFormatter.format(order.total_compra)}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2 capitalize">
				{formatDistanceToNow(new Date(data_aquisicao), {
					locale: ptBR,
					addSuffix: true,
				})}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<OrderStatus status={status} />
			</TableCell>
		</TableRow>
	)
}
