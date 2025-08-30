import { useEffect, useState } from "react";
import { api } from "../api/api";


export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchUsers();
    }, []);


    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.getUsers();
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };


    const addUser = async (data) => {
        await api.createUser(data);
        fetchUsers();
    };


    const editUser = async (id, data) => {
        await api.updateUser(id, data);
        fetchUsers();
    };


    const deleteUser = async (id) => {
        await api.deleteUser(id);
        fetchUsers();
    };


    return { users, loading, addUser, editUser, deleteUser };
}