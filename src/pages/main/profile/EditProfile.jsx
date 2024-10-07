import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditProfile() {
    const { user, login } = useAuthContext();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [avatarLocal, setAvatarLocal] = useState(user?.avatar || '/profile-placeholder.jpg');
    const [avatar, setAvatar] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setAvatar(file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarLocal(imageUrl);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            if (!fullName && !email && !bio && !avatar) {
                toast.error("Atleast one field required")
                return;
            }

            const updatedProfile = {
                fullName,
                email,
                bio,
                avatar,
            };

            const url = `${import.meta.env.VITE_SERVER_API_URL}`;

            const resp = await axios.patch(`${url}/users/update-details`, updatedProfile, {
                withCredentials: true,
            });

            login(resp.data.data);
            toast.success("User details updated")

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-5 bg-primary min-h-fit flex flex-col items-center text-light w-full">
            <div className="flex flex-col items-center w-full mt-4">
                <div className="relative">
                    <img className="w-28 h-28 rounded-full" src={avatarLocal} alt="profile" />
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                    />
                </div>

                <form className="mt-8 w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-light/80 font-semibold">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="w-full py-3 px-4 rounded-lg bg-secondary text-light outline-none"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-light/80 font-semibold">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="w-full py-3 px-4 rounded-lg bg-secondary text-light outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-light/80 font-semibold">
                            Bio
                        </label>
                        <textarea
                            className="w-full py-3 px-4 rounded-lg bg-secondary text-light outline-none"
                            placeholder="Tell us about yourself"
                            rows="4"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-accent/70 hover:bg-accent/60 text-light/90 py-2 font-semibold rounded-md mt-2 disabled:bg-secondary`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}
