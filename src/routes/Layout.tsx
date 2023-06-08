import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.scss";
import useLoadingSpinner from "~/hooks/useLoadingSpinner";

export default function Layout() {
  const { LoadingSpinnerModal } = useLoadingSpinner();
  return (
    <>
      <Navbar />
      <Outlet />
      <LoadingSpinnerModal />
      <footer>© עמותת שבושון</footer>
    </>
  );
}
