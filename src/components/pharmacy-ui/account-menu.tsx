import { User2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Link } from "react-router-dom"

export function AccountMenu() {
  return (
    <Link to="/farmacia/perfil">
      <Avatar className="h-9 w-9 border cursor-pointer">
        <AvatarImage />
        <AvatarFallback className="bg-emerald-50 text-emerald-800">
          <User2 />
        </AvatarFallback>
      </Avatar>
    </Link>
  )
}
