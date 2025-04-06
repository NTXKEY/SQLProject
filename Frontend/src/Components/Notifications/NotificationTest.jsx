import "react-toastify/dist/ReactToastify.css";
import Notifications from "./Notification";

const NotificationTest = () => {
  const war = () => {
    Notifications.Warning("this is a Waring", {
      mode: "light",
    });
  };
  const suc = () => {
    Notifications.Success("this is a Success", {
      //  mode: "dark"
    });
  };
  const pro = () => {
    // toast.promise("this is the promis ", {
    //   pending: "email is being verified",
    // });
    Notifications.Progress("this is a Progress or email is beinf verified", {
      mode: "dark",
      duration: 2000,
    });
  };
  const err = () => {
    // Notification("this is a Error");
    Notifications.Error("this is a Error");
  };
  const def = () => {
    Notifications.Default("this is a Default");
  };
  const inf = () => {
    Notifications.Info("this is a Info");
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <button onClick={war}>Waring</button>
      <br />
      <button onClick={suc}>Success</button>
      <br />
      <button onClick={pro}>Progress</button>
      <br />
      <button onClick={err}>Error</button>
      <br />
      <button onClick={def}>Default</button>
      <br />
      <button onClick={inf}>Info</button>
    </div>
  );
};

export default NotificationTest;
