import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function EmptyProfile() {
	return (
		<div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:hidden">
			{Array.from({ length: 4 }).map((_, index) => {
				return (
					<Card
						key={index}
						className="p-5 flex flex-col gap-2 rounded-lg shadow-sm justify-between text-foreground"
					>
						<Skeleton className="w-48 h-4" />
						<Skeleton className="w-36 h-4" />
					</Card>
				)
			})}
		</div>
	)
}
