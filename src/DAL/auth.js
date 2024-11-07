import { invokeApi } from "../Utils/InvokeApi";

export const login = async (formData) => {
  console.log("Coming data is ", ...formData);
  const reqObj = {
    path: "/api/admin/login",
    method: "POST",
    headers: {},
    postData: formData,
  };
  return invokeApi(reqObj);
};
export const logout = async () => {
  const reqObj = {
    path: "/api/admin/logout",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  };
  return invokeApi(reqObj);
};
