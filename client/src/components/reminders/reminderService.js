import request from "../../configs/request";

export const createReminder = async (data)=>{
    return request.post(`/reminders/create`,data);
}