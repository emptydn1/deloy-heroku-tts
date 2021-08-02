import React from "react";
import { TextareaAutosize } from "@material-ui/core";
import useDebounce from "../../utils/useDebounce";

const Textarea = ({ label, name, fn, init, ...other }) => {
  const { state, handleChange } = useDebounce(init, fn);

  return (
    <TextareaAutosize
      aria-label="minimum height"
      rowsMin={15}
      placeholder={label}
      name={name}
      value={state.value}
      onChange={handleChange}
      {...other}
    />
  );
};

export default Textarea;
