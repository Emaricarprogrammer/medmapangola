import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { OrderStatus } from "./order-status"
import { Medicamento } from "@/api/deposit/get-orders"
import { priceFormatter } from "@/utils/formatter"

interface Props {
	order: {
		id_aquisicao: string
		status: "pendente" | "concluido" | "cancelado"
		farmacia: {
			nome: string
			contacto: number
		}
		medicamentos: Medicamento[]
	}
}
export function OrdersDetails({ order }: Props) {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Pedido: {order?.id_aquisicao}</DialogTitle>
			</DialogHeader>
			<DialogDescription>Detalhes do pedido</DialogDescription>

			<div className="space-y-4">
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="text-muted-foreground">Status</TableCell>
							<TableCell className="flex justify-end">
								<OrderStatus status={order?.status} />
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-muted-foreground">Cliente</TableCell>
							<TableCell className="flex justify-end">
								{order?.farmacia?.nome}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="text-muted-foreground">Telefone</TableCell>
							<TableCell className="flex justify-end">
								+244 {order?.farmacia?.contacto}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Medicamentos</TableHead>
							<TableHead className="text-right">Qtd.</TableHead>
							<TableHead className="text-right">Preço</TableHead>
							<TableHead className="text-right">Total</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{order?.medicamentos?.map((medicamento) => {
							return (
								<TableRow>
									<TableCell>{medicamento.nome_medicamento}</TableCell>
									<TableCell className="text-center">
										{medicamento.quantidade}
									</TableCell>
									<TableCell className="text-right">
										{priceFormatter.format(medicamento.preco)}
									</TableCell>
									<TableCell className="text-right">
										{priceFormatter.format(
											medicamento.preco * medicamento.quantidade
										)}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</div>
		</DialogContent>
	)
}
