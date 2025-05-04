import { TableHeader, TableRow, TableHead } from "@/components/ui/table"

export function MedicinalTableHead() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">******</TableHead>
        <TableHead className="w-[250px]">Nome Comercial</TableHead>
        <TableHead className="w-[250px]">Nome Genérico</TableHead>
        <TableHead className="w-[200px]">Categoria</TableHead>
        <TableHead className="w-[100px]">Qtd.</TableHead>
        <TableHead className="w-[150px]">Origem</TableHead>
        <TableHead className="w-[150px]">Preço Unitário</TableHead>
        <TableHead className="w-[150px]">Validade</TableHead>
        <TableHead className="w-[150px]" colSpan={3}>
          Observações
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
