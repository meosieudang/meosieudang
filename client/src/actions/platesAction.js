import axios from "axios";
import {
  GET_DETAIL_CAR,
  ADD_NEW_LIST_SEAT,
  GET_ERRORS,
  DELETE_LIST_SEAT_SUCCESS,
  ADD_OR_UPDATE_SUCCESS,
  SWAP_SEAT_SUCCESS,
  ADD_MULTI_USER,
  CLEAR_ERRORS,
  UPDATE_LICENSE_PLATES_SUCCESS,
  DELETE_PLATES_SUCCESS,
  DELETE_SEAT_SUCCESS,
  GET_USER
} from "./type";

//GET DETAIL CAR
export const getDetailCar = idPlates => dispatch => {
  axios
    .get(`/api/plates/${idPlates}`)
    .then(res =>
      dispatch({
        type: GET_DETAIL_CAR,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

//ADD NEW LIST SEAT
export const addNewListSeat = (id, numberSeat) => dispatch => {
  axios
    .post(`/api/plates/${id}`, numberSeat)
    .then(res =>
      dispatch({
        type: ADD_NEW_LIST_SEAT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//DELETE LIST SEAT
export const deleteListSeat = id => dispatch => {
  axios.put("/api/plates/delete-list-seat", id).then(res =>
    dispatch({
      type: DELETE_LIST_SEAT_SUCCESS,
      payload: res.data
    })
  );
};

// Add/Update user
export const addAndUpdateSeatDown = (id, data) => dispatch => {
  axios
    .put(`/api/plates/${id}`, data)
    .then(res => {
      dispatch({
        type: ADD_OR_UPDATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//SWAP SEAT
export const swapSeat = (seat1, seat2) => dispatch => {
  axios
    .put(`/api/plates/${seat1}/${seat2}`)
    .then(res =>
      dispatch({
        type: SWAP_SEAT_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//ADD MULTI USER
export const addMultiUser = data => dispatch => {
  axios
    .post("/api/plates/update-multi", data)
    .then(res => {
      dispatch({
        type: ADD_MULTI_USER,
        payload: res.data
      });
      dispatch(getDetailCar(data.idPlates));
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//UPDATE LICENSE PLATES
export const updateLicensePlates = (plates, idPlates) => dispatch => {
  axios
    .put(`/api/plates/${idPlates}/update-plates`, plates)
    .then(res => {
      dispatch({
        type: UPDATE_LICENSE_PLATES_SUCCESS,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// DELETE LICENSE PLATES
export const deleteLicensePlates = idPlates => dispatch => {
  axios.delete(`/api/plates/${idPlates}/delete-plates`).then(res => {
    dispatch({
      type: DELETE_PLATES_SUCCESS,
      payload: res.data
    });
    dispatch({ type: CLEAR_ERRORS });
  });
};

// DELETE 1 SEAT
export const deleteSeat = idSeat => dispatch => {
  axios.put(`/api/plates/${idSeat}/delete-seat`).then(res =>
    dispatch({
      type: DELETE_SEAT_SUCCESS,
      payload: res.data
    })
  );
};

// Get seat
export const getUser = user => ({
  type: GET_USER,
  payload: user
});
