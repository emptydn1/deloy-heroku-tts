import React from "react";
import { TextField } from "@material-ui/core";
import useDebounce from "../../utils/useDebounce";

const Input = ({ label, name, variant, init, fn, ...other }) => {
  const { state, handleChange } = useDebounce(init, fn);

  return (
    <TextField
      id="outlined-basic"
      variant={variant}
      name={name}
      value={state.pa}
      label={label}
      onChange={handleChange}
      {...other}
    />
  );
};

export default Input;
