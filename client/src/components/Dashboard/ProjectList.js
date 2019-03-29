import React, { Component } from "react";
import styled from "styled-components";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { TITLES } from "../../actions/type";
import { ItemRender, PaginationRender } from "./Pagination";

const StyledDiv = styled(props => (
  <div classes={{ root: "root" }} {...props} />
))`
  overflow-x: auto;
`;

class ProjectList extends Component {
  state = {
    openConfirm: false,
    currentPage: 1,
    todosPerPage: 5,
    active: false
  };

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  itemRender = (arr, currentPage, todosPerPage) => {
    return (
      <ItemRender
        currentPage={currentPage}
        todosPerPage={todosPerPage}
        arr={arr}
      />
    );
  };

  paginateRender = (arr, currentPage, todosPerPage) => (
    <PaginationRender
      currentPage={currentPage}
      todosPerPage={todosPerPage}
      arr={arr}
      handleClick={this.handleClick}
    />
  );

  render() {
    const { search, projects } = this.props;
    const { currentPage, todosPerPage } = this.state;
    return (
      <>
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
              {Object.keys(search).length === 0
                ? this.itemRender(projects, currentPage, todosPerPage)
                : this.itemRender(search, currentPage, todosPerPage)}
            </TableBody>
          </Table>
        </StyledDiv>
        {Object.keys(search).length === 0
          ? this.paginateRender(projects, currentPage, todosPerPage)
          : this.paginateRender(search, currentPage, todosPerPage)}
      </>
    );
  }
}

export default ProjectList;
