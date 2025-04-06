import { toast } from "react-toastify";
import { Get } from "./Get";
const Theme = localStorage.getItem("theme");
export const Notification = (
  message,
  {
    mode = Theme, // we can use "dark" || "light" || "colored"
    // mode,
    duration = 5000,
    type,
  }
) => {
  // const Theme = localStorage.getItem("theme");
  const className =
    // "bg-color-white text-dark-bg w-[480px] max-[480px]:w-[10vw] max-w-none  rounded";
    `rounded-2xl
    ${
      Theme === "dark"
        ? `bg-color-white text-dark-bg`
        : `bg-dark-bg text-color-white`
    } `;
  return toast(message, {
    className: className,
    theme: mode,
    icon: Get(type, mode),
    autoClose: duration,
  });
};

const Notifications = {
  Success: (message, options = {}) =>
    Notification(message, { ...options, type: "success" }),

  Error: (message, options = {}) =>
    Notification(message, { ...options, type: "error" }),

  Progress: (message, options = {}) =>
    Notification(message, { ...options, type: "progress" }),

  Warning: (message, options = {}) =>
    Notification(message, { ...options, type: "warning" }),

  Default: (message, options = {}) =>
    Notification(message, { ...options, type: "default" }),
  Info: (message, options = {}) =>
    Notification(message, { ...options, type: "info" }),
};

export default Notifications;
