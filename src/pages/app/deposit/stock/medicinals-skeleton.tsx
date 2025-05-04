import { TableRow, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export function MedicamentoTableRowSkeleton() {
	return (
		<TableRow>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="w-6 h-6 rounded-full" />
			</TableCell>

			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[120px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[120px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[100px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[60px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[80px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[80px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-6 w-[80px] rounded-full" />
			</TableCell>

			<TableCell>
				<div className="flex items-center gap-6">
					<Skeleton className="h-8 w-20 rounded-md" />
					<Skeleton className="h-8 w-20 rounded-md" />
				</div>
			</TableCell>
		</TableRow>
	)
}
