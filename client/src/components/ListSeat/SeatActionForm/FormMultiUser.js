import React, { Component } from "react";
import Select from "react-select";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { addMultiUser } from "../../../actions/platesAction";

class FormMultiUser extends Component {
  state = { nameUser: "", phoneUser: "", selectedOption: null };

  handleChangeSelect = selectedOption => this.setState({ selectedOption });

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitMulti = e => {
    // e.preventDefault();
    const { selectedOption, nameUser, phoneUser } = this.state;
    const value = selectedOption.map(item => item.value);
    const newUser = {
      data: value,
      nameUser: nameUser,
      phoneUser: phoneUser,
      idPlates: this.props.data._id
    };

    this.props.addMultiUser(newUser);
    this.setState({
      nameUser: "",
      phoneUser: "",
      selectedOption: null
    });
  };

  onKeyUp = e => {
    return e.keyCode === 13 && this.handleSubmitMulti();
  };

  listOptions = arr => {
    return arr.seat
      .filter(item => item.isBook === false)
      .map(item => ({ value: item._id, label: item.nameSeat }));
  };

  render() {
    const { nameUser, phoneUser, selectedOption } = this.state;

    return (
      <Paper style={{ padding: 15 }}>
        <Typography variant="display1" align="center" gutterBottom>
          THÊM NHIỀU GHẾ
        </Typography>
        <Select
          closeMenuOnSelect={false}
          isMulti
          value={selectedOption}
          onChange={this.handleChangeSelect}
          options={this.listOptions(this.props.data)}
        />
        <TextField
          fullWidth
          label="Tên khách"
          onChange={this.handleChange}
          name="nameUser"
          value={nameUser}
        />
        <NumberFormat
          onKeyUp={this.onKeyUp}
          customInput={TextField}
          fullWidth
          label="Số điện thoại"
          onChange={this.handleChange}
          name="phoneUser"
          value={phoneUser}
          format="#### ### ###"
        />

        <Button
          onClick={this.handleSubmitMulti}
          variant="contained"
          color="primary"
          style={{ display: "block", margin: "auto", marginTop: 15 }}
          disabled={!selectedOption || !phoneUser ? true : false}
        >
          OK
        </Button>
      </Paper>
    );
  }
}

export default connect(
  null,
  { addMultiUser }
)(FormMultiUser);
