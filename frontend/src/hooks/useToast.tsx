import { useState } from "react";
import { Toast } from "../components/MicroInteractions";

export const useToast = () => {
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      message: string;
      type: "success" | "error" | "warning" | "info";
    }>
  >([]);

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "info"
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );

  return {
    showToast,
    ToastContainer,
    removeToast,
  };
};

export default useToast;
