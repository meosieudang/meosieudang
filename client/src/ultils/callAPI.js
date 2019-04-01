import axios from "axios";

const callAPI = (method, router, endpoint, body) => {
  return axios({
    method: method,
    url: `/api/${router}/${endpoint}`,
    data: body
  });
};
export default callAPI;
