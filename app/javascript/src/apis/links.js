import axios from "axios";

const create = payload => axios.post("/links", payload);

const list = () => axios.get("/links");

const show = slug => axios.get(`/links/${slug}`);

const update = ({slug, payload}) => axios.patch(`/links/${slug}`, payload);


const linksApi = {
  create,
  list,
  show, 
  update
};

export default linksApi;
