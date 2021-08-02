import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flexColum: {
    flexDirection: "row",
  },
  widthRadio: {
    width: `calc((100% - 16px) /2)`,
  },
}));

const RadioGroups = ({ name, value, onChange, items, style, style2 }) => {
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Voice</FormLabel>
      <RadioGroup
        aria-label={name}
        name={name}
        value={value}
        onChange={onChange}
        className={style ? style : classes.flexColum}
      >
        {items &&
          items.map(({ name: n, value: v, id }) => (
            <FormControlLabel
              key={id}
              value={v}
              control={<Radio />}
              label={n}
              className={style2 ? style2 : classes.widthRadio}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroups;
