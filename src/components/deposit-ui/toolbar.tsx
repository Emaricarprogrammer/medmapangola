import { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "@/api/general/get-profile"
import { Skeleton } from "../ui/skeleton"

interface ToolbarProps {
	legend: string
	children: ReactNode
	isOnline?: boolean
	className?: string
}

export function Toolbar({
	legend,
	children,
	isOnline = true,
	className,
}: ToolbarProps) {
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: getProfile,
	})

	return (
		<motion.div
			className={cn(
				"w-full border border-gray-200 p-4 flex items-center justify-between bg-white rounded-lg shadow-sm",
				"hover:shadow-md transition-shadow duration-300",
				className
			)}
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="flex items-center gap-3 max-sm:gap-2">
				<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
					{children}
				</motion.div>
				<h1 className="text-lg font-semibold text-gray-800">{legend}</h1>
			</div>

			<div className="flex items-center gap-4">
				<div className="flex items-center gap-1.5">
					<span className="text-sm text-gray-500 hidden sm:inline">
						{isOnline ? "Online" : "Offline"}
					</span>
					<motion.div
						className={cn(
							"w-3 h-3 rounded-full",
							isOnline ? "bg-amber-500" : "bg-gray-400"
						)}
						animate={{
							scale: [1, 1.2, 1],
							opacity: isOnline ? [1, 0.8, 1] : 1,
						}}
						transition={{
							duration: isOnline ? 2 : 0,
							repeat: isOnline ? Infinity : 0,
						}}
					/>
				</div>

				{isOnline && (
					<motion.span
						className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
					>
						Ativo
					</motion.span>
				)}

				<div className="hidden md:flex flex-col items-start">
					{profile ? (
						<>
							<span className="text-sm font-medium text-gray-700">
								{profile?.firma_entidade}
							</span>
							<span className="text-xs text-gray-500">{profile?.email}</span>
						</>
					) : (
						<div className="space-y-1">
							<Skeleton className="h-4 w-24 rounded-md" />
							<Skeleton className="h-3 w-16 rounded-md" />
						</div>
					)}
				</div>
			</div>
		</motion.div>
	)
}
