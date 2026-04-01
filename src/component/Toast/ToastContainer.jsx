"use client";

import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 w-96">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl overflow-hidden animate-slideIn"
        >
          <div className="flex items-center gap-3 p-4 text-white">
            {toast.type === "success" && (
              <CheckCircle className="text-green-400" size={20} />
            )}
            {toast.type === "error" && (
              <XCircle className="text-red-400" size={20} />
            )}
            {toast.type === "info" && (
              <Info className="text-blue-400" size={20} />
            )}

            <div className="flex-1">
              <p className="font-semibold text-sm">{toast.message}</p>
              {toast.description && (
                <p className="text-xs text-gray-300 mt-1">
                  {toast.description}
                </p>
              )}
            </div>

            <button onClick={() => removeToast(toast.id)}>
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}