import React from "react";
import { Button as ButtonM } from "@material-ui/core";

const Button = ({ text, size, color, variant, onClick, ...other }) => {
  return (
    <ButtonM
      variant={variant || "contained"}
      size={size}
      color={color}
      onClick={onClick}
      {...other}
    >
      {text}
    </ButtonM>
  );
};

export default Button;
