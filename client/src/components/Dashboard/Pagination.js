/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { TableRow } from "@material-ui/core";
import UserItem from "./UserItem";
import styled from "styled-components";

const StyledUL = styled.ul`
  display: flex;
  justify-content: center;
`;
const StyledLI = styled.li`
  margin-right: 5px;
  list-style: none;
  width: 45px;
  height: 45px;
  background: #80cbc4;
  line-height: 45px;
  text-align: center;
`;
const StyleA = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    background: #b2dfdb;
  }
`;

export const PaginationRender = props => {
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.arr.length / props.todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number, index) => {
    return (
      <StyledLI
        style={{
          background: props.currentPage === number ? "#004d40" : "#80cbc4"
        }}
        key={index}
        onClick={props.handleClick}
      >
        <StyleA className="page-link" id={number}>
          {number}
        </StyleA>
      </StyledLI>
    );
  });

  return (
    <>
      <StyledUL>{renderPageNumbers}</StyledUL>
    </>
  );
};

// item render
export const ItemRender = ({ currentPage, todosPerPage, arr }) => {
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = arr.slice(indexOfFirstTodo, indexOfLastTodo);

  return (
    <>
      {currentTodos.map((project, i) => (
        <TableRow key={i} hover selected>
          <UserItem project={project} index={i} />
        </TableRow>
      ))}
    </>
  );
};
