import React, { Component } from "react";
import { Paper, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { closeDialog } from "../../actions/profileAction";
import {
  getDetailCar,
  addAndUpdateSeatDown,
  addMultiUser,
  swapSeat
} from "../../actions/platesAction";
import { withRouter } from "react-router-dom";
import Price from "./Price";
import SeatActionForm from "./SeatActionForm/SeatActionForm";
import SeatMap from "./SeatMap/SeatMap";
import DialogActionForm from "./DialogActionForm/DialogActionForm";
import { Spinner } from "../../StyledComponents/Spinner";

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

  render() {
    const {
      detailProfile,
      addMultiUser,
      swapSeat,
      isAuthenticated,
      user,
      addAndUpdateSeatDown
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
