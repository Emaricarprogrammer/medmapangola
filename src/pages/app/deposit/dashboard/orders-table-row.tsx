import { Button } from "@/components/ui/button"
import { TableRow, TableCell } from "@/components/ui/table"
import { Search } from "lucide-react"
import { OrderStatus } from "./order-status"
import { OrdersStatusAction } from "./orders-status-action"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { OrdersDetails } from "./orders-details"
import { Medicamento } from "@/api/deposit/get-medicinals"
import { priceFormatter } from "@/utils/formatter"
import { formatDistanceToNow } from "date-fns"
import { pt } from "date-fns/locale"

interface Props {
	order: {
		id_aquisicao: string
		data_aquisicao: "2025-05-03T13:12:57.567Z"
		status: "pendente" | "concluido" | "cancelado"
		farmacia: {
			id: string
			nome: string
			contacto: number
		}
		medicamentos: Medicamento[]
		total_compra: number
	}
}

export function OrdersTableRow({ order }: Props) {
	return (
		<TableRow>
			<TableCell className="py-4 max-xl:py-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button
							title="Detalhes do Pedido"
							className="bg-transparent text-neutral-800 hover:bg-transparent"
							size="sm"
						>
							<Search className="w-4 h-4" />
						</Button>
					</DialogTrigger>

					<OrdersDetails order={order} />
				</Dialog>
			</TableCell>

			<TableCell className="py-4 max-xl:py-2">
				{order?.farmacia?.nome}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				{order?.medicamentos.length}
				{order?.medicamentos.length === 1 ? " Caixa" : " Caixas"}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				{priceFormatter.format(order.total_compra)}
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				{formatDistanceToNow(new Date(order?.data_aquisicao), {
					locale: pt,
				})}
			</TableCell>

			<TableCell className="py-4 max-xl:py-2">
				<OrderStatus status={order.status} />
			</TableCell>

			<TableCell className="py-4 max-xl:py-2">
				<OrdersStatusAction order={order} status={order?.status} />
			</TableCell>
		</TableRow>
	)
}
