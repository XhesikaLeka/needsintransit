import React from "react";
import "antd/dist/antd.css";
import { Button } from "antd";
import '../App.css'

const ButtonIcon = ({ title, onPress, size, icon, type, shape, className }) => {

  return (
    <Button
      className={className}
      type={type}
      shape={shape}
      icon={icon}
      size={size}
      onClick={onPress}
    >{title}</Button>
  );
};
const ButtonPrimary = ({ onPress, size, title, type, shape, className, disabled }) => {

  return (
    <Button
      className={className}
      disabled={disabled}
      type={type}
      shape={shape}
      size={size}
      onClick={onPress}
    >{title}</Button>
  );
};

export {ButtonIcon, ButtonPrimary} ;
