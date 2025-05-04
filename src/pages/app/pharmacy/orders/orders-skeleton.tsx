import { TableRow, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export function OrderTableRowSkeleton() {
	return (
		<TableRow>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[120px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[80px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[100px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[40px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[60px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[80px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[60px]" />
			</TableCell>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[100px]" />
			</TableCell>
		</TableRow>
	)
}
