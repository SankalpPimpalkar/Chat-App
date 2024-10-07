import { Plus, Search } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import RoomModal from "./RoomModal"

export default function Navbar() {

    const location = useLocation()
    const [modalOpen, setModalOpen] = useState(false)

    const handleModal = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <div className="p-5 flex items-center justify-between border-b border-gray-700 sticky top-0 z-10 bg-primary">
            <Link to={"/"} className="font-bold text-xl">
                ChatApp
            </Link>

            <div className="flex items-center gap-6">
                <button onClick={handleModal}>
                    <Plus />
                </button>
                <Link to={"/search"}>
                    <Search className={`hover:text-accent duration-500 transition-colors ${location.pathname.startsWith("/search") && "text-accent"}`} />
                </Link>

                <Link to={"/profile"}>
                    <img className="w-8 h-8 rounded-full" src="/profile-placeholder.jpg" alt="profile" title="profile name" />
                </Link>
            </div>

            <RoomModal isOpen={modalOpen} onClose={handleModal} />
        </div>
    )
}
