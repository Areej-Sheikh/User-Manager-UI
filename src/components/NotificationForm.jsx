import React, { useState } from "react";
import { toast } from "react-toastify";
import { notifyUsers } from "../api/users";

export default function NotificationForm({ userEmails = [], onClose }) {
  const [selectedEmail, setSelectedEmail] = useState(userEmails[0] || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    if (!selectedEmail || !subject || !message) {
      toast.warn("Please fill all fields before sending.");
      return;
    }

    setLoading(true);
    const payload = { emails: [selectedEmail], subject, message };

    try {
      const res = await notifyUsers(payload);
      toast.success(res?.data?.message || "Notification sent successfully!");
      onClose && onClose();
    } catch (err) {
      console.error("notify error:", err);
      const msg = err.response?.data?.message || "Failed to send notification.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4"
      onSubmit={handleSend}
    >
      <p className="text-2xl font-semibold text-blue-600 relative pl-10">
        Send Notification
        <span className="absolute left-0 top-1 w-4 h-4 bg-blue-600 rounded-full animate-ping"></span>
      </p>
      <p className="text-gray-500 text-sm">
        Select a user and send them a notification.
      </p>

      <div className="relative">
        <input
          type="email"
          name="selectedEmail"
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
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
          peer-not-placeholder-shown:top-0
          peer-not-placeholder-shown:text-blue-600
          peer-not-placeholder-shown:text-xs"
        >
          Email
        </label>
      </div>

      <div className="relative">
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
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
          Subject
        </label>
      </div>

      <div className="relative">
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder=" "
          rows={4}
          className="peer w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-600 resize-none"
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
          Message
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
          {loading ? "Sending..." : "Send"}
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 rounded-lg py-2 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
