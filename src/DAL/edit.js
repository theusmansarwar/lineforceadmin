import { invokeApi } from "../Utils/InvokeApi";
export const updateBanner = async (data, id) => {
  console.log(...data, "djskfhjksdfks");
  const reqObj = {
    path: `/api/banner/update/${id}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateCourses = async (data, id) => {
  console.log(...data, "djskfhjksdfks");
  const reqObj = {
    path: `/api/course/update/${id}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateSyllabus = async (data, id) => {
  console.log(...data, "djskfhjksdfks");
  const reqObj = {
    path: `/api/syllabus/update/${id}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateStatus = async (id, data) => {
  // Log FormData contents for debugging
  for (const [key, value] of data.entries()) {
    console.log(`${key}: ${value}`);
  }

  const reqObj = {
    path: `/api/coursebuy/status_update/${id}`,
    method: "POST", // Keep POST if required by your API
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
      // Remove Content-Type as it's set automatically
    },
    postData: data,
  };
  
  return invokeApi(reqObj);
};

