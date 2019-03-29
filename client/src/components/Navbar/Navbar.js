import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser } from "../../actions/authAction";
import { SpinnerLoading } from "../../StyledComponents/Spinner";

const Navbar = ({ history, logOutUser, auth, isLoading }) => {
  const logOut = () => {
    history.push("/");
    logOutUser();
  };

  const authLink = (
    <>
      <Button color="inherit" component={Link} to="/dashboard">
        Trang chủ
      </Button>
      <Avatar src={auth.user.avatar} alt="anh" />
      <Button color="inherit" onClick={() => logOut()}>
        Logout
      </Button>
    </>
  );
  const guestLink = (
    <>
      <Button color="inherit" component={Link} to="/">
        Login
      </Button>

      <Button>Register</Button>
    </>
  );

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "#2196f3" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            HƯNG THỊNH GIA LAI
          </Typography>
          {auth.isAuthenticated ? authLink : guestLink}
        </Toolbar>
      </AppBar>
      {isLoading ? <SpinnerLoading /> : null}
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  isLoading: state.project.isLoading
});

export default connect(
  mapStateToProps,
  { logOutUser }
)(withRouter(Navbar));
