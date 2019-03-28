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
  const listOptions = (arr, isBook) => {
    return Object.keys(arr).length > 0
      ? arr.seat
          .filter(item => item.isBook === isBook)
          .map(item => ({ value: item._id, label: item.nameSeat }))
      : [];
  };

  return (
    <div style={{ padding: 15 }}>
      <Typography variant="display1" align="center" gutterBottom>
        CHUYỂN GHẾ
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
        options={listOptions(data, false)}
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
