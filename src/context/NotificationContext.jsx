"use client";

import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("app_notifications")) || [];
    setNotifications(stored);
  }, []);

  const pushNotification = (notif) => {
    const newNotif = {
      id: crypto.randomUUID(),
      read: false,
      createdAt: Date.now(),
      ...notif,
    };

    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    localStorage.setItem("app_notifications", JSON.stringify(updated));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, pushNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);