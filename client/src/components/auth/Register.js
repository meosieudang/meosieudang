import React, { Component } from "react";
import { Paper, Grid, TextField, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errors: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return {
        errors: nextProps.errors
      };
    }
    return null;
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.props;
    return (
      <Paper style={{ margin: "0 25vw", marginTop: "2rem" }}>
        <Typography variant="display3" align="center">
          Register
        </Typography>
        <form onSubmit={this.onSubmit}>
          <Grid container justify="center" style={{ padding: "0 2rem" }}>
            <Grid item>
              <TextField
                fullWidth
                label="Name"
                onChange={this.onChange}
                name="name"
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password : null}
              />
              <TextField
                fullWidth
                label="Email"
                onChange={this.onChange}
                name="email"
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password : null}
              />
              <TextField
                fullWidth
                label="Password"
                onChange={this.onChange}
                name="password"
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password : null}
              />
              <Button
                style={{ display: "block", margin: "auto", marginTop: "10px" }}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.error
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
