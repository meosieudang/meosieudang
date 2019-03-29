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
  modalContent,
  closeDelete,
  closeAdd,
  closeUpdate
} from "../../actions/platesAction";
import { withRouter } from "react-router-dom";
import {
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
  Link
} from "@material-ui/core";
import { Link as LinkRouter } from "react-router-dom";
import CreateLicensePlates from "./CreateLicensePlates";
import NumberFormat from "react-number-format";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import EditIcon from "@material-ui/icons/Create";
import { Spinner } from "../../StyledComponents/Spinner";
import StyledSnackBars from "../../StyledComponents/StyledSnackBars";
import {
  MSG_UPDATE_SUCCESS,
  MSG_DELETE_SUCCESS,
  MSG_ADD_SUCCESS
} from "../../actions/type";

class DetailProfile extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  deleteLicensePlates = id => {
    modalContent(
      "Bạn có chắn chắn?",
      "Sau khi xóa, bạn sẽ không thể khôi phục dữ liệu này!"
    ).then(willDelete => {
      if (willDelete) {
        this.props.deleteLicensePlates(id);
      }
    });
  };

  render() {
    const {
      profiles,
      addNewLicensePlates,
      errors,
      plates,
      updateLicensePlates,
      getPlates,
      isAuthenticated,
      isLoading,
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
        <CreateLicensePlates
          profiles={profiles}
          addNewLicensePlates={addNewLicensePlates}
          errors={errors}
          plates={plates}
          updateLicensePlates={updateLicensePlates}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        />

        <StyledSnackBars
          open={isDelete}
          handleClose={() => closeDelete()}
          message={MSG_DELETE_SUCCESS}
        />
        <StyledSnackBars
          open={isAdd}
          handleClose={() => closeAdd()}
          message={MSG_ADD_SUCCESS}
        />
        <StyledSnackBars
          open={isUpdate}
          handleClose={() => closeUpdate()}
          message={MSG_UPDATE_SUCCESS}
        />

        <Typography
          variant="display1"
          align="center"
          gutterBottom
          style={{ marginTop: "3rem" }}
        >
          DANH SÁCH CHUYẾN XE NGÀY {profiles.create_date}
        </Typography>

        <Grid container spacing={16} justify="center">
          {profiles.profile.map(item => (
            <Grid item key={item._id}>
              <Card>
                <CardHeader
                  style={{ padding: "5px 15px 0 15px" }}
                  action={
                    <>
                      <IconButton onClick={() => getPlates(item)}>
                        <EditIcon style={{ color: "#009688" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => this.deleteLicensePlates(item._id)}
                      >
                        <RemoveIcon style={{ color: "#d32f2f" }} />
                      </IconButton>
                    </>
                  }
                  title={item.nameSeat}
                />
                <CardContent align="center">
                  <Typography variant="h5" color="primary">
                    {item.start} {" - "} {item.end}
                  </Typography>
                  <Typography variant="h6">
                    Giá vé:{" "}
                    <NumberFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" VNĐ"}
                    />
                  </Typography>
                  <Typography variant="h5" align="center" color="secondary">
                    <Link
                      color="secondary"
                      component={LinkRouter}
                      to={`/dashboard/detail/${item._id}`}
                    >
                      {item.licensePlates}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
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
  isLoading: state.project.isLoading,
  isDelete: state.project.isDelete,
  isAdd: state.project.isAdd,
  isUpdate: state.project.isUpdate
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
