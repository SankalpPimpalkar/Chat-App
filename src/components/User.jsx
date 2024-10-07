/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function User({ userData, loggedInUser }) {
    const [isUserFriend, setIsUserFriend] = useState(false);
    const { user } = useAuthContext();

    const handleToggleFriendship = async () => {
        try {
            const url = `${import.meta.env.VITE_SERVER_API_URL}`;
            const { data } = await axios.post(`${url}/users/friendship`, {
                userId: userData._id,
            }, { withCredentials: true });

            if (data.success) {
                setIsUserFriend(prevState => !prevState);
                toast.success(data.message);
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        if (user && user.friends) {
            setIsUserFriend(user.friends.includes(userData._id));
        }
    }, [user, userData._id]);

    return (
        <div className="border border-gray-700 p-3 flex items-center justify-between rounded-md hover:bg-secondary duration-500 transition-colors cursor-pointer">
            <Link to={`/search/${userData._id}`} className="flex gap-5">
                <img className="w-12 h-12 rounded-full" src={userData.avatar || "/profile-placeholder.jpg"} alt="profile" />

                <div>
                    <h1 className="font-semibold text-lg">{userData.fullName}</h1>
                    <p className="text-sm">@{userData.username}</p>
                </div>
            </Link>

            {loggedInUser?._id !== userData._id && (
                <button onClick={handleToggleFriendship} className="px-3 text-xs text-accent">
                    {isUserFriend ? "Remove Friend" : "Add Friend"}
                </button>
            )}
        </div>
    );
}

