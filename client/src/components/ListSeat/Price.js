import React from "react";
import NumberFormat from "react-number-format";
import { Paper, Grid, Typography } from "@material-ui/core";

const Price = ({ detailProfile }) => {
  const TITLE_DETAIL_CAR = [
    {
      title: "Ngày khởi hành: ",
      value:
        Object.keys(detailProfile).length > 0 &&
        detailProfile.profile.create_date
    },
    {
      title: "Tên chuyến: ",
      value: `${detailProfile.start} - ${detailProfile.end}`
    },
    { title: "Biển số xe: ", value: detailProfile.licensePlates }
  ];
  const quantity =
    Object.keys(detailProfile).length > 0 &&
    detailProfile.seat.filter(item => item.isBook === true).length;

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
        {Object.keys(detailProfile).length > 0
          ? TITLE_DETAIL_CAR.map((title, i) => (
              <Grid item key={i}>
                <Typography variant="h6" align="center">
                  {title.title}
                </Typography>
                <Typography variant="h5" color="secondary" align="center">
                  {title.value}
                </Typography>
              </Grid>
            ))
          : null}
      </Grid>
      <br />
      <br />
      <Grid container justify="space-around" alignItems="center">
        {Object.keys(detailProfile).length > 0
          ? DETAIL_PRICE.map((title, i) => (
              <Grid item key={i}>
                <Typography variant="h6" align="center">
                  {title.title}
                </Typography>
                <Typography variant="h5" color="secondary" align="center">
                  {title.value}
                </Typography>
              </Grid>
            ))
          : null}
      </Grid>
    </Paper>
  );
};

export default Price;
