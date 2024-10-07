import url from "../constant";
import axios from "axios";

export async function getMessagesByRoomId(roomId) {
    try {
        const resp = await axios.post(`${url}/messages/get-messages`, { roomId }, { withCredentials: true })

        if (resp.data) {
            return { success: true, message: resp.data.message, data: resp.data };
        } else {
            return { success: false, message: "Unexpected response structure" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while getting messages" };
    }
}