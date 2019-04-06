import React, { Component } from "react";
import { Grid, TextField, Button, Paper, Typography } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { showRevenue, showProjects } from "../../actions/profileAction";
import Chart from "./Chart";
import { MONTHS, BG_COLORS } from "../../actions/type";
class Revenue extends Component {
  state = {
    year: 2019,
    chartData: {}
  };

  componentDidMount() {
    this.props.showProjects();
  }
  getData = () => {
    this.setState({
      chartData: {
        labels: MONTHS,
        datasets: [
          {
            label: "Doanh thu",
            backgroundColor: BG_COLORS,
            data: this.props.revenue
          }
        ]
      }
    });
  };
  componentDidUpdate(props) {
    if (this.props.revenue !== props.revenue) {
      this.getData();
    }
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const options = [];
    for (let i = 1; i <= 12; i++) {
      const format = ("0" + i).slice(-2);
      options.push(`${format}/${this.state.year}`);
    }
    this.props.showRevenue(options);
  };
  render() {
    const { year, chartData } = this.state;
    return (
      <Paper style={{ padding: "0 2%", paddingTop: "15vh" }}>
        {this.props.msg ? (
          <Typography variant="title" color="error" align="center" paragraph>
            {this.props.msg.msg}
          </Typography>
        ) : null}
        <Grid container justify="center" alignItems="flex-end" spacing={16}>
          <Grid item>
            <NumberFormat
              customInput={TextField}
              fullWidth
              label="Nhập số năm"
              onChange={this.onChange}
              name="year"
              format="####"
              value={year}
            />
          </Grid>
          <Grid item>
            <form onSubmit={this.onSubmit}>
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                disabled={!year ? true : false}
              >
                Submit
              </Button>
            </form>
          </Grid>
          <Grid item xs={12}>
            <Chart chartData={chartData} year={year} />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  revenue: state.project.revenue,
  chartData: state.project.chartData,
  projects: state.project.showProject,
  msg: state.error
});

export default connect(
  mapStateToProps,
  { showRevenue, showProjects }
)(Revenue);
