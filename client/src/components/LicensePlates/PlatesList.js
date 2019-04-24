import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Link,
  Button,
  Grid
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { Link as LinkRouter } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Create";
import Visibility from "@material-ui/icons/Visibility";
import { modalContent } from "../../actions/platesAction";

const handleDelete = (id, action) => {
  modalContent("Bạn có chắn chắn", "Dữ liệu này sẽ không thể khôi phục !").then(
    del => {
      if (del) {
        action(id);
      }
    }
  );
};

const seatBook = arr => arr.seat.filter(seat => seat.isBook).length;

const PlatesList = ({ item, getPlates, deleteLicensePlates, author }) => {
  return (
    <Card>
      <CardHeader
        action={
          <Grid container spacing={8}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                component={LinkRouter}
                to={`/dashboard/detail/${item._id}`}
              >
                Chi tiết
                <Visibility style={{ color: "#ff5722", marginLeft: 10 }} />
              </Button>
            </Grid>

            {author === "admin" && (
              <>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => getPlates(item)}
                  >
                    Sửa
                    <EditIcon style={{ color: "#009688", marginLeft: 10 }} />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleDelete(item._id, deleteLicensePlates)}
                  >
                    Xóa
                    <DeleteIcon style={{ color: "#d32f2f", marginLeft: 10 }} />
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
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
        <Typography variant="body2">Đã đặt: {seatBook(item)}</Typography>
        <Typography variant="body2">
          Tổng tiền:{" "}
          <NumberFormat
            value={seatBook(item) * item.price}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" VNĐ"}
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default React.memo(PlatesList);
