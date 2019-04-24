import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import {
  getAllProject,
  addNewProject,
  closeDialog,
  deleteProject,
  searchProject
} from "../../actions/profileAction";
import { closeDelete, closeAdd } from "../../actions/platesAction";
import { MSG_DELETE_SUCCESS, MSG_ADD_SUCCESS } from "../../actions/type";
import { Paper, Typography, Grid, Fab, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DialogAction from "./DialogAction";
import Search from "./Search";
import ProjectList from "./ProjectList";
import StyledSnackBars from "../../StyledComponents/StyledSnackBars";
import styled from "styled-components";
import Paginate from "./Paginate";

const StyledFab = styled(props => (
  <Fab size="large" classes={{ root: "root" }} {...props} />
))`
  &.root {
    position: fixed;
    bottom: 35px;
    right: 34px;
    z-index: 1;
    background: #20c997;
    color: white;

    &:hover {
      background: ccc;
      color: #20c997;
    }

    &:focus {
      outline: none;
    }
  }
`;

class Dashboard extends PureComponent {
  state = {
    open: false
  };

  handleClickOpen = () => this.setState({ open: true });

  handleClose = () => {
    this.setState({ open: false }, () => {
      this.props.closeDialog();
    });
  };

  componentDidMount() {
    this.props.getAllProject();
  }

  renderSnackbar = (open, close, message) => (
    <StyledSnackBars open={open} handleClose={close} message={message} />
  );

  render() {
    const {
      projects,
      msgError,
      isAuthenticated,
      addNewProject,
      search,
      isDelete,
      closeDelete,
      isAdd,
      closeAdd
    } = this.props;
    const { open } = this.state;
    return (
      <Fragment>
        <DialogAction
          open={open}
          handleClose={this.handleClose}
          msgError={msgError}
          isAuthenticated={isAuthenticated}
          addNewProject={addNewProject}
        />

        {this.renderSnackbar(isDelete, closeDelete, MSG_DELETE_SUCCESS)}
        {this.renderSnackbar(isAdd, closeAdd, MSG_ADD_SUCCESS)}

        {this.props.author === "admin" && (
          <Tooltip title="Thêm project mới">
            <StyledFab onClick={this.handleClickOpen}>
              <AddIcon />
            </StyledFab>
          </Tooltip>
        )}

        <Typography
          align="center"
          variant="display2"
          gutterBottom
          style={{ marginTop: "15vh" }}
        >
          {Object.keys(projects).length !== 0
            ? "DANH SÁCH XE THEO NGÀY"
            : "DANH SÁCH XE HIỆN TẠI RỖNG"}
        </Typography>

        <Paper style={{ padding: "2%", margin: "0 3%" }}>
          {msgError ? (
            <Typography variant="title" color="error" align="center" paragraph>
              {msgError.msg}
            </Typography>
          ) : null}
          <Grid container justify="center" spacing={24} alignItems="center">
            <Grid item xs={12} md={10}>
              <Search searchProject={this.props.searchProject} />
            </Grid>
            <Grid item xs={12} md={10}>
              <ProjectList
                search={search}
                projects={projects}
                deleteProject={this.props.deleteProject}
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <Paginate
                projects={projects}
                getAllProject={this.props.getAllProject}
              />
            </Grid>
          </Grid>
        </Paper>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.project.projects,
  msgError: state.error,
  isAuthenticated: state.project.isAuthenticated,
  isDelete: state.project.isDelete,
  isAdd: state.project.isAdd,
  search: state.project.search,
  author: state.auth.user.author
});

export default connect(
  mapStateToProps,
  {
    getAllProject,
    addNewProject,
    closeDialog,
    deleteProject,
    searchProject,
    closeDelete,
    closeAdd
  }
)(Dashboard);
