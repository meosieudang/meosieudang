import React from "react";
import { Button, TextField, Paper } from "@material-ui/core";

const CreateListSeat = ({ onChange, handleSubmit, errors }) => {
  return (
    <Paper style={{ marginTop: 20, textAlign: "center", padding: 15 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="Vui lòng nhập số ghế"
          onChange={onChange}
          name="numberSeat"
          error={errors.numberSeat ? true : false}
          helperText={
            errors.numberSeat
              ? errors.numberSeat
              : "Vui lòng nhập số ghế trong khoảng 20 - 30"
          }
        />
        <Button
          type="submit"
          variant="contained"
          style={{ display: "block", margin: "auto", marginTop: 20 }}
        >
          Tạo Danh Sách Ghế
        </Button>
      </form>
    </Paper>
  );
};

export default CreateListSeat;
