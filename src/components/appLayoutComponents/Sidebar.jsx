import Logo from "../globalCompnent/Logo";
import styles from "./Sidebar.module.css";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";

function Sidebar({ hideClass }) {
  return (
    <div className={`${styles.sidebar} ${hideClass}`}>
      <Logo />
      <AppNav />
      {/* <Outlet context={{ cities, isLoading, curCity }} /> */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
