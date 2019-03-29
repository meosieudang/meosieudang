import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography, LinearProgress } from "@material-ui/core";

const styles = {
  width: "100%",
  height: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column-reverse"
};

const styleLoading = {
  position: "fixed",
  width: "100%",
  top: 64,
  zIndex: 1,
  height: "100vh",
  background: "rgba(0, 0, 0, 0.5)"
};

const styleContent = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff"
};
export const Spinner = () => {
  return (
    <div style={styles}>
      <CircularProgress />
      <Typography variant="caption" paragraph>
        Vui lòng chờ trong giây lát...
      </Typography>
    </div>
  );
};

export const SpinnerLoading = () => {
  return (
    <>
      <div style={styleLoading}>
        <LinearProgress color="secondary" style={{ height: 6 }} />

        <Typography variant="body2" paragraph style={styleContent}>
          Đang xử lý dữ liệu...
        </Typography>
      </div>
    </>
  );
};
