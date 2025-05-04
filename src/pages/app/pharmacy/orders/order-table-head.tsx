import { TableHeader, TableRow, TableHead } from "@/components/ui/table"

export function OrderTableHead() {
	return (
		<TableHeader>
			<TableRow>
				<TableHead className="w-[200px]">Medicamento</TableHead>
				<TableHead className="w-[150px]">Categoria</TableHead>
				<TableHead className="w-[200px]">Fornecedor</TableHead>
				<TableHead className="w-[100px]">Quantidade</TableHead>
				<TableHead className="w-[200px]">Preço/Caixa</TableHead>
				<TableHead className="w-[200px]">Total de Compra</TableHead>
				<TableHead className="w-[250px]">Pedido Há</TableHead>
				<TableHead className="w-[150px]">Status</TableHead>
			</TableRow>
		</TableHeader>
	)
}
