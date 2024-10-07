import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { EllipsisVertical, SendHorizontal } from "lucide-react";
import { getRoomByIdApi } from "../../../apis/room";
import toast from "react-hot-toast";
import { useSocket } from "../../../context/SocketContext";
import { getMessagesByRoomId } from "../../../apis/message";
import { useAuthContext } from "../../../context/AuthContext";

export default function Chat() {
    const params = useParams();
    const navigate = useNavigate();
    const socket = useSocket();

    const [roomDetails, setRoomDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const { user } = useAuthContext();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const dropdownRef = useRef(null);
    const chatContainerRef = useRef(null); // New ref for chat container

    const sendMessage = () => {
        if (input.trim() === "") return;

        socket.emit("send-message", params.chatId, user?._id, input);
        setInput("");
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            console.log(chatContainerRef.current)
            window.scrollTo(0, chatContainerRef.current.offsetTop);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages,chatContainerRef.current]);

    const participants = roomDetails?.participants
        .map((participant) => participant.username)
        .slice(0, 7)
        .join(", ");

    useEffect(() => {
        (async () => {
            const { success, data, message } = await getRoomByIdApi(params.chatId);

            if (success) {
                setRoomDetails(data.data);
            } else {
                toast.error(message);
                navigate("/");
            }

            setIsLoading(false);
        })();
    }, [params.chatId, navigate]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.emit("join-room", params.chatId);
        console.log("User joined room", params.chatId);

        return () => {
            socket.off("join-room");
        };
    }, [params.chatId, socket]);

    useEffect(() => {
        (async () => {
            const { success, data } = await getMessagesByRoomId(params.chatId);
            console.log(data);

            if (success) {
                setMessages(data.data);
            }
        })();
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on("receive-message", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, { content: newMessage.content, sender: newMessage.sender._id }]);
            console.log(newMessage)
        });

        return () => {
            socket.off("receive-message");
        };
    }, []);

    if (isLoading) {
        return (
            <p className="p-5 font-bold text-light/80">Loading Chats...</p>
        );
    }

    return (
        <div className="flex flex-col min-h-svh bg-primary relative">
            {/* Chat Header */}
            <div className="px-4 py-3 bg-secondary text-light flex justify-between items-center sticky top-[73px] w-full">
                <div className="flex items-center gap-3 group">
                    <img
                        className="w-10 h-10 rounded-full group-hover:opacity-80 duration-500 transition-all"
                        src="/profile-placeholder.jpg"
                        alt="profile"
                    />

                    <div>
                        <h1 className="text-base font-semibold group-hover:text-light/80 duration-500 transition-all">
                            {roomDetails?.roomName}
                        </h1>
                        <p className="text-xs font-medium text-accent group-hover:text-accent/80 duration-500 transition-all">
                            {participants}
                        </p>
                    </div>
                </div>

                {/* Ellipsis with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <EllipsisVertical
                        onClick={() => setDropdownVisible(!dropdownVisible)}
                        className="cursor-pointer w-6 h-6"
                    />

                    {/* Dropdown Menu */}
                    {dropdownVisible && (
                        <div className="absolute z-[9] right-0 mt-2 w-48 bg-secondary rounded-lg shadow-lg">
                            <ul>
                                <li className="px-4 py-2 text-light/70 hover:bg-primary/30 cursor-pointer">
                                    Room Details
                                </li>
                                <li className="px-4 py-2 text-light/70 hover:bg-primary/30 cursor-pointer">
                                    Mute
                                </li>
                                <li className="px-4 py-2 text-light/70 hover:bg-primary/30 cursor-pointer">
                                    Block
                                </li>
                                <li className="px-4 py-2 text-light/70 hover:bg-primary/30 cursor-pointer">
                                    Delete Chat
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Box */}
            <div
                className="flex-grow w-full min-h-full p-5 bg-transparent"
            >
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-light/60 text-center">
                            No messages yet. Start the conversation!
                        </p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${message.sender === user?._id ? "text-right" : "text-left"}`}
                        >
                            <span
                                className={`inline-block px-4 py-2 rounded-lg ${message.sender === user?._id
                                    ? "bg-accent/80 text-white"
                                    : "bg-secondary text-light"
                                    }`}
                            >
                                {message.content}
                            </span>
                        </div>
                    ))
                )}
                {/* For scrolltoBottom */}
                <div ref={chatContainerRef}></div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-primary border-t border-gray-700 flex items-center w-full max-w-xl sticky bottom-0">
                <input
                    className="flex-grow bg-secondary rounded-md py-3 px-4 mr-4 outline-none text-light/70"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    autoFocus
                />
                <button
                    className="px-4 bg-accent/70 py-3 rounded-md font-semibold text-primary"
                    onClick={sendMessage}
                >
                    <SendHorizontal />
                </button>
            </div>
        </div>
    );
}
