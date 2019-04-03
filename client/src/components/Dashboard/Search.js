import React from "react";
import { TextField, Typography, Grid } from "@material-ui/core";

const Search = ({ handleChange, search }) => {
  return (
    <Grid item>
      <TextField
        label="Tìm theo ngày..."
        type="search"
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
    </Grid>
  );
};

export default Search;
