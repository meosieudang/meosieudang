import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const TableBook = props => {
  return (
    <Grid container spacing={16} justify="center" style={{ margin: "2rem 0" }}>
      <Grid item>
        <Button
          component={Link}
          to={`/diagram/${props.detailProfile._id}`}
          variant="contained"
          style={{ background: "#009688", color: "white" }}
        >
          Xem theo sơ đồ
        </Button>
      </Grid>
      <Grid item>
        <Button
          component={Link}
          to={`/list/${props.detailProfile._id}`}
          variant="contained"
          style={{ background: "#009688", color: "white", marginLeft: 15 }}
        >
          xem theo list
        </Button>
      </Grid>
    </Grid>
  );
};

export default TableBook;
