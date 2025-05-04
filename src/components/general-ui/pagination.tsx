import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
	legend: string
	totalItem: number
	currentPage: number
	perPage: number
}

export function Pagination({
	currentPage,
	legend,
	perPage,
	totalItem,
}: PaginationProps) {
	return (
		<div className="text-sm flex px-2 items-center mt-8 justify-between">
			<div>
				<span>
					Todal de <strong>{totalItem}</strong> {"  "}{" "}
					<span className="max-sm:hidden">{legend}</span>
				</span>
			</div>

			<div className="flex items-center gap-4">
				<span>
					Página <strong>{currentPage}</strong> de <strong>{perPage}</strong>
				</span>
				<div className="flex items-center gap-2">
					<Button
						size="sm"
						title="Página Anterior"
						className="bg-white border text-foreground font-extrabold hover:bg-white/70"
					>
						<ChevronLeft />
					</Button>

					<Button
						size="sm"
						title="Próxima Página"
						className="bg-white border text-foreground font-extrabold hover:bg-white/70"
					>
						<ChevronRight />
					</Button>
				</div>
			</div>
		</div>
	)
}
