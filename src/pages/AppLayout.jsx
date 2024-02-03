import { useState, useEffect } from "react";
import Map from "../components/appLayoutComponents/Map";
import Sidebar from "../components/appLayoutComponents/Sidebar";
import styles from "./AppLayout.module.css";
import BtnToggle from "../components/globalCompnent/BtnToggle";
import { AppLayoutContext } from "../contexts/AppLayoutContext";
import User from "../components/appLayoutComponents/User";
import { useNavigate } from "react-router-dom";
import { useFakeAuth } from "../contexts/FakeAuthContext";

function AppLayout() {
  const [hideSidebar, setHideSidebar] = useState(styles.hidden);
  const navigate = useNavigate();
  const { isAuthenticate } = useFakeAuth();
  // Protect The App From Routing
  useEffect(() => {
    if (!isAuthenticate && !sessionStorage.getItem("loged")) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticate, navigate]);
  function handelSidebarByClick() {
    setHideSidebar((className) =>
      className === styles.hidden ? "" : styles.hidden
    );
  }

  function handelSidebar() {
    if (!hideSidebar == "") setHideSidebar("");
  }

  return isAuthenticate ? (
    <AppLayoutContext>
      <div className={styles.app}>
        <BtnToggle
          defineClass={styles["btn-sidebar"]}
          onToggle={handelSidebarByClick}
        />
        <Sidebar hideClass={hideSidebar} />
        <Map toggle={handelSidebar} />
        <User />
      </div>
    </AppLayoutContext>
  ) : null;
}

export default AppLayout;
