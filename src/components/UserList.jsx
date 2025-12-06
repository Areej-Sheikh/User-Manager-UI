import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUsers, deleteUser } from "../api/users";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try {
      const res = await fetchUsers({ page: 1, limit: 50 });
      setUsers(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("load users error:", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      console.error("delete error:", err);
      const message = err.response?.data?.message || "Delete failed";
      toast.error(message);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users ({total})</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-200 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{`${u.location?.city || ""}, ${
                  u.location?.state || ""
                }`}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => navigate(`/users/${u._id}/edit`)}
                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
