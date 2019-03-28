import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProject,
  addNewLicensePlates,
  getPlates,
  updateLicensePlates,
  deleteLicensePlates
} from "../../actions/profileAction";
import { withRouter } from "react-router-dom";
import {
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import CreateLicensePlates from "./CreateLicensePlates";
import NumberFormat from "react-number-format";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import EditIcon from "@material-ui/icons/Create";
import swal from "sweetalert";

class DetailProfile extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  deleteLicensePlates = id => {
    swal({
      title: "Bạn có chắn chắn?",
      text: "Sau khi xóa, bạn sẽ không thể khôi phục dữ liệu này!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal("Xóa thành công", {
          icon: "success"
        });
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
      isAuthenticated
    } = this.props;

    return (
      <Paper style={{ padding: "2rem" }}>
        <CreateLicensePlates
          profiles={profiles}
          addNewLicensePlates={addNewLicensePlates}
          errors={errors}
          plates={plates}
          updateLicensePlates={updateLicensePlates}
          isAuthenticated={isAuthenticated}
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
          {Object.keys(profiles).length !== 0 ? (
            profiles.profile.map(item => (
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
                    <Typography
                      component={Link}
                      to={`/dashboard/detail/${item._id}`}
                      variant="h5"
                      align="center"
                      color="secondary"
                    >
                      {item.licensePlates}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h5">{"Loading..."}</Typography>
          )}
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  profiles: state.project.profiles,
  errors: state.error,
  plates: state.project.plates,
  isAuthenticated: state.project.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    getProject,
    addNewLicensePlates,
    getPlates,
    updateLicensePlates,
    deleteLicensePlates
  }
)(withRouter(DetailProfile));
