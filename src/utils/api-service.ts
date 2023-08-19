import axios from "axios";

const api = axios.create({
  baseURL: "https://api.hubbleprotocol.io"
});

export default api;
