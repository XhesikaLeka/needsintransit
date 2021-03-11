import React from "react";
import "../App.css";

import { Logo } from "../Themes/Images";
import { MenuIcon } from "../Themes/Images";
import { ButtonIcon } from "../Components";

const MenuLogo = ({ onPress, visible }) => {
  return (
    <>
      <div className="logo-container">
        <div className="logo-subcontainer">
          <Logo className="logo" />
        </div>
      </div>
      <div className="menu-icon-container">
        <ButtonIcon
          className={`buttonIcon buttonIcon_${visible}`}
          icon={<MenuIcon className="menu-icon" />}
          size="large"
          type="default"
          shape="circle"
          onPress={onPress}
        />
      </div>
    </>
  );
};

export default MenuLogo;
