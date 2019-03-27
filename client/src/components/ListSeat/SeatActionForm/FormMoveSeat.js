import React from "react";
import { Button, Typography } from "@material-ui/core";
import Select from "react-select";

const FormMoveSeat = ({
  selectMove1,
  selectMove2,
  handleChangeMove1,
  handleChangeMove2,
  submitMove,
  data
}) => {
  const list1 =
    Object.keys(data).length > 0
      ? data.seat
          .filter(item => item.isBook === true)
          .map(item => ({ value: item._id, label: item.nameSeat }))
      : [];
  const list2 =
    Object.keys(data).length > 0
      ? data.seat.map(item => ({ value: item._id, label: item.nameSeat }))
      : [];
  return (
    <div style={{ padding: 15 }}>
      <Typography variant="display1" align="center" gutterBottom>
        CHUYỂN GHẾ
      </Typography>
      <Select
        placeholder="Vui lòng chọn ghế hiện tại"
        value={selectMove1}
        onChange={handleChangeMove1}
        options={list1}
      />
      <br />
      <Select
        placeholder="Vui lòng chọn ghế cần đổi"
        value={selectMove2}
        onChange={handleChangeMove2}
        options={list2}
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

export default FormMoveSeat;
