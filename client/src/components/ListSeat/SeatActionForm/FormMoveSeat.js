import React from "react";
import { Button, Typography } from "@material-ui/core";
import Select from "react-select";

const listOptions = (arr, isBook) => {
  return arr.seat
    .filter(item => item.isBook === isBook)
    .map(item => ({ value: item._id, label: item.nameSeat }));
};

const listSeat = (value1, arr) =>
  value1
    ? arr.seat
        .map(item => ({
          value: item._id,
          label: item.nameSeat
        }))
        .filter(item => item.value !== value1.value)
    : [];

const FormMoveSeat = ({
  selectMove1,
  selectMove2,
  handleChangeMove1,
  handleChangeMove2,
  submitMove,
  data
}) => {
  return (
    <div style={{ padding: 15 }}>
      <Typography variant="display1" align="center" gutterBottom>
        CHUYỂN GIƯỜNG
      </Typography>
      <Select
        placeholder="Vui lòng chọn ghế hiện tại"
        value={selectMove1}
        onChange={handleChangeMove1}
        options={listOptions(data, true)}
      />
      <br />
      <Select
        placeholder="Vui lòng chọn ghế cần đổi"
        value={selectMove2}
        onChange={handleChangeMove2}
        options={listSeat(selectMove1, data)}
      />
      <br />
      <form onSubmit={submitMove}>
        <Button
          variant="outlined"
          color="secondary"
          style={{ display: "block", margin: "auto" }}
          type="submit"
          disabled={!selectMove1 || !selectMove2 ? true : false}
        >
          Chuyển ghế
        </Button>
      </form>
    </div>
  );
};

export default React.memo(FormMoveSeat);
