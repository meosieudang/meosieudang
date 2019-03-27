import React from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";

export const StyledPaper = styled(props => <Paper {...props} />)`
  margin: 0 25vw;
  margin-top: 25vh;
  padding: 2rem;

  @media screen and (max-width: 576px) {
    margin: 10px;
    margin-top: 15vh;
  }
`;
