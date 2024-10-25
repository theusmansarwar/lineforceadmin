
import axios from "axios";
import { baseUrl } from "../Config/Config";

axios.defaults.headers.post["Content-Type"] = "application/json";

export async function invokeApi({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
 postData = {},
}) {
  const reqObj = {
    method,
    url: baseUrl + path,
    headers,
  };

  reqObj.params = queryParams;

  if (method === "POST") {
    reqObj.data = postData;
  }
  if (method === "PUT") {
    reqObj.data = postData;
  }
  if (method === "DELETE") {
    reqObj.data = postData;
  }

  let results;

  console.log("<===REQUEST-OBJECT===>", reqObj);

  try {
    results = await axios(reqObj);
    console.log("<===Api-Success-Result===>", results);

    return results.data;
  }catch (error) {
    if (error.response) {
        // The request was made, and the server responded with a status code outside the 2xx range
        console.log("<===Api-Error===>", error.response.data);
        return error.response.data;
    } else if (error.request) {
        // The request was made but no response was received (network issues, timeout, etc.)
        console.log("<===Api-Request-Error===> No response received:", error.request);
        return { message: "No response received from server." };
    } else {
        // Something else happened while setting up the request
        console.log("<===Api-Unknown-Error===>", error.message);
        return { message: "An unknown error occurred." };
    }
}

}