"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { playSpatialPop } from "@/libs/soundEngine";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(
    ({ message, description = "", type = "success", duration = 3500 }) => {
      const id = crypto.randomUUID();

      const newToast = {
        id,
        message,
        description,
        type,
        duration,
      };

      setToasts((prev) => [...prev, newToast]);
      playSpatialPop(type);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [],
  );

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};
