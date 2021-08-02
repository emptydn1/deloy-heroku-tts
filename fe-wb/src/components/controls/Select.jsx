import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select as Selector, InputLabel, FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Select = ({ name, value, onChange, items }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor="outlined-age-native-simple">{name}</InputLabel>
      <Selector
        native
        value={value}
        onChange={onChange}
        label={name}
        inputProps={{
          name: name,
          id: "outlined-age-native-simple",
        }}
      >
        {items &&
          items.map((e, index) => (
            <option key={index + 101} value={e}>
              {e}
            </option>
          ))}
      </Selector>
    </FormControl>
  );
};

export default Select;
