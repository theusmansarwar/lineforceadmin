import { invokeApi } from "../Utils/InvokeApi";
export const createBanners = async (data) => {
  console.log(...data, "djskfhjksdfks");
  const reqObj = {
    path: "/api/banner/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createCourses = async (data) => {
  console.log(...data, "djskfhjksdfks");
  const reqObj = {
    path: "/api/course/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createSyllabus = async (data) => {
  console.log(...data, "djskfhjksdfks");
  const reqObj = {
    path: "/api/syllabus/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const enrollUser = async (data) => {
  console.log(...data, "djskfhjksdfks");
  const reqObj = {
    path: "/api/admin/enrolluser",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
