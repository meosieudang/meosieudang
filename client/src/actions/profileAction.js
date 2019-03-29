import axios from "axios";
import {
  ADD_NEW_PROJECT_SUCCESS,
  GET_ERRORS,
  GET_ALL_PROJECT,
  GET_PROFILE,
  CLEAR_ERRORS,
  ADD_NEW_LICENSE_PLATES_SUCCESS,
  GET_PLATES,
  DELETE_PROJECT_SUCCESS,
  SEARCH_PROJECT,
  LOADING,
  SHOW_ADD
} from "./type";

//get all project
export const getAllProject = () => dispatch => {
  axios
    .get("/api/profiles/")
    .then(res =>
      dispatch({
        type: GET_ALL_PROJECT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

//get 1 project
export const getProject = id => dispatch => {
  axios
    .get(`/api/profiles/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
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

//add new project
export const addNewProject = data => dispatch => {
  axios
    .post("/api/profiles", data)
    .then(res => {
      dispatch({
        type: ADD_NEW_PROJECT_SUCCESS,
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

//add new LicensePlates
export const addNewLicensePlates = (data, idLincensePlates) => dispatch => {
  dispatch({ type: LOADING });
  axios
    .post(`/api/profiles/${idLincensePlates}`, data)
    .then(res => {
      dispatch({
        type: ADD_NEW_LICENSE_PLATES_SUCCESS,
        payload: res.data
      });
      dispatch({ type: SHOW_ADD });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//DELETE 1 PROJECT
export const deleteProject = idProject => dispatch => {
  axios.delete(`/api/profiles/${idProject}`).then(res =>
    dispatch({
      type: DELETE_PROJECT_SUCCESS,
      payload: res.data,
      idProject
    })
  );
};

//SEARCH PROJECT
export const searchProject = query => ({
  type: SEARCH_PROJECT,
  payload: query
});

// Get seat
export const getPlates = plates => ({
  type: GET_PLATES,
  payload: plates
});

// Clear errors
export const closeDialog = () => ({
  type: CLEAR_ERRORS
});
