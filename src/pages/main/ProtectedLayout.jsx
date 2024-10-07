import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { useSocket } from "../../context/SocketContext";

export default function ProtectedLayout() {
    const { getCurrentUser, user, isAuthenticated } = useAuthContext();
    const cookieFallback = localStorage.getItem('userId')
    const navigate = useNavigate();
    const socket = useSocket();



    // Checks for validation
    useEffect(() => {
        if (!(isAuthenticated || cookieFallback)) {
            navigate("/auth/login")
        }
    }, [localStorage])


    // Fetches current user if not present
    useEffect(() => {
        if (!user) {
            getCurrentUser()
        }
    }, [])

    useEffect(() => {

        if (!user) return;

        socket.emit("user-connected", user._id);
        
        return () => {
            socket.off("connect");
        };
    }, [user]);

    return (
        <div className="bg-primary w-full text-light">
            <div className="md:border-x border-gray-700 w-full min-h-screen max-w-xl mx-auto">
                <Navbar />
                <Outlet />
            </div>

            <Toaster
                position='top-center'
                toastOptions={{
                    className: "bg-secondary text-light border border-primary shadow-md",
                    style: {
                        backgroundColor: '#393E46',
                        color: '#EEEEEE',
                        border: '1px solid #222831',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    },
                    success: {
                        iconTheme: {
                            primary: '#00ADB5',
                            secondary: '#EEEEEE',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#FF6B6B',
                            secondary: '#EEEEEE',
                        },
                    }
                }}
            />
        </div>
    )
}
