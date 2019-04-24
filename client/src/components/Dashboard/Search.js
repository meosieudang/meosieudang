import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import StyledDatePicker from "../../StyledComponents/StyledDatePicker";
import moment from "moment";

const Search = props => {
  const [search, setSearch] = useState(new Date());

  const handleChange = data => setSearch(data);

  const onSubmit = e => {
    e.preventDefault();
    const query = moment(search._d).format("DD/MM/YYYY");
    props.searchProject(query);
  };

  return (
    <Grid container alignItems="flex-end" spacing={16}>
      <Grid item>
        <StyledDatePicker
          onChange={handleChange}
          date={search}
          label="Ngày cần tìm..."
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Tìm
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;
