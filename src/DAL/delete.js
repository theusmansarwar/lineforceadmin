import { invokeApi } from "../Utils/InvokeApi";

export const deleteCourses = async (id) => {
  const reqObj = {
    path: `/api/course/delete/${id}`,
    method: "Delete",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    body: {},
  };
  return invokeApi(reqObj);
};
export const deleteBanner = async (id) => {
  const reqObj = {
    path: `/api/banner/delete/${id}`,
    method: "Delete",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    body: {},
  };
  return invokeApi(reqObj);
};

export const deleteSyllabus = async (id) => {
  const reqObj = {
    path: `/api/syllabus/delete/${id}`,
    method: "Delete",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    body: {},
  };
  return invokeApi(reqObj);
};
