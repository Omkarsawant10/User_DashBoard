import { useState, useMemo } from "react";
import Avatar from "../common/Avatar";
import { FiMail, FiCalendar, FiEdit, FiTrash2, FiX, FiMapPin, FiUser } from "react-icons/fi";

export default function UserTable({ users, onEdit, onDelete }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("createdAt_desc");
  const [page, setPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null); // modal state
  const pageSize = 10;

  // filtering + sorting
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = users;
    if (q) {
      arr = arr.filter(
        (u) =>
          (u.name || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "name_asc":
        arr = [...arr].sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        );
        break;
      case "name_desc":
        arr = [...arr].sort((a, b) =>
          (b.name || "").localeCompare(a.name || "")
        );
        break;
      case "createdAt_asc":
        arr = [...arr].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      default:
        arr = [...arr].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
    return arr;
  }, [users, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div>
      {/* Search + Sort */}
      <div className="flex gap-2 mb-3">
        <input
          placeholder="Search name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 rounded bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-100"
        >
          <option value="createdAt_desc">Newest</option>
          <option value="createdAt_asc">Oldest</option>
          <option value="name_asc">Name A→Z</option>
          <option value="name_desc">Name Z→A</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10">
        <table className="min-w-full">
          <thead className="text-slate-700 dark:text-slate-300 text-sm bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((u, i) => (
              <tr
                key={u.id}
                onClick={() => setSelectedUser(u)} // row click
                className={`cursor-pointer ${
                  i % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800/50"
                    : "bg-white dark:bg-gray-900"
                } border-t border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-gray-800`}
              >
                {/* User + Avatar */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar url={u.avatar} name={u.name} size="md" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-100">
                        {u.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        ID: {u.id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  <div className="flex items-center gap-2">
                    <FiMail /> <span>{u.email}</span>
                  </div>
                </td>

                {/* Joined Date */}
                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  <div className="flex items-center gap-2">
                    <FiCalendar />{" "}
                    <span>{new Date(u.createdAt).toLocaleString()}</span>
                  </div>
                </td>

                {/* Actions */}
                <td
                  className="px-4 py-3 text-center space-x-2"
                  onClick={(e) => e.stopPropagation()} // prevent row click
                >
                  <button
                    onClick={() => onEdit(u)}
                    className="px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => onDelete(u)}
                    className="px-2 py-1 rounded bg-red-600/80 text-white hover:bg-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-slate-500 dark:text-slate-300"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Showing {pageData.length} of {filtered.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-2 rounded bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          <div className="px-3 py-2 rounded bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-100">
            {page + 1} / {totalPages}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="px-3 py-2 rounded bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

     
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedUser(null)} // close on outside click
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl relative"
            onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
          >
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiX />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <Avatar url={selectedUser.avatar} name={selectedUser.name} size="lg" />
              <div>
                <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
              <p><strong>Name:</strong>{selectedUser.name}</p>
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Joined:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              {selectedUser.gender && <p><strong>Gender:</strong> {selectedUser.gender}</p>}
              {selectedUser.age && <p><strong>Age:</strong> {selectedUser.age}</p>}
              {selectedUser.location && (
                <p className="flex items-center gap-1">
                  <FiMapPin /> <span>{selectedUser.location}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
