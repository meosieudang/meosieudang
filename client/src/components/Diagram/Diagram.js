import React, { Component, Fragment } from "react";
import { Typography, Grid, Card } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDetailCar } from "../../actions/platesAction";

class Diagram extends Component {
  componentDidMount() {
    this.props.getDetailCar(this.props.match.params.id);
  }

  sliceSeat = (val1, val2, arr) => {
    return Object.keys(arr).length !== 0 ? arr.seat.slice(val1, val2) : [];
  };

  render() {
    const { detailProfile } = this.props;
    const seatDown1 = this.sliceSeat(0, 15, detailProfile);
    const seatDown2 = this.sliceSeat(15, 17, detailProfile);
    const seatDown3 = this.sliceSeat(17, 22, detailProfile);
    // const seatUp1 = this.sliceSeat(22, 37, detailProfile);
    // const seatUp2 = this.sliceSeat(37, 39, detailProfile);
    // const seatUp3 = this.sliceSeat(39, 44, detailProfile);
    return (
      <Fragment>
        <Typography variant="h6" align="center" style={{ margin: "10px 0" }}>
          SƠ ĐỒ PHƠI XE GIƯỜNG NẰM HƯNG THỊNH GIA LAI
        </Typography>
        <Grid container justify="space-around" style={{ marginBottom: 15 }}>
          <Grid item>
            <Typography variant="subtitle1">
              Tuyến: {`${detailProfile.start} - ${detailProfile.end}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Tuyến:
              {Object.keys(detailProfile).length > 0
                ? detailProfile.profile.create_date
                : null}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" inline>
              Số xe: {detailProfile.licensePlates}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row-reverse"
          spacing={8}
          justify="space-between"
        >
          {seatDown1.map(seat => (
            <Grid item style={{ margin: "0 15px" }} key={seat._id}>
              <Card style={{ width: 280, padding: 10 }}>
                <Typography align="right">{seat.nameSeat}</Typography>
                <Typography paragraph variant="title">
                  Tên khách: {seat.nameUser}
                </Typography>
                <Typography gutterBottom variant="title">
                  SĐT: {seat.phoneUser}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          direction="row-reverse"
          spacing={8}
          justify="space-between"
        >
          {seatDown2.map(seat => (
            <Grid item style={{ margin: "0 18px" }}>
              <Card style={{ width: 280, padding: 10, height: 100 }}>
                <Typography align="right">{seat.nameSeat}</Typography>
                <Typography paragraph>Tên khách: {seat.nameUser}</Typography>
                <Typography paragraph>SĐT: {seat.phoneUser}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container direction="row-reverse" spacing={8} justify="center">
          {seatDown3.map(seat => (
            <Grid item>
              <Card style={{ width: 180, padding: 10, height: 100 }}>
                <Typography align="right">{seat.nameSeat}</Typography>
                <Typography paragraph>Tên khách: {seat.nameUser}</Typography>
                <Typography paragraph>SĐT: {seat.phoneUser}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  detailProfile: state.project.detailProfile
});

export default connect(
  mapStateToProps,
  { getDetailCar }
)(withRouter(Diagram));
