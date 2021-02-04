/**
 *
 * Description. Common Utility function for API call
 *
 * @link   URL
 * @file   API call's can be made from this function (GET and POST request)
 * @since  1.0.0
 */
import axios from "axios";

const baseApiURL = `http://localhost:8080/api`;

const errorRes = (error) => {
  return {
    error: true,
    message: error.message,
  };
};

const axiosApi = async (url, method, reqPayload, otherConfig) => {
  const newUrl = `${baseApiURL}${url}`;
  const config = {
    ...otherConfig,
  };
  if (method === "POST") {
    const resPost = await axios
      .post(newUrl, reqPayload, config)
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        }
        return errorRes(error);
      });
    return resPost.data;
  } else if (method === "PUT") {
    const resPost = await axios
      .put(newUrl, reqPayload, config)
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        }
        return errorRes(error);
      });
    return resPost.data;
  } else if (method === "GET") {
    const resGet = await axios.get(newUrl, config).catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      }
      return errorRes(error);
    });
    return resGet.data;
  } else if (method === "DELETE") {
    const resGet = await axios.delete(newUrl, config).catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      }
      return errorRes(error);
    });
    return resGet.data;
  }
  return null;
};

export { axiosApi };
