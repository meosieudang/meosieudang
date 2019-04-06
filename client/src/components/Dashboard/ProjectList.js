import React from "react";
import styled from "styled-components";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { TITLES } from "../../actions/type";
import UserItem from "./UserItem";

const StyledDiv = styled(props => <div {...props} />)`
  overflow-x: auto;
`;

const itemRender = (arr, action) =>
  arr.map((project, i) => (
    <TableRow key={project._id}>
      <UserItem project={project} deleteProject={action} index={i} />
    </TableRow>
  ));

const ProjectList = ({ projects, deleteProject, search }) => {
  if (Object.keys(projects).length === 0) return [];
  return (
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
            ? itemRender(projects.docs, deleteProject)
            : itemRender(search, deleteProject)}
        </TableBody>
      </Table>
    </StyledDiv>
  );
};

export default ProjectList;
