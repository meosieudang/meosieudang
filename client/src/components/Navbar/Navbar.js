import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser } from "../../actions/authAction";
import Spinner from "../../StyledComponents/Spinner";

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
      <Button color="inherit" component={Link} to="/revenue">
        Doanh thu
      </Button>
      <Avatar src={auth.user.avatar} alt="anh" />
      <Button color="inherit" onClick={() => logOut()}>
        Đăng xuất
      </Button>
    </>
  );
  const guestLink = (
    <>
      <Button color="inherit" component={Link} to="/">
        Đăng nhập
      </Button>

      <Button>Đăng kí</Button>
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
      {isLoading ? <Spinner /> : null}
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
