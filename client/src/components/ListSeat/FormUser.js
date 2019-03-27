import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import NumberFormat from "react-number-format";

const FormUser = ({
  nameSeat,
  phoneUser,
  nameUser,
  handleChange,
  handleSubmit,
  data
}) => {
  const list =
    Object.keys(data).length > 0
      ? data.seat.filter(item => item.isBook === false)
      : [];

  return (
    <>
      <Typography variant="display1" align="center" gutterBottom>
        THÊM/SỬA KHÁCH HÀNG
      </Typography>

      <TextField
        fullWidth
        select
        label="Name Seat"
        value={nameSeat}
        name="nameSeat"
        onChange={handleChange}
        SelectProps={{
          native: true
        }}
        helperText="Please select your currency"
        margin="normal"
      >
        {list.map(option => (
          <option key={option._id} value={option.nameSeat}>
            {option.nameSeat}
          </option>
        ))}
      </TextField>

      <TextField
        type="search"
        fullWidth
        label="Name User"
        onChange={handleChange}
        name="nameUser"
        value={nameUser}
      />

      <NumberFormat
        customInput={TextField}
        type="search"
        fullWidth
        label="Phone User"
        onChange={handleChange}
        name="phoneUser"
        value={phoneUser}
        format="#### ### ####"
      />

      <form onSubmit={handleSubmit}>
        <Button
          style={{ display: "block", margin: "auto", marginTop: 15 }}
          type="submit"
          variant="outlined"
          color="secondary"
          disabled={!nameSeat || !phoneUser || !nameUser ? true : false}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default FormUser;
