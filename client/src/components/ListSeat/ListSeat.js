import React, { Component } from "react";
import { Paper, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { closeDialog } from "../../actions/profileAction";
import {
  getDetailCar,
  addAndUpdateSeatDown,
  addMultiUser,
  swapSeat,
  closeDelete,
  closeAdd,
  closeUpdate
} from "../../actions/platesAction";
import { withRouter } from "react-router-dom";
import Price from "./Price";
import SeatActionForm from "./SeatActionForm/SeatActionForm";
import SeatMap from "./SeatMap/SeatMap";
import DialogActionForm from "./DialogActionForm/DialogActionForm";
import Spinner from "../../StyledComponents/Spinner";
import StyledSnackBars from "../../StyledComponents/StyledSnackBars";
import {
  MSG_DELETE_SUCCESS,
  MSG_ADD_SUCCESS,
  MSG_UPDATE_SUCCESS
} from "../../actions/type";
import TableBook from "./SeatMap/TableBook";

class ListSeat extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    this.props.getDetailCar(this.props.match.params.id);
  }

  renderSnackbar = (open, close, message) => (
    <StyledSnackBars open={open} handleClose={close} message={message} />
  );

  render() {
    const {
      detailProfile,
      addMultiUser,
      swapSeat,
      isAuthenticated,
      user,
      addAndUpdateSeatDown,
      isDelete,
      isAdd,
      isUpdate,
      closeDelete,
      closeAdd,
      closeUpdate
    } = this.props;
    const { open } = this.state;

    if (Object.keys(detailProfile).length === 0) return <Spinner />;
    return (
      <Paper style={{ padding: "2rem", paddingTop: "15vh" }}>
        <DialogActionForm
          open={open}
          handleClose={this.handleClickOpen}
          isAuthenticated={isAuthenticated}
          user={user}
          addAndUpdateSeatDown={addAndUpdateSeatDown}
        />

        {this.renderSnackbar(isDelete, closeDelete, MSG_DELETE_SUCCESS)}
        {this.renderSnackbar(isUpdate, closeUpdate, MSG_UPDATE_SUCCESS)}
        {this.renderSnackbar(isAdd, closeAdd, MSG_ADD_SUCCESS)}

        <Price detailProfile={detailProfile} />

        <TableBook detailProfile={detailProfile} />

        <Paper style={{ backgroundColor: "#eeeeee", padding: 15 }}>
          <Grid container spacing={16} justify="space-between">
            {this.props.author === "admin" ? (
              <Grid item xs={12} md={5} lg={4}>
                <SeatActionForm
                  detailProfile={detailProfile}
                  addMultiUser={addMultiUser}
                  swapSeat={swapSeat}
                />
              </Grid>
            ) : null}
            <Grid
              item
              xs={12}
              md={this.props.author === "admin" ? 7 : 12}
              lg={this.props.author === "admin" ? 8 : 12}
            >
              <SeatMap handleClickOpen={this.handleClickOpen} />
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  detailProfile: state.project.detailProfile,
  isAuthenticated: state.project.isAuthenticated,
  user: state.project.user,
  isDelete: state.project.isDelete,
  isAdd: state.project.isAdd,
  isUpdate: state.project.isUpdate,
  author: state.auth.user.author
});

export default connect(
  mapStateToProps,
  {
    getDetailCar,
    addAndUpdateSeatDown,
    addMultiUser,
    swapSeat,
    closeDialog,
    closeDelete,
    closeAdd,
    closeUpdate
  }
)(withRouter(ListSeat));
