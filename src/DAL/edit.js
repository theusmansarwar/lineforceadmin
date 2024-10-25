import { invokeApi } from "../Utils/InvokeApi"

export const updateCourses= async(data , id)=>{
    console.log(...data,"djskfhjksdfks")
    const reqObj={
        path: `/api/course/update/${id}`,
        method: "POST",
        headers: {
               Authorization: `Bearer ${localStorage.getItem("Token")}`,
               'Content-Type': 'multipart/form-data', 
        },
    postData:data
    }
    return invokeApi(reqObj)
    }
    export const updateSyllabus= async(data , id)=>{
        console.log(...data,"djskfhjksdfks")
        const reqObj={
            path: `/api/syllabus/update/${id}`,
            method: "POST",
            headers: {
                   Authorization: `Bearer ${localStorage.getItem("Token")}`,
                   'Content-Type': 'multipart/form-data', 
            },
        postData:data
        }
        return invokeApi(reqObj)
        }