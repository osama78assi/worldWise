import { NavLink } from "react-router-dom";
import style from "./PageNav.module.css";
import Logo from "./Logo";
import BtnNav from "./BtnToggle";
import { useState } from "react";
import { useFakeAuth } from "../../contexts/FakeAuthContext";

function PageNav() {
  const [classHide, setClassHide] = useState(style.hidden);
  const { isAuthenticate ,logout } = useFakeAuth();
  function toggleNav() {
    setClassHide((value) => (value === style.hidden ? "" : style.hidden));
  }

  return (
    <nav className={style.nav}>
      <Logo />
      <BtnNav onToggle={toggleNav} />
      <ul className={style.nav.concat(" ", classHide)}>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={isAuthenticate ? "" : "/login"} className={style.ctaLink} onClick={(e) => isAuthenticate ? logout() : null}>
            {isAuthenticate ? "Logout" : "Login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
