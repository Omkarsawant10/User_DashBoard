import React, { useState, useEffect } from "react";

export default function UserForm({ initialData = null, onCancel, onSave }) {
  const [form, setForm] = useState({ name: "", email: "", avatar: "" });

  useEffect(() => {
    if (initialData)
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        avatar: initialData.avatar || "",
      });
  }, [initialData]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="Full name"
        className="w-full p-2 rounded bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        placeholder="Email"
        className="w-full p-2 rounded bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
      />
      <input
        name="avatar"
        value={form.avatar}
        onChange={handleChange}
        placeholder="Avatar URL (optional)"
        className="w-full p-2 rounded bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
      />
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
