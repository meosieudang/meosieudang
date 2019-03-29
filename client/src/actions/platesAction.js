import axios from "axios";
import swal from "sweetalert";
import * as types from "./type";

//Modal content
export const modalContent = (title, text) =>
  swal({
    title: title,
    text: text,
    icon: "warning",
    buttons: true,
    dangerMode: true
  });

//OPEN DIALOG
export const openModal = (state, content) => {
  if (!state) return null;
  // swal(content, "", "success");
};

//GET DETAIL CAR
export const getDetailCar = idPlates => dispatch => {
  axios
    .get(`/api/plates/${idPlates}`)
    .then(res =>
      dispatch({
        type: types.GET_DETAIL_CAR,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

//ADD NEW LIST SEAT
export const addNewListSeat = (id, numberSeat) => (dispatch, getState) => {
  dispatch({ type: types.LOADING });
  axios
    .post(`/api/plates/${id}`, numberSeat)
    .then(res => {
      dispatch({
        type: types.ADD_NEW_LIST_SEAT,
        payload: res.data
      });
      openModal(getState().project.isLoading, "Tạo danh ghế thành công!");
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

//DELETE LIST SEAT
export const deleteListSeat = id => (dispatch, getState) => {
  dispatch({ type: types.LOADING });
  axios.put("/api/plates/delete-list-seat", id).then(res => {
    dispatch({
      type: types.DELETE_LIST_SEAT_SUCCESS,
      payload: res.data
    });
    openModal(getState().project.isLoading, "Xóa thành công");
  });
};

// Add/Update user
export const addAndUpdateSeatDown = (id, data) => (dispatch, getState) => {
  dispatch({ type: types.LOADING });
  axios
    .put(`/api/plates/${id}`, data)
    .then(res => {
      dispatch({
        type: types.ADD_OR_UPDATE_SUCCESS,
        payload: res.data
      });
      openModal(getState().project.isLoading, "Cập nhật thành công");
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

//SWAP SEAT
export const swapSeat = (seat1, seat2) => (dispatch, getState) => {
  dispatch({ type: types.LOADING });
  axios
    .put(`/api/plates/${seat1}/${seat2}`)
    .then(res => {
      dispatch({
        type: types.SWAP_SEAT_SUCCESS,
        payload: res.data
      });
      openModal(getState().project.isLoading, "Chuyển thành công");
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

//ADD MULTI USER
export const addMultiUser = data => dispatch => {
  dispatch({ type: types.LOADING });
  axios
    .post("/api/plates/update-multi", data)
    .then(res => {
      dispatch({
        type: types.ADD_MULTI_USER,
        payload: res.data
      });
      dispatch(getDetailCar(data.idPlates));
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

//UPDATE LICENSE PLATES
export const updateLicensePlates = (plates, idPlates) => dispatch => {
  dispatch({ type: types.LOADING });
  axios
    .put(`/api/plates/${idPlates}/update-plates`, plates)
    .then(res => {
      dispatch({
        type: types.UPDATE_LICENSE_PLATES_SUCCESS,
        payload: res.data
      });
      dispatch({ type: types.SHOW_UPDATE });
      dispatch({ type: types.CLEAR_ERRORS });
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

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

// DELETE LICENSE PLATES
export const deleteLicensePlates = idPlates => dispatch => {
  dispatch({ type: types.LOADING });
  axios.delete(`/api/plates/${idPlates}/delete-plates`).then(res => {
    dispatch({
      type: types.DELETE_PLATES_SUCCESS,
      payload: res.data
    });
    dispatch({ type: types.SHOW_DELETE });
    dispatch({ type: types.CLEAR_ERRORS });
  });
};

// DELETE 1 SEAT
export const deleteSeat = idSeat => (dispatch, getState) => {
  dispatch({ type: types.LOADING });
  axios.put(`/api/plates/${idSeat}/delete-seat`).then(res => {
    dispatch({
      type: types.DELETE_SEAT_SUCCESS,
      payload: res.data
    });
    dispatch({ type: types.CLEAR_ERRORS });
    openModal(getState().project.isLoading, "Xóa thành công");
  });
};

// Get seat
export const getUser = user => ({
  type: types.GET_USER,
  payload: user
});
