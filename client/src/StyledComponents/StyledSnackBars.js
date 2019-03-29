import React from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";

const StyledWrap = styled(props => (
  <Snackbar classes={{ root: "root" }} {...props} />
))`
  .root {
    background-color: #4caf50;
  }
`;
const StyledContent = styled(props => (
  <SnackbarContent classes={{ root: "root" }} {...props} />
))``;

const StyledMessage = {
  display: "flex",
  alignItems: "center"
};

const StyledSnackBars = ({ open, handleClose, message }) => {
  return (
    <StyledWrap
      anchorOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <StyledContent
        onClose={handleClose}
        message={
          <span style={StyledMessage}>
            <CheckCircleIcon style={{ marginRight: 10 }} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </StyledWrap>
  );
};

export default StyledSnackBars;
