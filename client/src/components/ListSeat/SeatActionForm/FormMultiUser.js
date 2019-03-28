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
    e.preventDefault();
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

  listOptions = arr => {
    return Object.keys(arr).length > 0
      ? arr.seat
          .filter(item => item.isBook === false)
          .map(item => ({ value: item._id, label: item.nameSeat }))
      : [];
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
          label="Name User"
          onChange={this.handleChange}
          name="nameUser"
          value={nameUser}
        />
        <NumberFormat
          customInput={TextField}
          fullWidth
          label="Phone User"
          onChange={this.handleChange}
          name="phoneUser"
          value={phoneUser}
          format="#### ### ####"
        />
        <form onSubmit={this.handleSubmitMulti}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ display: "block", margin: "auto", marginTop: 15 }}
            disabled={!selectedOption || !nameUser || !phoneUser ? true : false}
          >
            Submit
          </Button>
        </form>
      </Paper>
    );
  }
}

export default connect(
  null,
  { addMultiUser }
)(FormMultiUser);
