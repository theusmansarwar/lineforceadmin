import { invokeApi } from "../Utils/InvokeApi"

export const fetchCourses= async()=>{
    const reqObj={
        path: "/api/course/all",
        method: "GET",
        headers: {
               Authorization: `Bearer ${localStorage.getItem("Token")}`
        },
     
    body:{}
    }
    return invokeApi(reqObj)
    }
    export const fetchSyllabus= async(id)=>{
        const reqObj={
            path: `/api/syllabus/by_course/${id}`,
            method: "GET",
            headers: {
                   Authorization: `Bearer ${localStorage.getItem("Token")}`
            },
         
        body:{}
        }
        return invokeApi(reqObj)
        }
