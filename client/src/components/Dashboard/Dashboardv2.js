import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  getAllProject,
  addNewProject,
  closeDialog,
  deleteProject,
  searchProject
} from "../../actions/profileAction";
import { Paper, Typography, Grid, Fab, Tooltip } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import styled from "styled-components";
import DialogAction from "./DialogAction";
import Search from "./Search";
import ProjectList from "./ProjectList";

const StyledFab = styled(props => (
  <Fab size="large" classes={{ root: "root" }} {...props} />
))`
  &.root {
    position: fixed;
    bottom: 35px;
    right: 34px;
    z-index: 99;
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

class Dashboardv2 extends Component {
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

  render() {
    const {
      projects,
      msgError,
      isAuthenticated,
      addNewProject,
      search
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

        <Tooltip title="Thêm project mới">
          <StyledFab onClick={this.handleClickOpen}>
            <AddIcon />
          </StyledFab>
        </Tooltip>

        <Typography
          align="center"
          variant="display2"
          gutterBottom
          style={{ marginTop: "2rem" }}
        >
          DANH SÁCH XE THEO NGÀY
        </Typography>

        <Grid container>
          <Grid item xs={12}>
            <Paper style={{ padding: "2%", margin: "0 2%" }}>
              <Search handleChange={this.handleChange} search={search} />
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
  search: state.project.search
});

export default connect(
  mapStateToProps,
  { getAllProject, addNewProject, closeDialog, deleteProject, searchProject }
)(Dashboardv2);
