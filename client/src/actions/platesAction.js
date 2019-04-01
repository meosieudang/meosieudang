import swal from "sweetalert";
import * as types from "./type";
import callAPI from "../ultils/callAPI";

//Modal content
export const modalContent = (title, text) =>
  swal({
    title: title,
    text: text,
    icon: "warning",
    buttons: true,
    dangerMode: true
  });

//GET DETAIL CAR
export const getDetailCar = idPlates => dispatch => {
  callAPI("GET", "plates", idPlates, null, dispatch).then(res => {
    dispatch({
      type: types.GET_DETAIL_CAR,
      payload: res.data
    });
    dispatch({ type: types.CLEAR_ERRORS });
  });
};

//ADD NEW LIST SEAT
export const addNewListSeat = (id, numberSeat) => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("POST", "plates", id, numberSeat, dispatch)
    .then(res => {
      dispatch({
        type: types.ADD_NEW_LIST_SEAT,
        payload: res.data
      });
      dispatch({ type: types.SHOW_ADD });
    })
    .catch(err =>
      dispatch({ type: types.GET_ERRORS, payload: err.response.data })
    );
};

//DELETE LIST SEAT
export const deleteListSeat = id => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("PUT", "plates", "delete-list-seat", id, dispatch).then(res => {
    dispatch({
      type: types.DELETE_LIST_SEAT_SUCCESS,
      payload: res.data
    });
    dispatch({ type: types.SHOW_DELETE });
  });
};

// Add/Update user
export const addAndUpdateSeatDown = (id, data) => (dispatch, getState) => {
  dispatch({ type: types.LOADING });
  callAPI("PUT", "plates", id, data, dispatch).then(res => {
    dispatch({
      type: types.ADD_OR_UPDATE_SUCCESS,
      payload: res.data
    });
    dispatch({ type: types.SHOW_UPDATE });
  });
};

//SWAP SEAT
export const swapSeat = (seat1, seat2) => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("PUT", "plates", `${seat1}/${seat2}`, null, dispatch).then(res => {
    dispatch({
      type: types.SWAP_SEAT_SUCCESS,
      payload: res.data
    });
    dispatch({ type: types.SHOW_UPDATE });
  });
};

//ADD MULTI USER
export const addMultiUser = data => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("POST", "plates", "update-multi", data, dispatch).then(res => {
    dispatch({
      type: types.ADD_MULTI_USER,
      payload: res.data
    });
    dispatch(getDetailCar(data.idPlates));
  });
};

//UPDATE LICENSE PLATES
export const updateLicensePlates = (plates, idPlates) => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("PUT", "plates", `${idPlates}/update-plates`, plates, dispatch).then(
    res => {
      dispatch({
        type: types.UPDATE_LICENSE_PLATES_SUCCESS,
        payload: res.data
      });
      dispatch({ type: types.SHOW_UPDATE });
      dispatch({ type: types.CLEAR_ERRORS });
    }
  );
};

// DELETE LICENSE PLATES
export const deleteLicensePlates = idPlates => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("DELETE", "plates", `${idPlates}/delete-plates`, null, dispatch).then(
    res => {
      dispatch({
        type: types.DELETE_PLATES_SUCCESS,
        payload: res.data
      });
      dispatch({ type: types.SHOW_DELETE });
      dispatch({ type: types.CLEAR_ERRORS });
    }
  );
};

// DELETE 1 SEAT
export const deleteSeat = idSeat => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("PUT", "plates", `${idSeat}/delete-seat`, null, dispatch).then(
    res => {
      dispatch({
        type: types.DELETE_SEAT_SUCCESS,
        payload: res.data
      });
      dispatch({ type: types.SHOW_DELETE });
    }
  );
};

// Get seat
export const getUser = user => ({
  type: types.GET_USER,
  payload: user
});

//CLOSE ADD
export const closeAdd = () => ({
  type: types.CLOSE_ADD
});
//CLOSE UPDATE
export const closeUpdate = () => ({
  type: types.CLOSE_UPDATE
});
//CLOSE DELETE
export const closeDelete = () => ({
  type: types.CLOSE_DELETE
});
