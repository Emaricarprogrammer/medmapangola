import { TableHeader, TableRow, TableHead } from "@/components/ui/table"

export function EntityTableHead() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Nome entidade</TableHead>
        <TableHead>Tipo de entidade</TableHead>
        <TableHead>Criado Há</TableHead>
        <TableHead className="w-[200px]">Acção</TableHead>
      </TableRow>
    </TableHeader>
  )
}
