import style from "./BtnToggle.module.css";
import PropTypes from "prop-types";
function BtnToggle({ onToggle, defineClass = "" }) {
  return (
    <button
      className={`${style["btn-toggle"]} ${defineClass}`}
      onClick={() => onToggle()}
    >
      <img src="./public/burger-menu-svgrepo-com.svg"></img>
    </button>
  );
}

BtnToggle.proptype = {
  onToggle: PropTypes.func,
  defineClass: PropTypes.array,
};

export default BtnToggle;
