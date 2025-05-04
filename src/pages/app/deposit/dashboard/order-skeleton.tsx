import { TableRow, TableCell } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export function OrdersTableRowSkeleton() {
	return (
		<TableRow>
			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="w-8 h-8 rounded-md" />
			</TableCell>

			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[120px]" />
			</TableCell>

			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[60px]" />
			</TableCell>

			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[80px]" />
			</TableCell>

			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-4 w-[100px]" />
			</TableCell>

			<TableCell className="py-4 max-xl:py-2">
				<Skeleton className="h-6 w-[100px] rounded-full" />
			</TableCell>

			<TableCell className="py-4 max-xl:py-2">
				<div className="flex gap-2">
					<Skeleton className="h-8 w-8 rounded-md" />
					<Skeleton className="h-8 w-8 rounded-md" />
				</div>
			</TableCell>
		</TableRow>
	)
}
