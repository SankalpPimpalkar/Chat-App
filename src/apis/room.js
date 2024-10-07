import url from "../constant";
import axios from "axios";

export async function createRoomApi(form) {
    try {
        const resp = await axios.post(`${url}/rooms/create-room`, form, {
            withCredentials: true
        });

        if (resp.data) {
            return { success: true, message: resp.data.message, data: resp.data };
        } else {
            return { success: false, message: "Unexpected response structure" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while creating room" };
    }
}

export async function getRoomByIdApi(roomId) {
    try {
        const resp = await axios.post(`${url}/rooms/get-room`, {
            roomId
        }, { withCredentials: true });

        if (resp.data) {
            return { success: true, message: resp.data.message, data: resp.data };
        } else {
            return { success: false, message: "Unexpected response structure" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while fetching chats" };
    }
}

export async function getUserRoomsApi() {
    try {
        const resp = await axios.get(`${url}/rooms/get-rooms`, { withCredentials: true })

        if (resp.data) {
            return { success: true, message: resp.data.message, data: resp.data };
        } else {
            return { success: false, message: "Unexpected response structure" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while getting rooms" };
    }
}