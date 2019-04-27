import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Grid
} from "@material-ui/core";
import NumberFormat from "react-number-format";

class DialogSeat extends Component {
  state = {
    idSeat: "",
    nameSeat: "",
    nameUser: "",
    phoneUser: "",
    isBook: false,
    errors: null
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (nextProps && nextProps.user) {
      this.setState({
        idSeat: user._id,
        nameSeat: user.nameSeat,
        nameUser: user.nameUser,
        phoneUser: user.phoneUser,
        isBook: user.isBook
      });
    } else {
      this.setState({
        idSeat: "",
        nameSeat: "",
        nameUser: "",
        phoneUser: "",
        isBook: false,
        errors: null
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { msgError } = this.props;
    if (msgError !== prevProps.msgError) {
      if (msgError) {
        this.setState({ errors: msgError });
      } else {
        this.setState({ errors: null });
      }
    }

    if (this.props.open) {
      if (this.props.isAuthenticated) {
        this.props.handleClose();
        this.setState({
          nameSeat: "",
          nameUser: "",
          phoneUser: "",
          errors: null
        });
      }
    }
  }

  // confirmAction = (idSeat, data) => {
  //   this.props.addAndUpdateSeatDown(idSeat, data);
  // };

  onKeyUp = e => {
    if (e.keyCode === 13) {
      return this.handleSubmit();
    }
  };

  handleSubmit = e => {
    // e.preventDefault();
    const newUser = {
      nameSeat: this.state.nameSeat,
      nameUser: this.state.nameUser,
      phoneUser: this.state.phoneUser
    };

    this.props.addAndUpdateSeatDown(this.state.idSeat, newUser);

    this.props.handleClose();
  };

  render() {
    const { open, handleClose, user } = this.props;
    const { nameSeat, nameUser, phoneUser } = this.state;
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle align="center">
          {user && user.nameUser ? "Sửa Thông Tin" : "Thêm Mới"}
        </DialogTitle>
        <DialogContent align="center">
          <DialogContentText style={{ marginBottom: 15 }}>
            Vui lòng nhập đầy đủ thông tin
          </DialogContentText>

          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item xs={12} md={12}>
              <TextField
                label="Tên ghế"
                fullWidth
                name="nameSeat"
                value={nameSeat}
                onChange={this.handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                autoFocus
                label="Tên khách"
                name="nameUser"
                value={nameUser}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <NumberFormat
                onKeyUp={this.onKeyUp}
                customInput={TextField}
                fullWidth
                label="Số điện thoại"
                onChange={this.handleChange}
                name="phoneUser"
                value={phoneUser}
                format="#### ### ###"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleSubmit}>
            {user && user.nameUser ? "Sửa dữ liệu" : "OK"}
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DialogSeat;
