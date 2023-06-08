import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "~/Componenets/Loader";
import "./App.scss";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Loader />
      <Outlet />
      <footer>© עמותת שבושון</footer>
    </>
  );
}
