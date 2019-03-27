import React, { Component } from "react";
import TabsList from "../TabsList";
import SwipeableViews from "react-swipeable-views";
import Seat from "./Seat";
import CreateListSeat from "./CreateListSeat";
import { connect } from "react-redux";
import { addNewListSeat } from "../../../actions/profileAction";

class SeatMap extends Component {
  state = {
    value: 0,
    numberSeat: undefined
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const numSeat = {
      numberSeat: this.state.numberSeat
    };
    this.props.addNewListSeat(this.props.detailProfile._id, numSeat);
  };

  handleChange = (e, value) => this.setState({ value });

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { value, numberSeat } = this.state;
    const { seatDown, seatUp, handleClickOpen, errors } = this.props;
    return (
      <>
        <TabsList
          value={value}
          handleChange={this.handleChange}
          label1="tầng dưới"
          label2="tầng trên"
        />
        <SwipeableViews index={value} onChangeIndex={this.handleChangeIndex}>
          <Seat seatArray={seatDown} handleClickOpen={handleClickOpen} />
          <Seat seatArray={seatUp} handleClickOpen={handleClickOpen} />
        </SwipeableViews>

        {seatDown.length === 0 ? (
          <CreateListSeat
            style={{ marginTop: 20 }}
            numberSeat={numberSeat}
            onChange={this.onChange}
            handleSubmit={this.onSubmit}
            errors={errors}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => ({
  detailProfile: state.project.detailProfile,
  seatDown: state.project.seatDown,
  seatUp: state.project.seatUp,
  errors: state.error
});

export default connect(
  mapStateToProps,
  { addNewListSeat }
)(SeatMap);
