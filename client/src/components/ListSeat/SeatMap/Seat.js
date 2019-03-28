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
import styled from "styled-components";

const StyleCard = styled(props => <Card {...props} />)`
  width: 220px;
  height: 140px;
  margin: 10px;
  margin-top: 20px;
  background-color: ${props => (props.isbook ? "#1976d2 " : "")} !important;

  @media screen and (max-width: 1024px) {
    width: 180px;
  }
`;

const StyledWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  justify-content: center;
`;

const StyledTypography = styled(props => (
  <Typography variant="h5" gutterBottom align="center" {...props} />
))`
  color: ${props => (props.textcolor ? "white" : "black")} !important;
`;

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
    <StyledWrap>
      {seatArray.map(item => (
        <StyleCard key={item._id} isbook={item.isBook ? "true" : undefined}>
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
            <StyledTypography textcolor={item.nameUser ? "true" : "false"}>
              {item.nameUser}
            </StyledTypography>
            <StyledTypography textcolor="true">
              {item.phoneUser}
            </StyledTypography>
          </CardContent>
        </StyleCard>
      ))}
    </StyledWrap>
  );
};

export default connect(
  null,
  { getUser, deleteSeat }
)(Seat);
