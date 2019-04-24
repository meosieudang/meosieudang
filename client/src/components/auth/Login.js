import React, { Component, Fragment } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { StyledPaper } from "../../StyledComponents/StyledPaper";
import { StyledTextField } from "../../StyledComponents/StyledTextField";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, logOutUser } from "../../actions/authAction";

class Login extends Component {
  state = {
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user, this.props.history);
  };

  render() {
    const { auth } = this.props;
    const { errors } = this.state;
    if (auth.isAuthenticated) return <Redirect to="/dashboard" />;
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <StyledPaper>
            <Typography variant="display3" align="center">
              Đăng Nhập
            </Typography>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <StyledTextField
                  full="true"
                  autoFocus
                  bongpro="true"
                  label="Tài khoản"
                  onChange={this.handleChange}
                  name="email"
                  error={errors.email ? true : false}
                  helperText={errors.email ? errors.email : null}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  type="password"
                  full="true"
                  label="Mật khẩu"
                  onChange={this.handleChange}
                  name="password"
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password : null}
                />
              </Grid>
              <Grid
                container
                spacing={16}
                justify="center"
                style={{ marginTop: 10 }}
              >
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Đăng nhập
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.logOutUser()}
                  >
                    Đăng kí
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <div className="text-danger mt-3 center">
              {auth.err ? <p>{auth.err}</p> : null}
            </div>
          </StyledPaper>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.error
  };
};

export default connect(
  mapStateToProps,
  { loginUser, logOutUser }
)(Login);
