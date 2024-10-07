import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import User from "../../../components/User";
import { toggleFriendship } from "../../../apis/user";
import url from "../../../constant";

export default function UserDetails() {
    const params = useParams();
    const [userData, setUserData] = useState(null); // Initialize with null to handle cases where userData might not be available
    const { user, getCurrentUser } = useAuthContext();
    const [isUserFriend, setIsUserFriend] = useState(false);

    const handleToggleFriendship = async () => {
        const { success, message } = await toggleFriendship(params.userId);

        if (success) {
            setIsUserFriend(prevState => !prevState);
            toast.success(message);
            await getCurrentUser(); // Refresh the logged-in user's data to reflect changes
        } else {
            toast.error(message);
        }
    };

    useEffect(() => {
        if (user && user.friends) {
            const isFriend = user.friends.includes(params.userId);
            setIsUserFriend(isFriend);
        }
    }, [user, params.userId]);

    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.post(`${url}/users/search-by-id`, {
                    userId: params.userId
                }, { withCredentials: true });
                setUserData(resp.data.data);
            } catch (error) {
                console.error("Failed to fetch user data", error);
                toast.error("Failed to fetch user data");
            }
        })();
    }, [params.userId, isUserFriend]);

    // Check if the logged-in user is viewing their own profile
    const isOwnProfile = user?._id === params.userId;

    return (
        <div className="p-5">
            {/* User Info Section */}
            <div className="p-4 flex items-center gap-6">
                <img
                    className="w-28 h-28 rounded-full"
                    src={userData?.avatar || "/profile-placeholder.jpg"}
                    alt={userData?.username}
                />
                <span className="flex flex-col items-start gap-1">
                    <h2 className="text-light text-2xl font-bold">
                        {userData?.fullName}
                    </h2>
                    <p className="text-lg text-light/50">
                        {"@" + userData?.username}
                    </p>
                </span>
            </div>

            {/* Bio Section */}
            <p className="text-light/70 pl-4">
                {userData?.bio}
            </p>

            {/* Conditionally Render Add/Remove Friend Button */}
            {!isOwnProfile && (
                isUserFriend ? (
                    <button onClick={handleToggleFriendship} className="border mt-2 w-full py-2 bg-secondary border-secondary/70 rounded-md font-medium active:bg-accent/50">
                        Remove Friend
                    </button>
                ) : (
                    <button onClick={handleToggleFriendship} className="border mt-2 w-full py-2 bg-accent/60 border-accent/70 rounded-md font-medium active:bg-accent/50">
                        Add Friend
                    </button>
                )
            )}

            {/* Friends List Section */}
            <div className="mt-6 px-0 border-t border-secondary pt-5">
                <h2 className="text-2xl font-bold text-light/90">
                    {userData?.friends.length} Friend{userData?.friends.length == 1 ? '' : 's'}
                </h2>

                <div className="flex flex-col gap-4 mt-4">
                    {/* Friends mapping */}
                    {userData?.friends?.length > 0 ? (
                        userData.friends.map(friend => (
                            <User key={friend._id} userData={friend} loggedInUser={user} />
                        ))
                    ) : (
                        <p className="text-light/60">This user has no friends yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
