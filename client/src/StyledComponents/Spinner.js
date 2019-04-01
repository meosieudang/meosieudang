import React from "react";
import ReactLoading from "react-loading";
import { Typography, LinearProgress, Paper } from "@material-ui/core";

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
  top: 0,
  zIndex: 1301,
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
      <ReactLoading type={"balls"} color={"#1de9b6"} />
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

        <div style={styleContent}>
          <Paper
            style={{
              color: "black",
              padding: "4%",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Typography variant="subtitle2">
              Đang xử lý dữ liệu. Vui lòng chờ...
            </Typography>
            <ReactLoading
              type={"bubbles"}
              color={"#1de9b6"}
              height={"60px"}
              width={"60px"}
            />
          </Paper>
        </div>
      </div>
    </>
  );
};
