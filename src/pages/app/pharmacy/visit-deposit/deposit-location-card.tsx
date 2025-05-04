import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Map } from "lucide-react"

interface Props {
	locale: string
}
export function DepositLocationCard({ locale }: Props) {
	return locale !== "" ? (
		<Card className="p-5 flex flex-col gap-2 shadow-sm rounded-lg justify-between text-foreground">
			<strong className="flex">{locale}</strong>
			<div className=" font-light text-sm flex items-center justify-between">
				<span>Localização</span>
				<Map className="w-4 h-4" />
			</div>
		</Card>
	) : (
		<Card className="p-5 flex flex-col gap-2 shadow-sm rounded-lg justify-between text-foreground">
			<Skeleton className="w-32 h-4" />
			<div className=" font-light text-sm flex items-center justify-between">
				<Skeleton className="w-16 h-4" />
				<Skeleton className="w-4 h-4" />
			</div>
		</Card>
	)
}
