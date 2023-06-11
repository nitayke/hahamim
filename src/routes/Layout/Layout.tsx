import { Outlet } from "react-router-dom";
import "../styles/App.scss";
import "../styles/Mobile.scss";
import "./Layout.scss";
import Navbar from "./Navbar";
import useLoadingSpinner from "~/hooks/useLoadingSpinner";
import Footer from "./Footer";

export default function Layout() {
  const { LoadingSpinnerModal } = useLoadingSpinner();
  return (
    <>
      <Navbar />
      <Outlet />
      <LoadingSpinnerModal />
      <Footer />
    </>
  );
}
