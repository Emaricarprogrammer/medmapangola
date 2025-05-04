import { Helmet } from "react-helmet-async"

import { Toolbar } from "@/components/pharmacy-ui/toolbar"
import { Pagination } from "@/components/general-ui/pagination"

import { House, Info, Search, SearchX } from "lucide-react"
import { MedicinalCard } from "./medicinal-card"
import { useQuery } from "@tanstack/react-query"
import { getMedicinals, Medicamento } from "@/api/pharmacy/get-medicinals"
import { MedicinalSkeleton } from "./medicinal-skeleton"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/motion"

export function Home() {
	const {
		data: result,
		isFetching,
		isError,
	} = useQuery({
		queryKey: ["medicinals"],
		queryFn: getMedicinals,
	})

	if (isError) {
		toast.error("Erro ao carregar medicamentos!")
	}

	const [allMedicinals, setAllMedidinals] = useState<Medicamento[]>()
	const [filteredMedicinals, setFIlteredMedicinals] = useState<Medicamento[]>()
	const [query, setQuery] = useState("")

	useEffect(() => {
		if (!allMedicinals) return

		const normalizedQuery = query.trim().toLowerCase()

		const filtereds = allMedicinals.filter((medicinal) =>
			medicinal.nome_generico
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.toLowerCase()
				.includes(normalizedQuery)
		)

		setFIlteredMedicinals(filtereds)
	}, [query, allMedicinals])

	useEffect(() => {
		setAllMedidinals(result?.response)
	}, [result?.response])

	return (
		<>
			<Helmet title="Painel Farmácia" />

			<div className="w-full">
				<Toolbar
					children={<House className="text-emerald-700 h-6 w-6" />}
					legend="Home"
				/>

				<div className="mt-4 bg-white relative">
					<Input
						placeholder="Pesquise por um medicamento"
						className="h-12 rounded-xl text-lg pl-4"
						value={query}
						onChange={(e) => {
							setQuery(e.target.value)
						}}
					/>
					<Search className="absolute right-6 text-neutral-400 w-5 h-5 top-4" />
				</div>

				<AnimatePresence>
					{filteredMedicinals?.length === 0 && (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto mt-10"
						>
							<SearchX className="w-12 h-12 text-rose-400 mb-4" />
							<h3 className="text-xl font-semibold text-gray-800 mb-2">
								Nenhum resultado encontrado
							</h3>
							<p className="text-gray-500 mb-4">
								Não encontramos medicamentos para:{" "}
								<span className="font-medium text-gray-700">"{query}"</span>
							</p>
							<div className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full text-sm inline-flex items-center">
								<Info className="w-4 h-4 mr-1.5" />
								Tente buscar com termos diferentes
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="h-[40rem] flex-col flex overflow-y-scroll">
					<motion.div
						variants={staggerContainer()}
						initial="hidden"
						animate="show"
						className="py-6 max-xl:h-[52rem] max-sm:h-[40rem] grid grid-cols-3 gap-8 max-xl:grid-cols-2 max-lg:grid-cols-1 overflow-y-scroll"
					>
						{isFetching || isError || result?.response === undefined
							? Array.from({ length: 6 }).map((_, index) => (
									<MedicinalSkeleton key={index} />
							  ))
							: filteredMedicinals?.map((medicinal, index) => (
									<motion.div
										key={medicinal.id_medicamento}
										variants={fadeIn("up", "spring", index * 0.1, 0.5)}
									>
										<MedicinalCard medicinal={medicinal} />
									</motion.div>
							  ))}
					</motion.div>

					<div className="mb-auto">
						<Pagination
							legend="Medicamentos"
							currentPage={1}
							totalItem={result?.pagination.totalItems || 0}
							perPage={4}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
