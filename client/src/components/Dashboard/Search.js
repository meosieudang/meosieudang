import React from "react";
import { TextField, Typography } from "@material-ui/core";

const Search = ({ handleChange, search }) => {
  return (
    <>
      <TextField
        label="Tìm theo ngày..."
        type="search"
        margin="normal"
        className="ml-3"
        name="search"
        onChange={handleChange}
      />
      {Object.keys(search).length < 0 ? (
        <Typography>Không tìm thấy</Typography>
      ) : (
        <Typography>{`Có ${
          Object.keys(search).length
        } kết quả tìm thấy`}</Typography>
      )}
    </>
  );
};

export default Search;
