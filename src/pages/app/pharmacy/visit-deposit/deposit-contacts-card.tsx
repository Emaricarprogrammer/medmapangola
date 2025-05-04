import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Phone } from "lucide-react"

interface Props {
	contacts: number
}
export function DepositContactsCard({ contacts }: Props) {
	return contacts !== 0 ? (
		<Card className="p-5 flex flex-col gap-2 rounded-lg shadow-sm justify-between text-foreground">
			<strong className="flex">+244 {contacts}</strong>
			<div className="font-light text-sm flex items-center justify-between">
				<span>Contacto</span>
				<Phone className="w-4 h-4" />
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
