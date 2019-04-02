import React from "react";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Link
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { Link as LinkRouter } from "react-router-dom";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import EditIcon from "@material-ui/icons/Create";
import { modalContent } from "../../actions/platesAction";

const PlatesList = ({ item, getPlates, deleteLicensePlates }) => {
  const handleDelete = id => {
    modalContent(
      "Bạn có chắn chắn",
      "Dữ liệu này sẽ không thể khôi phục !"
    ).then(del => {
      if (del) {
        deleteLicensePlates(id);
      }
    });
  };

  const seatBook = () => item.seat.filter(seat => seat.isBook).length;
  return (
    <Card>
      <CardHeader
        style={{ padding: "5px 15px 0 15px" }}
        action={
          <>
            <IconButton onClick={() => getPlates(item)}>
              <EditIcon style={{ color: "#009688" }} />
            </IconButton>
            <IconButton onClick={() => handleDelete(item._id)}>
              <RemoveIcon style={{ color: "#d32f2f" }} />
            </IconButton>
          </>
        }
        title={item.nameSeat}
      />
      <CardContent align="center">
        <Typography variant="h5" color="primary">
          {item.start} {" - "} {item.end}
        </Typography>
        <Typography variant="h5" align="center" color="secondary">
          <Link
            color="secondary"
            component={LinkRouter}
            to={`/dashboard/detail/${item._id}`}
          >
            {item.licensePlates}
          </Link>
        </Typography>
        <Typography variant="body2">
          Giá vé:{" "}
          <NumberFormat
            value={item.price}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" VNĐ"}
          />
        </Typography>
        <Typography variant="body2">Đã đặt: {seatBook()}</Typography>
        <Typography variant="body2">
          Tổng tiền:{" "}
          <NumberFormat
            value={seatBook() * item.price}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" VNĐ"}
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlatesList;
