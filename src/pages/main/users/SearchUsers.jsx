import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import User from "../../../components/User";
import Debounce from "../../../hooks/useDebounce";
import axios from "axios";
import { toast } from "react-hot-toast"

export default function SearchUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedSearchTerm = Debounce(searchTerm, 1000);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!debouncedSearchTerm.trim()) {
                setUsers([]);
                return;
            }

            setLoading(true);

            try {
                const url = `${import.meta.env.VITE_SERVER_API_URL}`
                const resp = await axios.post(`${url}/users/search`, {
                    username: debouncedSearchTerm,
                    fullName: debouncedSearchTerm
                }, { withCredentials: true });
                console.log(resp)
                setUsers(resp.data.data);

            } catch (error) {
                toast.error("Something went wrong")
                console.log(error)
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [debouncedSearchTerm]);

    return (
        <div className="p-4">
            {/* Search Input */}
            <div className="flex bg-secondary p-3 gap-4 rounded-md">
                <Search className="w-7 h-7 text-light/60" />
                <input
                    autoFocus
                    type="text"
                    className="bg-transparent w-full text-lg text-light/60 outline-none placeholder:text-base"
                    placeholder="Search Users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Loader */}
            {loading && (
                <div className="flex justify-center mt-4">
                    <span className="text-light/60 text-lg">Loading...</span>
                </div>
            )}

            {/* User List */}
            <div className="mt-4 flex flex-col gap-1">
                {
                    users.length > 0 ? (
                        users.map(user => (
                            <User key={user._id} userData={user} />
                        ))
                    ) : (
                        (!loading && !searchTerm.trim()) ? (
                            <div className="text-light/60">
                                Search users for suggestions
                            </div>
                        ) : (
                            <div className="text-light/60">
                                No users found
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}
