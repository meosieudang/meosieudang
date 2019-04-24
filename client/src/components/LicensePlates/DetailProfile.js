import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProject,
  addNewLicensePlates,
  getPlates
} from "../../actions/profileAction";
import {
  deleteLicensePlates,
  updateLicensePlates,
  closeDelete,
  closeAdd,
  closeUpdate
} from "../../actions/platesAction";
import { withRouter } from "react-router-dom";
import { Paper, Grid, Typography } from "@material-ui/core";
import CreateLicensePlates from "./CreateLicensePlates";
import Spinner from "../../StyledComponents/Spinner";
import StyledSnackBars from "../../StyledComponents/StyledSnackBars";
import {
  MSG_UPDATE_SUCCESS,
  MSG_DELETE_SUCCESS,
  MSG_ADD_SUCCESS
} from "../../actions/type";
import PlatesList from "./PlatesList";
import NumberFormat from "react-number-format";

class DetailProfile extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  renderSnackbar = (open, close, message) => (
    <StyledSnackBars open={open} handleClose={close} message={message} />
  );

  render() {
    const {
      profiles,
      addNewLicensePlates,
      errors,
      plates,
      updateLicensePlates,
      isAuthenticated,
      isDelete,
      isAdd,
      isUpdate,
      closeDelete,
      closeAdd,
      closeUpdate
    } = this.props;

    if (Object.keys(profiles).length === 0) return <Spinner />;
    return (
      <Paper style={{ padding: "2rem", paddingTop: "15vh" }}>
        {this.renderSnackbar(isDelete, closeDelete, MSG_DELETE_SUCCESS)}
        {this.renderSnackbar(isAdd, closeAdd, MSG_ADD_SUCCESS)}
        {this.renderSnackbar(isUpdate, closeUpdate, MSG_UPDATE_SUCCESS)}

        {this.props.author === "admin" && (
          <CreateLicensePlates
            profiles={profiles}
            addNewLicensePlates={addNewLicensePlates}
            errors={errors}
            plates={plates}
            updateLicensePlates={updateLicensePlates}
            isAuthenticated={isAuthenticated}
          />
        )}

        <Typography
          variant="display1"
          align="center"
          gutterBottom
          style={{ marginTop: "3rem" }}
        >
          DANH SÁCH CHUYẾN XE NGÀY {profiles.create_date}
        </Typography>
        <Typography variant="title" align="center" gutterBottom>
          TỔNG TIỀN TRONG NGÀY {profiles.create_date}:{" "}
          <Typography variant="title" color="secondary" inline paragraph>
            <NumberFormat
              value={this.props.total}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" VNĐ"}
            />
          </Typography>
        </Typography>

        <Grid container spacing={16} justify="center">
          {profiles.profile.map(item => (
            <Grid item key={item._id}>
              <PlatesList
                item={item}
                getPlates={this.props.getPlates}
                deleteLicensePlates={this.props.deleteLicensePlates}
                author={this.props.author}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.project.profiles,
  errors: state.error,
  plates: state.project.plates,
  isAuthenticated: state.project.isAuthenticated,
  isDelete: state.project.isDelete,
  isAdd: state.project.isAdd,
  isUpdate: state.project.isUpdate,
  total: state.project.total,
  author: state.auth.user.author
});

export default connect(
  mapStateToProps,
  {
    getProject,
    addNewLicensePlates,
    getPlates,
    updateLicensePlates,
    deleteLicensePlates,
    closeDelete,
    closeAdd,
    closeUpdate
  }
)(withRouter(DetailProfile));
