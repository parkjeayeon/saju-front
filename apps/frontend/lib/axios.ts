import axios from "axios";

let client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: function (status) {
        return status < 400 || status === 401;
    },
    withCredentials: true,
});

