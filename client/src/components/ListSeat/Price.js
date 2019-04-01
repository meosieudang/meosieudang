import React from "react";
import NumberFormat from "react-number-format";
import { Paper, Grid, Typography, Link } from "@material-ui/core";
import { withRouter, Link as LinkRouter } from "react-router-dom";

const Price = ({ detailProfile }) => {
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

  const TITLE_DETAIL_CAR = [
    {
      title: "Tên chuyến: ",
      value: `${detailProfile.start} - ${detailProfile.end}`
    },
    { title: "Biển số xe: ", value: detailProfile.licensePlates }
  ];

  const quantity = detailProfile.seat.filter(item => item.isBook === true)
    .length;

  const DETAIL_PRICE = [
    {
      title: "Đã đặt: ",
      value: quantity
    },
    {
      title: "Giá vé: ",
      value: (
        <NumberFormat
          value={detailProfile.price}
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
          value={detailProfile.price * quantity}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" VNĐ"}
        />
      )
    }
  ];

  return (
    <Paper style={{ marginBottom: "2rem" }}>
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
        {renderTitle(TITLE_DETAIL_CAR)}
      </Grid>
      <br />
      <br />
      <Grid container justify="space-around" alignItems="center">
        {renderTitle(DETAIL_PRICE)}
      </Grid>
    </Paper>
  );
};

export default withRouter(Price);
