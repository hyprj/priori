import axios from "axios";
import { ITask } from "src/types/types";

const API_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:3000";

const axiosApi = axios.create({ baseURL: API_URL });

export const getProjects = async () => (await axiosApi.get("/projects")).data;

export const getProject = async (id: string) =>
  (await axiosApi.get(`/projects/${id}`)).data;

export const createTask = async (path: string, task: ITask) =>
  (await axiosApi.post(path, task)).data;
