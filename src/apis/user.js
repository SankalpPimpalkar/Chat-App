import axios from "axios";
import url from "../constant";

export async function loginUserApi(form) {
    try {
        const resp = await axios.post(`${url}/users/login`, form, {
            withCredentials: true
        });

        if (resp.data) {
            localStorage.setItem('userId', resp.data.data.user._id);
            return { success: true, message: resp.data.message, data: resp.data };
        } else {
            return { success: false, message: "Unexpected response structure" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while signing in" };
    }
}

export async function registerUserApi(form) {

    try {
        const resp = await axios.post(`${url}/users/register`, form, {
            withCredentials: true
        });

        if (resp.data) {
            return { success: true, message: resp.data.message, data: resp.data };
        } else {
            return { success: false, message: resp.data?.message || "Unexpected response structure" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while creating the account" };
    }
}

export async function getUserApi() {
    try {

        const resp = await axios.get(`${url}/users/get-current-user`, {
            withCredentials: true
        });

        if (resp.data) {
            return { success: true, message: resp.data.message, data: resp.data };
        } else {
            return { success: false, message: resp.data?.message || "Unexpected response structure" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while getting user details" };
    }
}

export async function logoutUserApi() {
    try {

        const resp = await axios.post(`${url}/users/logout`, {}, {
            withCredentials: true
        })

        if (resp.data) {
            return { success: true, message: resp.data.message };
        } else {
            return { success: false, message: resp.data?.message || "Unexpected response structure" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while getting user details" };
    }
}

export async function toggleOnlineStatusApi(toggleState) {
    try {

        const resp = await axios.patch(`${url}/users/update-details`, {
            onlineStatus: !toggleState
        }, { withCredentials: true })

        if (resp.data) {
            return { success: true, message: resp.data.message };
        } else {
            return { success: false, message: resp.data?.message || "Unexpected response structure" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while updating user details" };
    }
}

export async function toggleAllowMessageEveryoneApi(toggleState) {
    try {

        const resp = await axios.patch(`${url}/users/update-details`, {
            messageAllow: !toggleState
        }, { withCredentials: true })

        if (resp.data) {
            return { success: true, message: resp.data.message };
        } else {
            return { success: false, message: resp.data?.message || "Unexpected response structure" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while updating user details" };
    }
}

export async function toggleFriendship(userId) {
    try {

        const resp = await axios.post(`${url}/users/friendship`, {
            userId: userId,
        }, { withCredentials: true })

        if (resp.data) {
            return { success: true, message: resp.data.message, data: resp.data };
        } else {
            return { success: false, message: resp.data?.message || "Unexpected response structure" };
        }
    } catch (error) {
        console.error(error);
        return { success: false, message: "An error occurred while updating user details" };
    }
}