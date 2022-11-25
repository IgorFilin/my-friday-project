import axios from "axios";
import { DEV_VERSION } from "config";

export const instance = axios.create({
  baseURL: DEV_VERSION
    ? "http://localhost:7542/2.0/"
    : "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});
