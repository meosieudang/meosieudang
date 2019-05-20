import React, { useEffect } from "react";
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

const DetailProfile = props => {
  useEffect(() => {
    props.getProject(props.match.params.id);
  }, []);

  const renderSnackbar = (open, close, message) => (
    <StyledSnackBars open={open} handleClose={close} message={message} />
  );
  if (Object.keys(props.profiles).length === 0) return <Spinner />;
  return (
    <Paper style={{ padding: "2rem", paddingTop: "15vh" }}>
      {renderSnackbar(props.isDelete, props.closeDelete, MSG_DELETE_SUCCESS)}
      {renderSnackbar(props.isAdd, props.closeAdd, MSG_ADD_SUCCESS)}
      {renderSnackbar(props.isUpdate, props.closeUpdate, MSG_UPDATE_SUCCESS)}

      {props.author === "admin" && (
        <CreateLicensePlates
          profiles={props.profiles}
          addNewLicensePlates={props.addNewLicensePlates}
          errors={props.errors}
          plates={props.plates}
          updateLicensePlates={props.updateLicensePlates}
          isAuthenticated={props.isAuthenticated}
        />
      )}

      <Typography
        variant="display1"
        align="center"
        gutterBottom
        style={{ marginTop: "3rem" }}
      >
        DANH SÁCH CHUYẾN XE NGÀY {props.profiles.create_date}
      </Typography>
      <Typography variant="title" align="center" gutterBottom>
        TỔNG TIỀN TRONG NGÀY {props.profiles.create_date}:{" "}
        <Typography variant="title" color="secondary" inline paragraph>
          <NumberFormat
            value={props.total}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" VNĐ"}
          />
        </Typography>
      </Typography>

      <Grid container spacing={16} justify="center">
        {props.profiles.profile.map(item => (
          <Grid item key={item._id}>
            <PlatesList
              item={item}
              getPlates={props.getPlates}
              deleteLicensePlates={props.deleteLicensePlates}
              author={props.author}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

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
