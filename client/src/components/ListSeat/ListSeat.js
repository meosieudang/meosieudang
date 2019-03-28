import React, { Component } from "react";
import { Paper, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import {
  getDetailCar,
  addAndUpdateSeatDown,
  addMultiUser,
  swapSeat,
  closeDialog
} from "../../actions/profileAction";
import { withRouter } from "react-router-dom";
import Price from "./Price";
import SeatActionForm from "./SeatActionForm/SeatActionForm";
import SeatMap from "./SeatMap/SeatMap";
import DialogActionForm from "./DialogActionForm/DialogActionForm";
import StyledSnackBars from "../../StyledComponents/StyledSnackBars";

class ListSeat extends Component {
  state = {
    open: false,
    openSnackBar: false
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnackBar: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false }, () => {
      this.props.closeDialog();
    });
  };

  componentDidMount() {
    this.props.getDetailCar(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (!this.state.openSnackBar) {
      if (this.props.isAuthenticated) {
        setTimeout(() => this.setState({ openSnackBar: true }), 1000);
      }
    }
  }

  render() {
    const {
      detailProfile,
      addMultiUser,
      swapSeat,
      isAuthenticated,
      user,
      addAndUpdateSeatDown
    } = this.props;
    const { open, openSnackBar } = this.state;

    return (
      <Paper style={{ padding: "2rem" }}>
        <DialogActionForm
          open={open}
          handleClose={this.handleClose}
          isAuthenticated={isAuthenticated}
          user={user}
          addAndUpdateSeatDown={addAndUpdateSeatDown}
        />

        <StyledSnackBars
          open={openSnackBar}
          handleClose={this.handleCloseSnackbar}
          message={"Thêm Thành Công"}
        />

        <Price detailProfile={detailProfile} />

        <Paper style={{ backgroundColor: "#eeeeee", padding: 15 }}>
          <Grid container spacing={16} justify="space-between">
            <Grid item xs={12} md={4}>
              <SeatActionForm
                detailProfile={detailProfile}
                addMultiUser={addMultiUser}
                swapSeat={swapSeat}
              />
            </Grid>
            <Grid item xs={12} md={8}>
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
  msgError: state.error,
  isAuthenticated: state.project.isAuthenticated,
  user: state.project.user
});

export default connect(
  mapStateToProps,
  {
    getDetailCar,

    addAndUpdateSeatDown,
    addMultiUser,
    swapSeat,
    closeDialog
  }
)(withRouter(ListSeat));
