import React, { Component } from "react";
import TabsList from "../TabsList";
import SwipeableViews from "react-swipeable-views";
import CreateListSeat from "./CreateListSeat";
import { connect } from "react-redux";
import { addNewListSeat } from "../../../actions/platesAction";
import SeatArray from "./SeatArray";
import FormSearch from "../SeatActionForm/FormSearch";
import { Typography } from "@material-ui/core";

class SeatMap extends Component {
  state = {
    value: 0,
    numberSeat: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const numSeat = {
      numberSeat: this.state.numberSeat
    };
    this.props.addNewListSeat(this.props.detailProfile._id, numSeat);
  };

  handleChangeTabList = (e, value) => this.setState({ value });

  handleChangeIndex = index => this.setState({ value: index });

  render() {
    const { value, numberSeat } = this.state;
    const {
      seatDown,
      seatUp,
      handleClickOpen,
      errors,
      searchPhone
    } = this.props;

    if (seatDown.length === 0 && this.props.author === "admin")
      return (
        <CreateListSeat
          style={{ marginTop: 20 }}
          numberSeat={numberSeat}
          onChange={this.onChange}
          handleSubmit={this.onSubmit}
          errors={errors}
        />
      );
    return (
      <>
        <TabsList
          value={value}
          handleChange={this.handleChangeTabList}
          label1="tầng dưới"
          label2="tầng trên"
          label3="tìm kiếm ghế"
          label4="Phơi xe"
        />
        <SwipeableViews index={value} onChangeIndex={this.handleChangeIndex}>
          <SeatArray seatArray={seatDown} handleClickOpen={handleClickOpen} />
          <SeatArray seatArray={seatUp} handleClickOpen={handleClickOpen} />
          <div>
            <FormSearch />
            {Object.keys(searchPhone).length !== 0 ? (
              <SeatArray
                seatArray={this.props.searchPhone}
                handleClickOpen={handleClickOpen}
              />
            ) : (
              <Typography align="center" style={{ marginTop: "2rem" }}>
                Không tìm thấy
              </Typography>
            )}
          </div>
        </SwipeableViews>
      </>
    );
  }
}

const mapStateToProps = state => ({
  detailProfile: state.project.detailProfile,
  seatDown: state.project.seatDown,
  seatUp: state.project.seatUp,
  searchPhone: state.project.searchPhone,
  errors: state.error,
  author: state.auth.user.author
});

export default connect(
  mapStateToProps,
  { addNewListSeat }
)(SeatMap);
