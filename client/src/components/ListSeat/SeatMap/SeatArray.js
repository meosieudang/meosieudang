import React from "react";
import { connect } from "react-redux";
import {
  getUser,
  deleteSeat,
  modalContent
} from "../../../actions/platesAction";
import styled from "styled-components";
import {
  CardContent,
  Card,
  Typography,
  CardHeader,
  Button,
  Grid
} from "@material-ui/core";

const SeatArray = ({
  seatArray,
  handleClickOpen,
  getUser,
  deleteSeat,
  author
}) => {
  const getUserAndOpenModal = user => {
    getUser(user);
    handleClickOpen();
  };

  const handleDelete = id => {
    modalContent(
      "Bạn có chắn chắn",
      "Sau khi xóa dữ liệu khách hàng này sẽ không thể khôi phục!"
    ).then(del => {
      if (del) {
        deleteSeat(id);
      }
    });
  };
  return (
    <StyledWrap>
      {seatArray.map(item => (
        <StyleCard key={item._id} isbook={item.isBook ? "true" : undefined}>
          <CardHeader
            action={
              author === "admin" && (
                <Grid container spacing={8}>
                  <Grid item>
                    <Button
                      style={{ backgroundColor: "green", color: "white" }}
                      variant="contained"
                      size="small"
                      onClick={() => getUserAndOpenModal(item)}
                    >
                      Sửa
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(item._id)}
                      disabled={item.phoneUser ? false : true}
                    >
                      Xóa
                    </Button>
                  </Grid>
                </Grid>
              )
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

const mapStateToProps = state => ({
  author: state.auth.user.author
});

export default connect(
  mapStateToProps,
  { getUser, deleteSeat }
)(SeatArray);

const StyleCard = styled(props => <Card {...props} />)`
  width: 220px;
  height: 140px;
  margin: 10px;
  margin-top: 20px;
  background-color: ${props => (props.isbook ? "#1976d2 " : "")} !important;
`;

const StyledTypography = styled(props => (
  <Typography variant="subtitle1" gutterBottom align="center" {...props} />
))`
  color: ${props => (props.textcolor ? "white" : "black")} !important;
`;

const StyledWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  justify-content: center;
`;
