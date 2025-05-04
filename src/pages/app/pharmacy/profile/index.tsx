import { Toolbar } from "@/components/deposit-ui/toolbar"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
	BriefcaseBusiness,
	Building2,
	Mail,
	MapPin,
	PencilLine,
	Phone,
	User,
} from "lucide-react"
import { Helmet } from "react-helmet-async"
import { EditProfileDialog } from "./edit-profile-dialog"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/api/general/get-profile"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PharmacyProfile() {
	const { data: profile, isLoading } = useQuery({
		queryKey: ["profile"],
		queryFn: getProfile,
	})

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	}

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	}

	return (
		<>
			<Helmet title="Perfil da Farmácia" />

			<div className="w-full">
				<Toolbar
					children={
						<motion.div
							animate={{ rotate: [0, 10, -10, 0] }}
							transition={{ repeat: Infinity, duration: 2 }}
						>
							<User className="text-emerald-700 h-6 w-6" />
						</motion.div>
					}
					legend="Perfil da Farmácia"
				/>

				<Dialog>
					<motion.div
						className="p-6 bg-white rounded-xl shadow-lg mt-6 border border-emerald-100"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<motion.div
							className="flex flex-col md:flex-row gap-8"
							variants={container}
							initial="hidden"
							animate="show"
						>
							<motion.div className="flex-1 space-y-6" variants={item}>
								<div className="flex items-center gap-4">
									<motion.div
										className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-3 rounded-full shadow-sm"
										whileHover={{ scale: 1.05 }}
									>
										<Building2 className="h-6 w-6 text-emerald-600" />
									</motion.div>

									<div>
										<h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
											{!isLoading ? (
												profile?.firma_entidade || "Depósito Sem Nome"
											) : (
												<Skeleton className="w-56 h-8 rounded-full" />
											)}
										</h2>
										<p className="text-sm text-gray-500 mt-1">
											Depósito Farmacêutico
										</p>
									</div>
								</div>

								<Card className="border-emerald-100 bg-emerald-50/50">
									<CardContent className="p-4 space-y-4">
										<motion.div
											className="flex items-center gap-3"
											variants={item}
										>
											<Mail className="h-5 w-5 text-emerald-600" />
											<p className="text-gray-700">
												{!isLoading ? (
													profile?.email || "Não especificado"
												) : (
													<Skeleton className="w-48 h-4 rounded-full" />
												)}
											</p>
										</motion.div>

										<motion.div
											className="flex items-center gap-3"
											variants={item}
										>
											<Phone className="h-5 w-5 text-emerald-600" />
											<span className="text-gray-700">
												{!isLoading ? (
													profile?.contacto || "Não especificado"
												) : (
													<Skeleton className="w-48 h-4 rounded-full" />
												)}
											</span>
										</motion.div>

										<motion.div
											className="flex items-start gap-3"
											variants={item}
										>
											<MapPin className="h-5 w-5 text-emerald-600 mt-1" />
											<span className="text-gray-700">
												{!isLoading ? (
													`${profile?.rua || ""}, ${
														profile?.cidade || ""
													}`.trim() || "Endereço não especificado"
												) : (
													<Skeleton className="w-64 h-4 rounded-full" />
												)}
											</span>
										</motion.div>
									</CardContent>
								</Card>

								<motion.div variants={item}>
									<DialogTrigger asChild>
										<Button
											variant="outline"
											className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700 hover:from-emerald-100 hover:to-emerald-200 shadow-sm"
										>
											<PencilLine className="h-4 w-4" />
											<span>Editar Perfil</span>
										</Button>
									</DialogTrigger>
								</motion.div>
							</motion.div>

							<motion.div className="flex-1" variants={item}>
								<Card className="border-emerald-100 bg-emerald-50/50 h-full">
									<CardHeader>
										<h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
											<User className="h-5 w-5 text-emerald-600" />
											Informações Legais
										</h3>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="flex items-center gap-3">
												<BriefcaseBusiness className="h-5 w-5 text-emerald-600" />
												<div>
													<p className="text-sm text-gray-500">NIF Entidade</p>
													<p className="text-gray-700 font-medium">
														{!isLoading ? (
															profile?.NIF_entidade || "Não especificado"
														) : (
															<Skeleton className="w-48 h-4 rounded-full" />
														)}
													</p>
												</div>
											</div>

											<div className="mt-6">
												<Avatar className="w-20 h-20 mx-auto border-2 border-emerald-200 shadow-md">
													<AvatarFallback className="bg-emerald-100 text-emerald-600 font-bold text-4xl">
														{profile?.firma_entidade?.charAt(0) || "D"}
													</AvatarFallback>
												</Avatar>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>
					</motion.div>

					<EditProfileDialog />
				</Dialog>
			</div>
		</>
	)
}
