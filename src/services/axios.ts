import axios from "axios"

export const api = axios.create({
	baseURL: "https://api-medmapangola.onrender.com/medmapangola.ao",
	withCredentials: true,
})
