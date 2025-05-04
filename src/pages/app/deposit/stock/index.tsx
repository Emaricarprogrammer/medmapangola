import { Helmet } from "react-helmet-async"
import { Package } from "lucide-react"
import { Toolbar } from "@/components/deposit-ui/toolbar"

import { Table, TableBody } from "@/components/ui/table"
import { Pagination } from "@/components/general-ui/pagination"
import { RegisterMedDialog } from "./register-med-dialog"

import { MedicinalTableRow } from "./medicinal-table-row"
import { MedicinalTableHead } from "./medicinal-table-head"
import { useQuery } from "@tanstack/react-query"
import { getMedicinals } from "@/api/deposit/get-medicinals"
import { MedicamentoTableRowSkeleton } from "./medicinals-skeleton"
import { useContext, useEffect } from "react"
import { MedicinesContext } from "@/contexts/deposit-meicines"
import { EmptyMedicinesState } from "./empty-stock"

export function Stock() {
	const { data, isFetching } = useQuery({
		queryKey: ["my-medicines"],
		queryFn: getMedicinals,
	})
	const { updateMedicines } = useContext(MedicinesContext)

	useEffect(() => {
		updateMedicines(data?.response.length || 0)
	}, [data?.response])

	return (
		<>
			<Helmet title="Stock de Medicamentos" />

			<div className="w-full">
				<Toolbar
					children={<Package className="text-emerald-700 h-6 w-6" />}
					legend="Stock"
				/>

				<div className="mt-10 flex items-center justify-between">
					<h1 className="font-semibold px-1 flex items-center gap-1 text-neutral-700">
						Adcionados Recentemente ({data?.response.length})
					</h1>

					<RegisterMedDialog />
				</div>

				<div className="flex flex-col justify-between h-[36rem]">
					<div className="mt-8 bg-white p-4 max-h-[30rem] overflow-y-scroll rounded-lg border shadow-sm">
						<Table className="w-full">
							<MedicinalTableHead />

							{isFetching &&
								Array.from({ length: 3 }).map(() => {
									return <MedicamentoTableRowSkeleton />
								})}

							<TableBody>
								{!isFetching &&
									data?.response.map((medicamento) => {
										return (
											<MedicinalTableRow
												medicamento={medicamento}
												key={medicamento.id_medicamento}
											/>
										)
									})}
							</TableBody>
						</Table>
					</div>

					{!isFetching && data?.response === undefined && (
						<EmptyMedicinesState />
					)}

					<Pagination
						currentPage={1}
						legend="Medicamentos"
						totalItem={20}
						perPage={3}
					/>
				</div>
			</div>
		</>
	)
}
