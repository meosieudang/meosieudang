import React, { Component } from "react";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import NumberFormat from "react-number-format";

class CreateLicensePlates extends Component {
  state = {
    idPlates: "",
    start: "",
    end: "",
    licensePlates: "81B-011.84",
    price: "250000"
  };

  componentWillReceiveProps(nextProps) {
    const { plates } = nextProps;
    if (nextProps && nextProps.plates) {
      this.setState({
        idPlates: plates._id,
        start: plates.start,
        end: plates.end,
        licensePlates: plates.licensePlates,
        price: plates.price
      });
    } else {
      this.setState({
        idPlates: "",
        start: "",
        end: "",
        licensePlates: "81B-011.84",
        price: "250000"
      });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { profiles, addNewLicensePlates, updateLicensePlates } = this.props;

    const newLicensePlates = {
      licensePlates: this.state.licensePlates,
      start: this.state.start,
      end: this.state.end,
      price: this.state.price
    };
    if (this.state.idPlates) {
      //edit
      updateLicensePlates(newLicensePlates, this.state.idPlates);
    } else {
      //add

      addNewLicensePlates(newLicensePlates, profiles._id);
    }

    if (!this.props.errors) {
      this.setState({
        start: "",
        end: "",
        licensePlates: "81B-011.84",
        price: "250000"
      });
    }
  };

  render() {
    const { start, end, price, licensePlates } = this.state;
    const { errors, plates } = this.props;
    return (
      <Paper>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item>
            <TextField
              label="Điểm xuất phát"
              name="start"
              value={this.state.start}
              onChange={this.handleChange}
              helperText="Vui lòng nhập điểm xuất phát"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Điểm đến"
              name="end"
              value={this.state.end}
              onChange={this.handleChange}
              helperText="Vui lòng nhập điểm đến"
            />
          </Grid>
          <Grid item>
            <NumberFormat
              disabled={plates ? true : false}
              customInput={TextField}
              type="text"
              format="##B-###.##"
              label="Biển số xe"
              name="licensePlates"
              value={this.state.licensePlates}
              onChange={this.handleChange}
              error={errors && errors.licensePlates ? true : false}
              helperText={
                errors && errors.licensePlates
                  ? errors.licensePlates
                  : "Vui lòng nhập biển số xe"
              }
            />
          </Grid>

          <Grid item>
            <TextField
              label="Giá Vé"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
              error={errors && errors.price ? true : false}
              helperText={
                errors && errors.price ? errors.price : "Vui lòng nhập giá vé"
              }
            />
          </Grid>
          <Grid item>
            <form onSubmit={this.handleSubmit}>
              <Button
                variant="contained"
                style={{ display: "block", margin: "auto" }}
                type="submit"
                disabled={
                  !start || !end || !licensePlates || !price ? true : false
                }
              >
                {this.state.idPlates ? "Sửa dữ liệu" : "Tạo chuyến xe"}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default CreateLicensePlates;
