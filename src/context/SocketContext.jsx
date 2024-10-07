/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from 'react';
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const socket = io(import.meta.env.VITE_SOCKET_SERVER_API_URL, {
        withCredentials: true
    });

    useEffect(() => {
        socket.on('connect', () => {
            console.log(`Connected to socket server with ID: ${socket.id}`);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider

export const useSocket = () => useContext(SocketContext);

