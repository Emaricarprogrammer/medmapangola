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
	  <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[700px] lg:max-w-[800px]">
		<DialogHeader className="border-b pb-3">
		  <DialogTitle className="text-lg sm:text-xl">
			Pedido: <span className="font-mono">{order?.id_aquisicao}</span>
		  </DialogTitle>
		  <DialogDescription className="text-sm sm:text-base">
			Detalhes do pedido
		  </DialogDescription>
		</DialogHeader>
  
		<div className="space-y-6 py-4">
		  {/* Informações básicas - Versão responsiva */}
		  <div className="overflow-hidden rounded-lg border">
			<Table className="min-w-full">
			  <TableBody>
				<TableRow className="hover:bg-transparent">
				  <TableCell className="py-3 font-medium text-muted-foreground w-[40%] sm:w-[30%]">
					Status
				  </TableCell>
				  <TableCell className="py-3 flex justify-end sm:justify-start">
					<OrderStatus status={order?.status} />
				  </TableCell>
				</TableRow>
  
				<TableRow className="hover:bg-transparent">
				  <TableCell className="py-3 font-medium text-muted-foreground">
					Cliente
				  </TableCell>
				  <TableCell className="py-3 flex justify-end sm:justify-start">
					{order?.farmacia?.nome}
				  </TableCell>
				</TableRow>
  
				<TableRow className="hover:bg-transparent">
				  <TableCell className="py-3 font-medium text-muted-foreground">
					Telefone
				  </TableCell>
				  <TableCell className="py-3 flex justify-end sm:justify-start">
					+244 {order?.farmacia?.contacto}
				  </TableCell>
				</TableRow>
			  </TableBody>
			</Table>
		  </div>
  
		  {/* Lista de medicamentos - Versão responsiva */}
		  <div className="overflow-hidden rounded-lg border">
			<div className="overflow-x-auto">
			  <Table className="min-w-full">
				<TableHeader className="bg-gray-50 dark:bg-gray-800">
				  <TableRow>
					<TableHead className="w-[50%] sm:w-[40%]">Medicamentos</TableHead>
					<TableHead className="text-center w-[15%]">Qtd.</TableHead>
					<TableHead className="text-right w-[20%]">Preço</TableHead>
					<TableHead className="text-right w-[25%]">Total</TableHead>
				  </TableRow>
				</TableHeader>
  
				<TableBody>
				  {order?.medicamentos?.map((medicamento, index) => (
					<TableRow key={`${medicamento.id_medicamento}-${index}`}>
					  <TableCell className="font-medium py-3">
						<div className="line-clamp-2">
						  {medicamento.nome_medicamento}
						</div>
					  </TableCell>
					  <TableCell className="text-center py-3">
						{medicamento.quantidade}
					  </TableCell>
					  <TableCell className="text-right py-3">
						{priceFormatter.format(medicamento.preco)}
					  </TableCell>
					  <TableCell className="text-right py-3 font-medium">
						{priceFormatter.format(
						  medicamento.preco * medicamento.quantidade
						)}
					  </TableCell>
					</TableRow>
				  ))}
				</TableBody>
			  </Table>
			</div>
		  </div>
  
		  {/* Total do pedido - Adicionado para melhor UX */}
		  <div className="flex justify-end">
			<div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-3 text-right">
			  <p className="text-sm text-muted-foreground">Total do Pedido</p>
			  <p className="text-lg font-bold">
				{priceFormatter.format(
				  order.medicamentos.reduce(
					(total, item) => total + (item.preco * item.quantidade),
					0
				  )
				)}
			  </p>
			</div>
		  </div>
		</div>
	  </DialogContent>
	)
  }