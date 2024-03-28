import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import MainLoading from "./components/loading/MainLoading";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <MainLoading />
      ) : (
        <>
          <ToastContainer
            autoClose={1000}
            transition={Slide}
            hideProgressBar={true}
          />
          <Outlet />
        </>
      )}
    </>
  );
};

export default App;
