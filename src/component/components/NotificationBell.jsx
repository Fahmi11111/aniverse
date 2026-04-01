"use client";

import { Bell } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";
import { useState } from "react";

export default function NotificationBell() {
  const { notifications } = useNotification();
  const [open, setOpen] = useState(false);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:scale-110 transition"
      >
        <Bell />
        {unread > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-xs text-white px-1 rounded-full">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl p-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 && (
            <p className="text-sm text-gray-500">No notifications</p>
          )}

          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-2 rounded-lg mb-2 text-sm ${
                n.read ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              <p className="font-semibold">{n.message}</p>
              <p className="text-gray-500 text-xs">{n.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
