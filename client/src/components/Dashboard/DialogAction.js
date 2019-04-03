import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Grid,
  Typography
} from "@material-ui/core";
import StyledDatePicker from "../../StyledComponents/StyledDatePicker";
import moment from "moment";

class DialogAction extends Component {
  state = {
    handle: "",
    create_date: new Date()
  };

  handleChangeDate = data => this.setState({ create_date: data });

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate() {
    if (this.props.open) {
      if (this.props.isAuthenticated) {
        this.props.handleClose();
        this.setState({
          handle: "",
          create_date: new Date()
        });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const newProject = {
      handle: this.state.handle,
      create_date: moment(this.state.create_date._d).format("DD/MM/YYYY")
    };
    this.props.addNewProject(newProject);
  };

  render() {
    const { open, handleClose, msgError } = this.props;
    const { handle, create_date } = this.state;
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm Chuyến Xe Mới</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: 15 }}>
            Vui lòng nhập đầy đủ thông tin
          </DialogContentText>
          <Typography
            variant="subtitle1"
            gutterBottom
            align="center"
            color="secondary"
          >
            {msgError.create_date ? msgError.create_date : null}
          </Typography>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item>
              <TextField
                autoFocus
                label="Người Tạo"
                name="handle"
                value={handle}
                onChange={this.handleChange}
                error={msgError.handle ? true : false}
                helperText={msgError.handle ? msgError.handle : null}
              />
            </Grid>
            <Grid item>
              <StyledDatePicker
                onChange={this.handleChangeDate}
                date={create_date}
                label="Date"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <form onSubmit={this.onSubmit}>
            <Button color="primary" type="submit">
              OK
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DialogAction;
