/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import formatDateToReadable from "../utils/formatDate";
import { useState } from "react";

export default function ChatSession({ chatData }) {
    const [showTooltip, setShowTooltip] = useState(false);

    const participants = chatData.participants.map(participant => participant.username).join(", ");
    const createdDate = formatDateToReadable(chatData.createdAt);

    return (
        <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <Link
                to={`/chats/${chatData._id}`}
                className="border border-gray-700 p-3 flex items-center justify-between rounded-md hover:bg-secondary duration-500 transition-colors cursor-pointer"
            >
                <div className="flex gap-4 items-center">
                    <img className="w-12 h-12 rounded-full" src="/profile-placeholder.jpg" alt="profile" />

                    <div className="flex flex-col items-start gap-0.5">
                        <h1 className="font-semibold text-base">
                            {
                                chatData.roomName.length > 15 ?
                                chatData?.roomName?.slice(0, 15) + "..." :
                                chatData.roomName
                            }
                        </h1>
                        <p className="text-sm">
                            {chatData.messages?.[0]?.content}
                        </p>
                    </div>
                </div>

                <p className="px-3 text-xs text-accent">
                    {chatData.messages.length ? formatDateToReadable(chatData.messages?.[0]?.createdAt) : "Start Chat"}
                </p>
            </Link>

            <div
                className={`absolute top-0 right-0 mt-12 p-2 w-56 bg-gray-800 text-white text-sm rounded shadow-lg z-10 transition-all duration-300 cursor-pointer ${showTooltip ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-2'
                    }`}
            >
                <p><strong>Participants:</strong><br /> {participants}</p>
                <p><strong>Created on:</strong><br /> {createdDate}</p>
            </div>
        </div>
    );
}
