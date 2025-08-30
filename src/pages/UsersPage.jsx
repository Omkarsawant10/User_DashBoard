import React, { useState } from "react";
import useUsers from "../hooks/useUsers";
import UserTable from "../components/Users/UserTable";
import UserForm from "../components/Users/UserForm";
import { FiPlus } from "react-icons/fi";

export default function UsersPage() {
  const { users, loading, addUser, editUser, deleteUser } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const startAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const startEdit = (user) => {
    setEditing(user);
    setShowForm(true);
  };

  const handleSave = async (data) => {
    if (editing) await editUser(editing.id, data);
    else await addUser({ ...data, createdAt: new Date().toISOString() });
    setShowForm(false);
  };

  const handleDelete = async (user) => {
    if (!confirm(`Delete user ${user.name}? This cannot be undone.`)) return;
    await deleteUser(user.id);
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-950 p-6 space-y-6 transition-colors duration-300">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            👥 Users
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Manage, add, edit and delete users in the system
          </p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition"
        >
          <FiPlus className="text-lg" /> Add User
        </button>
      </div>

      
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 transition-colors duration-300">
        {loading ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            Loading...
          </div>
        ) : (
          <UserTable users={users} onEdit={startEdit} onDelete={handleDelete} />
        )}
      </div>

      
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {editing ? "✏️ Edit User" : "➕ Create User"}
            </h2>
            <UserForm
              initialData={editing}
              onCancel={() => setShowForm(false)}
              onSave={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}
