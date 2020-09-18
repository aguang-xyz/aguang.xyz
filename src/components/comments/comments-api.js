import Axios from "axios";

const client = Axios.create({
  baseURL: "https://comments-api.aguang.xyz/",
  withCredentials: true,
});

export const whoami = () => client.get("/oauth/whoami");

export const getComments = ({ category, page, pageSize, order }) =>
  client.get("/comments", {
    params: {
      category,
      page: page || 1,
      pageSize: pageSize || 10,
      order: order || "recent",
    },
  });

export const addComment = ({ category, content }) =>
  client.post("/comments", {
    category,
    content,
  });
