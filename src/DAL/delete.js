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
export const deleteUsers = async (ids) => {

  const reqObj = {
    path: `/api/delete/users`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: ids,
  };
  return invokeApi(reqObj);
};

export const deletePayments = async (ids) => {
  return await fetch(`/api/payments/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });
};
