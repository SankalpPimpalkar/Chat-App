/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { getUserRoomsApi } from "../apis/room";

const RoomContext = createContext({
    rooms: [],
    getUserRooms: () => { },
    isLoading: false
});

function RoomContextProvider({ children }) {

    const [rooms, setRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getUserRooms = async () => {
        setIsLoading(true)

        const { success, data } = await getUserRoomsApi()
        if (success) {
            setRooms(data.data || [])
        }
        setIsLoading(false)
    };


    const values = {
        rooms,
        isLoading,
        getUserRooms
    };

    return (
        <RoomContext.Provider value={values}>
            {children}
        </RoomContext.Provider>
    );
}

export default RoomContextProvider;

export const useRoomContext = () => useContext(RoomContext)