import { Skeleton } from "@/components/ui/skeleton"

export function MedicinalSkeleton() {
  return (
    <div className="bg-white border-t-emerald-600 gap-3 p-6 flex rounded-xl max-sm:p-4 max-sm:flex-col border-2">
      <Skeleton className="w-20 h-20 max-sm:w-24 max-sm:h-24 rounded-lg" />

      <div className="flex-1 rounded-xl bg-neutral-100 flex flex-col gap-3 max-sm:gap-2">
        <div className="flex flex-col gap-2 p-3">
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>

        <div className="flex items-center px-3 gap-2 text-sm">
          <Skeleton className="h-4 w-4 rounded-lg" />
          <div className="grid gap-1 flex-1">
            <Skeleton className="h-3 w-3/4 rounded-md" />
            <Skeleton className="h-3 w-full rounded-md" />
          </div>
        </div>

        <div className="flex items-center px-3 gap-2">
          <Skeleton className="h-4 w-4 rounded-lg" />
          <Skeleton className="h-3 w-32 rounded-md" />
        </div>

        <footer className="border-t flex items-center">
          <div className="border-r p-2 flex-1">
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
          <div className="flex-1 p-2">
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
        </footer>
      </div>
    </div>
  )
}
