import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser } from "../../actions/authAction";

const Navbar = ({ history, logOutUser, auth }) => {
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
    <AppBar position="static" style={{ backgroundColor: "#2196f3" }}>
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          HƯNG THỊNH GIA LAI
        </Typography>
        {auth.isAuthenticated ? authLink : guestLink}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOutUser }
)(withRouter(Navbar));
