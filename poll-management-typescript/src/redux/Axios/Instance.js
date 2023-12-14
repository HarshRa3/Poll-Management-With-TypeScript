import axios from "axios";

const Instance = axios.create({
  baseURL: "https://etechpolltesting.onrender.com/",
});

export default Instance;
