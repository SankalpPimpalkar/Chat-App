import { Search } from "lucide-react";
import ChatSession from "../../components/ChatSession";
import Debounce from "../../hooks/useDebounce";
import { useEffect, useState } from "react";
import { useRoomContext } from "../../context/RoomContext";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [chats, setChats] = useState([]);
    const { rooms, getUserRooms, isLoading } = useRoomContext();
    const debouncedSearchTerm = Debounce(searchTerm, 1000);

    useEffect(() => {
        getUserRooms();
    }, []);

    useEffect(() => {
        setChats(rooms);
    }, [rooms]);

    const createRegexPattern = (searchTerm) => {
        const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return new RegExp(escapedSearchTerm.split("").join(".*"), "i");
    };

    const filteredChats = chats.filter((chat) => {
        const regex = createRegexPattern(debouncedSearchTerm);

        const matchRoomName = regex.test(chat.roomName);

        const matchParticipants = chat.participants.some((participant) =>
            regex.test(participant.fullName) || regex.test(participant.username)
        );

        return matchRoomName || matchParticipants;
    });

    return (
        <div className="p-4">
            {/* Search Input */}
            <div className="flex bg-secondary p-3 gap-4 rounded-md">
                <Search className="w-7 h-7 text-light/60" />
                <input
                    type="text"
                    autoFocus
                    className="bg-transparent w-full text-lg text-light/60 outline-none placeholder:text-base"
                    placeholder="Search Friends or Rooms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Loader */}
            {isLoading && (
                <div className="flex justify-center mt-4">
                    <span className="text-light/60 text-lg">Loading...</span>
                </div>
            )}

            {/* Chat Sessions List */}
            <div className="mt-4 flex flex-col gap-1">
                {!isLoading && filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                        <ChatSession key={chat._id} chatData={chat} />
                    ))
                ) : (
                    !isLoading && <div className="text-light/60">No chats found</div>
                )}
            </div>
        </div>
    );
}
