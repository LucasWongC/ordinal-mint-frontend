import { BACKEND_URL } from "@/config";
import axios from "axios";

const instance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
    Accept: "application/json",
  },
});

export default instance;
