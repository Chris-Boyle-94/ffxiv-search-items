import axios from "axios";

const development = "http://localhost:3333";
const production = "https://moghead.herokuapp.com";
const baseUrl =
    process.env.NODE_ENV === "production" ? production : development;

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: baseUrl,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
