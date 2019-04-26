import React from "react";
import NumberFormat from "react-number-format";
import { Paper, Grid, Typography, Link } from "@material-ui/core";
import { withRouter, Link as LinkRouter } from "react-router-dom";

const TITLE_DETAIL_CAR = props => [
  {
    title: "Tên chuyến: ",
    value: `${props.start} - ${props.end}`
  },
  { title: "Biển số xe: ", value: props.licensePlates }
];

const quantity = props =>
  props.seat.filter(item => item.isBook === true).length;

const DETAIL_PRICE = props => [
  {
    title: "Đã đặt: ",
    value: quantity(props)
  },
  {
    title: "Giá vé: ",
    value: (
      <NumberFormat
        value={props.price}
        displayType={"text"}
        thousandSeparator={true}
        suffix={" VNĐ"}
      />
    )
  },
  {
    title: "Tổng tiền: ",
    value: (
      <NumberFormat
        value={props.price * quantity(props)}
        displayType={"text"}
        thousandSeparator={true}
        suffix={" VNĐ"}
      />
    )
  }
];

const renderTitle = arr => {
  return arr.map((title, i) => (
    <Grid item key={i}>
      <Typography variant="h6" align="center">
        {title.title}
      </Typography>
      <Typography variant="h5" color="secondary" align="center">
        {title.value}
      </Typography>
    </Grid>
  ));
};

const Price = ({ detailProfile }) => {
  return (
    <Paper>
      <Grid container justify="space-around" alignItems="center">
        <Grid item>
          <Typography variant="h6" align="center">
            Ngày khởi hành:
          </Typography>
          <Link
            component={LinkRouter}
            to={`/dashboard/${detailProfile.profile._id}`}
          >
            <Typography variant="h5" color="secondary" align="center">
              {detailProfile.profile.create_date}
            </Typography>
          </Link>
        </Grid>
        {renderTitle(TITLE_DETAIL_CAR(detailProfile))}
      </Grid>
      <br />
      <br />
      <Grid container justify="space-around" alignItems="center">
        {renderTitle(DETAIL_PRICE(detailProfile))}
      </Grid>
    </Paper>
  );
};

export default withRouter(React.memo(Price));
