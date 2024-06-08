import axios from "axios";

export const baseUrl = "https://eats-exchange-server.vercel.app";

const axiosPublic = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
