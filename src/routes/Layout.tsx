import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Loader from "~/Componenets/Loader";

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
