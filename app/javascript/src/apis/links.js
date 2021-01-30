import axios from "axios";

const create = payload => axios.post("/links", payload);

const list = () => axios.get("/links");

const show = slug => axios.get(`/links/${slug}`);


const linksApi = {
  create,
  list,
  show
};

export default linksApi;
