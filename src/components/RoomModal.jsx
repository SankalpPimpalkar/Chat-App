/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { createRoomApi } from "../apis/room";
import { useRoomContext } from "../context/RoomContext";

export default function RoomModal({ isOpen, onClose }) {

    const { user } = useAuthContext()
    const { getUserRooms } = useRoomContext()
    const [form, setForm] = useState({
        roomName: "",
        participants: [],
        roomDescription: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChangeEvent = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (event, participant) => {
        const { checked } = event.target;
        setForm((prevForm) => {
            const updatedParticipants = checked
                ? [...prevForm.participants, participant._id]
                : prevForm.participants.filter((prevParticipantId) => prevParticipantId != participant._id);

            return { ...prevForm, participants: updatedParticipants };
        });
        console.log(form)

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (form.roomName.trim() && form.participants.length > 0) {
            const { message, success } = await createRoomApi(form);

            if (success) {
                toast.success(message);
                getUserRooms();
            } else {
                toast.error(message);
            }

            setForm({
                ...form,
                roomName: "",
                participants: [],
                roomDescription: ""
            })
            onClose();
        } else {
            toast.error("Please fill in all fields.");
        }

        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2">
            <div className="bg-primary border border-secondary rounded-lg p-6 max-w-lg w-full">
                <h2 className="text-2xl font-extrabold">Create Room</h2>

                <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-start">
                        <label className="text-sm px-1 text-light/80" htmlFor="roomName">
                            Room Name
                        </label>
                        <input
                            type="text"
                            name="roomName"
                            value={form.roomName}
                            onChange={handleChangeEvent}
                            className="w-full mt-2 bg-secondary rounded-md text-base py-2 px-3 outline-none text-light/80"
                            placeholder="Room Name"
                        />
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="text-sm px-1 text-light/80" htmlFor="participants">
                            Select Participants
                        </label>
                        <div className="flex flex-col mt-2 space-y-2 w-full h-full max-h-60 overflow-y-scroll">
                            {user.friends.map((participant) => {
                                const isSelected = form.participants.includes(participant._id);
                                return (
                                    <label
                                        key={participant.username}
                                        className={`flex items-center px-4 py-3 cursor-pointer group rounded-md  ${isSelected ? 'bg-accent/70' : 'bg-secondary/60'}`}
                                    >
                                        <img
                                            className="w-9 h-9 rounded-full"
                                            src={participant.avatar || "/profile-placeholder.jpg"}
                                            alt="profile-photo"
                                        />

                                        <div className="flex flex-col items-start ml-4">
                                            <input
                                                type="checkbox"
                                                value={participant}
                                                checked={isSelected}
                                                onChange={(e) => handleCheckboxChange(e, participant)}
                                                className="mr-2 hidden"
                                            />
                                            <h3 className={`font-bold text-base text-light`}>
                                                {participant.fullName}
                                            </h3>
                                            <p className={`text-sm text-light/50`}>
                                                {'@' + participant.username}
                                            </p>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="text-sm px-1 text-light/80" htmlFor="roomDescription">
                            Room Description
                        </label>
                        <textarea
                            name="roomDescription"
                            value={form.roomDescription}
                            onChange={handleChangeEvent}
                            className="w-full mt-2 bg-secondary rounded-md text-base py-2 px-3 outline-none text-light/80"
                            placeholder="Room Description"
                            rows="4"
                        />
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`bg-red-500/70 hover:bg-red-500/60 text-light/90 py-2 px-4 font-semibold rounded-md disabled:bg-secondary`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`bg-accent/70 hover:bg-accent/60 text-light/90 py-2 px-4 font-semibold rounded-md disabled:bg-secondary`}
                        >
                            {isLoading ? 'Creating...' : 'Create Room'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
