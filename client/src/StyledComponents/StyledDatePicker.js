import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import "moment/locale/vi";
import moment from "moment";
moment.locale("vi");

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
        onInputChange={e => e.target.value}
      />
    </MuiPickersUtilsProvider>
  );
};

export default StyledDatePicker;
