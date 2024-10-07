import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import ProfileSkeleton from "../../../components/skeletons/ProfilePage";
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react";
import {
    logoutUserApi,
    toggleAllowMessageEveryoneApi,
    toggleOnlineStatusApi
} from "../../../apis/user";

export default function Profile() {

    const { user, logout, isLoading } = useAuthContext();
    const [onlineStatusToggle, setOnlineStatusToggle] = useState(false);
    const [messageAllow, setMessageAllow] = useState(false);
    const navigate = useNavigate()

    const handleOnlineStatusToggle = async () => {

        const { success, message } = await toggleOnlineStatusApi(onlineStatusToggle)

        if (success) {
            toast.success(message);
            setOnlineStatusToggle(!onlineStatusToggle);
        } else {
            toast.error(message)
        }
    }

    const handleAllowMessageFromEveryoneToggle = async () => {
        const { success, message } = await toggleAllowMessageEveryoneApi(messageAllow)

        if (success) {
            toast.success(message);
            setMessageAllow(!messageAllow);
        } else {
            toast.error(message)
        }
    }

    const handleLogout = async () => {
        const { success, message } = await logoutUserApi()

        if (success) {
            toast.success(message);
            logout();
            navigate('/auth/login');
        } else {
            toast.error(message)
        }
    }

    const handleDeleteAccount = async () => {
        toast("This feature is in development")
    }

    useEffect(() => {
        setOnlineStatusToggle(user?.showOnlineStatus);
        setMessageAllow(user?.allowMessageRequestFromEveryone);
    }, [user])

    if (isLoading) {
        return (
            <ProfileSkeleton />
        );
    }

    return (
        <div className="p-5 bg-primary min-h-fit text-light">
            <div className="max-w-3xl mx-auto">
                {/* Profile Section */}
                <div className="flex items-center gap-6 mb-8">
                    <img
                        className="w-24 h-24 rounded-full"
                        src="/profile-placeholder.jpg"
                        alt="profile avatar"
                    />
                    <div>
                        <h2 className="text-3xl font-bold text-light">{user?.fullName}</h2>
                        <p className="text-light/50 mt-2">
                            @{user?.username}
                        </p>
                    </div>
                </div>

                <p className="text-light/80 mb-1 w-full max-w-sm text-base">
                    {user?.bio}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6 w-full">
                    <Link to={'/profile/edit'} className="py-2 bg-accent text-light font-semibold rounded hover:bg-accent/80 w-full text-center">
                        Edit Profile
                    </Link>
                </div>
            </div>

            {/* Settings Section */}
            <div className="mt-10 max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">
                    Settings
                </h3>

                {/* Privacy Settings */}
                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-accent mb-2">Privacy</h4>
                    <div onClick={handleOnlineStatusToggle} className="flex items-center justify-between">
                        <span className="text-light/80">Show online status</span>
                        <input
                            type="checkbox"
                            className="toggle-checkbox"
                            defaultChecked={onlineStatusToggle}
                            readOnly
                        />
                    </div>
                    <div onClick={handleAllowMessageFromEveryoneToggle} className="flex items-center justify-between mt-3">
                        <span className="text-light/80">Allow message requests from everyone</span>
                        <input
                            type="checkbox"
                            className="toggle-checkbox"
                            defaultChecked={messageAllow}
                            readOnly
                        />
                    </div>
                </div>

                {/* Account Settings */}
                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-accent mb-2">Account Management</h4>
                    <div className="flex items-center justify-between">
                        <span className="text-light/80">Change password</span>
                        <Link to={'/profile/change-password'} className="text-accent hover:text-accent/80">
                            Change
                        </Link>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-light/80">Delete account</span>
                        <button onClick={handleDeleteAccount} className="text-red-600 hover:text-red-400">
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-6 w-full">
                <button onClick={handleLogout} className="py-2 bg-red-500 text-light font-semibold rounded hover:bg-red-500/80 w-full text-center">
                    Logout
                </button>
            </div>
        </div>
    );
}
