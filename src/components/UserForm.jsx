import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser, updateUser, getUser } from "../api/users";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: { city: "", state: "", country: "" },
    gender: "Male",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((res) => {
          const user = res.data;
          const nameParts = user.name ? user.name.split(" ") : ["", ""];
          setForm({
            firstName: nameParts[0] || "",
            lastName: nameParts[1] || "",
            email: user.email || "",
            phone: user.phone || "",
            location: user.location || { city: "", state: "", country: "" },
            gender: user.gender || "Male",
          });
        })
        .catch((err) => {
          console.error("Fetch user error:", err);
          toast.error("Failed to load user.");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.gender) {
      toast.warn("Please fill all required fields.");
      return;
    }

    const payload = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      location: form.location,
      gender: form.gender,
    };

    setLoading(true);
    try {
      if (id) {
        await updateUser(id, payload);
        toast.success("User updated successfully!");
      } else {
        await createUser(payload);
        toast.success("User created successfully!");
      }
      navigate("/users");
    } catch (err) {
      console.error("Save error:", err);
      const message = err.response?.data?.message || "Failed to save user.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg min-h-full">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        {id ? "Edit User" : "Register User"}
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          {["firstName", "lastName"].map((field) => (
            <div key={field} className="relative flex-1">
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-600"
              />
              <label
                className="absolute left-3 top-3 text-gray-400 text-sm transition-all
                peer-placeholder-shown:top-3
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:text-sm
                peer-focus:top-0
                peer-focus:text-blue-600
                peer-focus:text-xs
                peer-valid:top-0
                peer-valid:text-blue-600
                peer-valid:text-xs"
              >
                {field === "firstName" ? "Firstname" : "Lastname"}
              </label>
            </div>
          ))}
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder=" "
            className="peer w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-600"
          />
          <label
            className="absolute left-3 top-3 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-3
              peer-placeholder-shown:text-gray-400
              peer-placeholder-shown:text-sm
              peer-focus:top-0
              peer-focus:text-blue-600
              peer-focus:text-xs
              peer-valid:top-0
              peer-valid:text-blue-600
              peer-valid:text-xs"
          >
            Email
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-600"
          />
          <label
            className="absolute left-3 top-3 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-3
              peer-placeholder-shown:text-gray-400
              peer-placeholder-shown:text-sm
              peer-focus:top-0
              peer-focus:text-blue-600
              peer-focus:text-xs
              peer-valid:top-0
              peer-valid:text-blue-600
              peer-valid:text-xs"
          >
            Phone
          </label>
        </div>

        <div className="flex gap-4">
          {["city", "state", "country"].map((field) => (
            <div key={field} className="relative flex-1">
              <input
                type="text"
                name={`location.${field}`}
                value={form.location[field]}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-600"
              />
              <label
                className="absolute left-3 top-3 text-gray-400 text-sm transition-all
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-gray-400
                  peer-placeholder-shown:text-sm
                  peer-focus:top-0
                  peer-focus:text-blue-600
                  peer-focus:text-xs
                  peer-valid:top-0
                  peer-valid:text-blue-600
                  peer-valid:text-xs"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
        </div>

        <div className="relative">
          <select
            name="gender"
            value={form.gender || ""}
            onChange={handleChange}
            className="peer w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-600 bg-white appearance-none"
            required
          >
            <option value="" disabled></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label
            className="absolute left-3 top-3 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-3
              peer-placeholder-shown:text-gray-400
              peer-placeholder-shown:text-sm
              peer-focus:top-0
              peer-focus:text-blue-600
              peer-focus:text-xs
              peer-valid:top-0
              peer-valid:text-blue-600
              peer-valid:text-xs"
          >
            Gender
          </label>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 rounded-lg py-2 text-white transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Saving..." : id ? "Update" : "Register"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="flex-1 bg-gray-200 text-gray-800 rounded-lg py-2 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
