import axios from "axios";


const API_URL = "https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users";


export const api = {
getUsers: () => axios.get(API_URL),
getUser: (id) => axios.get(`${API_URL}/${id}`),
createUser: (data) => axios.post(API_URL, data),
updateUser: (id, data) => axios.put(`${API_URL}/${id}`, data),
deleteUser: (id) => axios.delete(`${API_URL}/${id}`),
};