import axios from "axios";

const API_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:3000";

const axiosApi = axios.create({ baseURL: API_URL });

export const getProjects = async () => (await axiosApi.get("/projects")).data;

export const getProject = async (id: string) =>
  (await axiosApi.get(`/projects/${id}`)).data;
