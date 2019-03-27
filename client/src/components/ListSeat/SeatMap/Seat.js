import React from "react";
import {
  CardContent,
  Card,
  Typography,
  IconButton,
  CardHeader
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import EditIcon from "@material-ui/icons/Create";
import { connect } from "react-redux";
import { getUser, deleteSeat } from "../../../actions/profileAction";

const Seat = ({ seatArray, handleClickOpen, getUser, deleteSeat }) => {
  const getUserAndOpenModal = user => {
    getUser(user);
    handleClickOpen();
  };

  const handleDeleteSeat = id => {
    if (window.confirm("Bạn có muốn xóa khách hàng này ?")) {
      deleteSeat(id);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row-reverse",
        justifyContent: "center"
      }}
    >
      {seatArray.map(item => (
        <Card
          style={{
            width: 220,
            height: 140,
            margin: 10,
            marginTop: 20,
            backgroundColor: item.isBook ? "#1976d2" : ""
          }}
          key={item._id}
        >
          <CardHeader
            style={{ padding: "5px 15px 0 15px" }}
            action={
              <>
                <IconButton onClick={() => getUserAndOpenModal(item)}>
                  <EditIcon style={{ color: "#ffa000" }} />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteSeat(item._id)}
                  disabled={item.nameUser ? false : true}
                >
                  <RemoveIcon style={{ color: "#d32f2f" }} />
                </IconButton>
              </>
            }
            title={item.nameSeat}
          />
          <CardContent style={{ padding: 0 }}>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              style={{ color: item.nameUser ? "white" : "black" }}
            >
              {item.nameUser}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              style={{ color: "white" }}
            >
              {item.phoneUser}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default connect(
  null,
  { getUser, deleteSeat }
)(Seat);
