import React from "react";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

export const StyledTextField = styled(props => (
  <TextField
    fullWidth
    InputLabelProps={{ classes: { root: "root", focused: "focused" } }}
    InputProps={{ classes: { underline: "underline" } }}
    {...props}
  />
))`
  .root.focused {
    color: ${props => (props.bongpro ? "green" : "#6f42c1")};
  }
  .underline:after {
    border-bottom: 2px solid ${props => (props.bongpro ? "green" : "#6f42c1")};
  }
`;
