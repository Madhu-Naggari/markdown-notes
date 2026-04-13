import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppToast({ theme }) {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      theme={theme === "dark" ? "dark" : "light"}
      toastClassName="notes-toast"
      bodyClassName="notes-toast-body"
    />
  );
}

export default AppToast;

