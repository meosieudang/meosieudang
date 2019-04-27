import React, { PureComponent } from "react";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import NumberFormat from "react-number-format";

class CreateLicensePlates extends PureComponent {
  state = {
    idPlates: "",
    start: "Gia Lai",
    end: "Sài Gòn",
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
  };

  renderTextField = (label, name, value, error, helperText) => (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={this.handleChange}
      error={error ? true : false}
      helperText={error ? error : helperText}
    />
  );

  render() {
    const { start, end, price, licensePlates, idPlates } = this.state;
    const { errors, plates } = this.props;
    return (
      <Paper>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item>
            {this.renderTextField(
              "Điểm xuất phát",
              "start",
              start,
              errors.start,
              "Vui lòng nhập điểm xuất phát"
            )}
          </Grid>
          <Grid item>
            {this.renderTextField(
              "Điểm đến",
              "end",
              end,
              errors.end,
              "Vui lòng nhập điểm đến"
            )}
          </Grid>
          <Grid item>
            <NumberFormat
              disabled={plates ? true : false}
              customInput={TextField}
              type="text"
              format="##B-###.##"
              label="Biển số xe"
              name="licensePlates"
              value={licensePlates}
              onChange={this.handleChange}
              error={errors.licensePlates ? true : false}
              helperText={
                errors.licensePlates
                  ? errors.licensePlates
                  : "Vui lòng nhập biển số xe"
              }
            />
          </Grid>

          <Grid item>
            {this.renderTextField(
              "Giá Vé",
              "price",
              price,
              errors.price,
              "Vui lòng nhập giá vé"
            )}
          </Grid>
          <Grid item>
            <form onSubmit={this.handleSubmit}>
              <Button
                variant="contained"
                type="submit"
                color={idPlates ? "primary" : "secondary"}
              >
                {idPlates ? "Sửa chuyến xe" : "Tạo chuyến xe"}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default CreateLicensePlates;
