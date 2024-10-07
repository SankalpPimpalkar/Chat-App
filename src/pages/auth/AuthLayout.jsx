import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';

export default function AuthLayout() {

    const navigate = useNavigate();
    const { isAuthenticated } = useAuthContext()
    const cookieFallback = localStorage.getItem('userId')


    useEffect(() => {
        if (isAuthenticated || cookieFallback) {
            navigate("/")
        }
    }, [])

    return (
        <div className="bg-primary w-full min-h-screen text-light relative">
            {/* Flex container for the main content */}
            <div className="w-full flex items-center justify-center min-h-screen max-w-xl mx-auto px-2">
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
    );
}
