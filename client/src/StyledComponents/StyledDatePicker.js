import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

const StyledDatePicker = ({ date, onChange, label }) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker
        keyboard
        label={label}
        value={date}
        onChange={onChange}
        format="DD/MM/YYYY"
        animateYearScrolling={false}
        minDate={new Date()}
        onInputChange={e => console.log("Keyboard Input:", e.target.value)}
      />
    </MuiPickersUtilsProvider>
  );
};

export default StyledDatePicker;
