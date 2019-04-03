import React, { Component, Fragment } from "react";
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

class Dashboard extends Component {
  state = {
    open: false,
    search: ""
  };

  handleClickOpen = () => this.setState({ open: true });

  handleClose = () => {
    this.setState({ open: false }, () => {
      this.props.closeDialog();
    });
  };

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value }, () =>
      this.props.searchProject(this.state.search)
    );

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

        <Tooltip title="Thêm project mới">
          <StyledFab onClick={this.handleClickOpen}>
            <AddIcon />
          </StyledFab>
        </Tooltip>

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

        <Grid container>
          <Grid item xs={12}>
            <Paper style={{ padding: "2%", margin: "0 3%" }}>
              <Grid container spacing={40} alignItems="center">
                <Search handleChange={this.handleChange} search={search} />
              </Grid>
              <ProjectList
                search={search}
                projects={projects}
                deleteProject={this.props.deleteProject}
              />
            </Paper>
          </Grid>
        </Grid>
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
  search: state.project.search
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
