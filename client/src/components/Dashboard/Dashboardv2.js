import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  getAllProject,
  addNewProject,
  closeDialog,
  deleteProject,
  searchProject
} from "../../actions/profileAction";
import {
  Paper,
  Typography,
  Grid,
  Fab,
  Tooltip,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { PaginationRender, ItemRender } from "./Pagination";

import AddIcon from "@material-ui/icons/Add";

import styled from "styled-components";
import DialogAction from "./DialogAction";
import { TITLES } from "../../actions/type";

const StyledDiv = styled(props => (
  <div classes={{ root: "root" }} {...props} />
))`
  overflow-x: auto;
`;

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
    currentPage: 1,
    todosPerPage: 5,
    active: false,
    search: ""
  };

  handleClickOpen = () => this.setState({ open: true });

  handleClose = () => {
    this.setState({ open: false }, () => {
      this.props.closeDialog();
    });
  };

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value }, () =>
      this.props.searchProject(this.state.search)
    );

  handleDeleteProject = id => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dữ liệu này ?")) {
      this.props.deleteProject(id);
    }
  };

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
              <TextField
                label="Tìm theo ngày..."
                type="search"
                margin="normal"
                className="ml-3"
                name="search"
                onChange={this.handleChange}
              />
              {Object.keys(search).length < 0 ? (
                <Typography>Không tìm thấy</Typography>
              ) : (
                <Typography>{`Có ${
                  Object.keys(search).length
                } kết quả tìm thấy`}</Typography>
              )}
              <StyledDiv>
                <Table>
                  <TableHead>
                    <TableRow>
                      {TITLES.map((title, id) => (
                        <TableCell key={id}>{title}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(search).length === 0 ? (
                      <ItemRender
                        currentPage={this.state.currentPage}
                        todosPerPage={this.state.todosPerPage}
                        arr={projects}
                        handleClickOpen={this.handleClickOpen}
                      />
                    ) : (
                      <ItemRender
                        currentPage={this.state.currentPage}
                        todosPerPage={this.state.todosPerPage}
                        arr={search}
                        handleClickOpen={this.handleClickOpen}
                      />
                    )}
                  </TableBody>
                </Table>
              </StyledDiv>
              {Object.keys(search).length === 0 ? (
                <PaginationRender
                  currentPage={this.state.currentPage}
                  todosPerPage={this.state.todosPerPage}
                  arr={projects}
                  handleClick={this.handleClick}
                />
              ) : (
                <PaginationRender
                  currentPage={this.state.currentPage}
                  todosPerPage={this.state.todosPerPage}
                  arr={search}
                  handleClick={this.handleClick}
                />
              )}
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
