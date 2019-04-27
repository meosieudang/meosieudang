import React, { Component } from "react";
import TabsList from "../TabsList";
import { Paper } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import FormMultiUser from "./FormMultiUser";
import FormMoveSeat from "./FormMoveSeat";
import FormDeleteListSeat from "./FormDeleteListSeat";

class SeatActionForm extends Component {
  state = {
    value: 0,
    selectMove1: null,
    selectMove2: null,
    idPlates: null
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChangeTabList = (e, value) => this.setState({ value });

  handleChangeMove1 = selectMove1 => {
    this.setState({ selectMove1 });
  };

  handleChangeMove2 = selectMove2 => {
    this.setState({ selectMove2 });
  };

  submitMove = e => {
    e.preventDefault();
    const { selectMove1, selectMove2 } = this.state;
    this.props.swapSeat(selectMove1.value, selectMove2.value);
    this.setState({
      selectMove1: null,
      selectMove2: null
    });
  };

  render() {
    const { detailProfile } = this.props;
    const { value, selectMove1, selectMove2 } = this.state;
    return (
      <>
        <TabsList
          value={value}
          handleChange={this.handleChangeTabList}
          label1="thêm nhiều khách"
          label2="Chuyển ghế"
        />
        <Paper style={{ padding: 15, marginTop: 20 }}>
          <SwipeableViews index={value} onChangeIndex={this.handleChangeIndex}>
            <FormMultiUser data={detailProfile} />
            <FormMoveSeat
              selectMove1={selectMove1}
              selectMove2={selectMove2}
              handleChangeMove1={this.handleChangeMove1}
              handleChangeMove2={this.handleChangeMove2}
              data={detailProfile}
              submitMove={this.submitMove}
            />
          </SwipeableViews>
        </Paper>
        <FormDeleteListSeat detailProfile={detailProfile} />
      </>
    );
  }
}

export default SeatActionForm;
