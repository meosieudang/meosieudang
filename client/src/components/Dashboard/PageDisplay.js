import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import { PAGE_NUM_DISPLAY } from "../../actions/type";
const PageDisplay = ({ limit, handleChange }) => {
  return (
    <FormControl>
      <Select value={limit} onChange={handleChange} displayEmpty name="limit">
        {PAGE_NUM_DISPLAY.map(item => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Hiển thị dữ liệu</FormHelperText>
    </FormControl>
  );
};

export default PageDisplay;
