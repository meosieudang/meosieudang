import * as types from "./type";
import callAPI from "../ultils/callAPI";

//get all project
export const getAllProject = (limit, page) => dispatch => {
  callAPI("GET", "profiles", `?limit=${limit}&page=${page}`, null)
    .then(res => {
      dispatch({
        type: types.GET_ALL_PROJECT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({ type: types.GET_ERRORS, payload: err.response.data })
    );
};

//get 1 project
export const getProject = id => dispatch => {
  callAPI("GET", "profiles", id, null)
    .then(res => {
      dispatch({
        type: types.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({ type: types.GET_ERRORS, payload: err.response.data })
    );
};

//add new project
export const addNewProject = data => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("POST", "profiles", "", data)
    .then(res => {
      dispatch({ type: types.ADD_NEW_PROJECT_SUCCESS, payload: res.data });
      dispatch({ type: types.SHOW_ADD });
    })
    .catch(err =>
      dispatch({ type: types.GET_ERRORS, payload: err.response.data })
    );
};

//add new LicensePlates
export const addNewLicensePlates = (data, idLincensePlates) => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("POST", "profiles", idLincensePlates, data)
    .then(res => {
      dispatch({
        type: types.ADD_NEW_LICENSE_PLATES_SUCCESS,
        payload: res.data
      });
      dispatch({ type: types.SHOW_ADD });
      dispatch({ type: types.CLEAR_ERRORS });
    })
    .catch(err =>
      dispatch({ type: types.GET_ERRORS, payload: err.response.data })
    );
};

//DELETE 1 PROJECT
export const deleteProject = idProject => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("DELETE", "profiles", idProject, null).then(res => {
    dispatch({
      type: types.DELETE_PROJECT_SUCCESS,
      payload: res.data,
      idProject
    });
    dispatch({ type: types.SHOW_DELETE });
  });
};

//SEARCH PROJECT
export const searchProject = query => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("GET", "profiles", `search?date=${query}`, null)
    .then(res => {
      dispatch({ type: types.SEARCH_PROJECT, payload: res.data });
      dispatch({ type: types.CLEAR_ERRORS });
    })
    .catch(err =>
      dispatch({ type: types.GET_ERRORS, payload: err.response.data })
    );
};

//SEARCH PHONE USER
export const searchPhoneUser = query => ({
  type: types.SEARCH_PHONE_USER,
  payload: query
});

//REVENUE IN MONTH
export const showProjects = () => dispatch => {
  dispatch({ type: types.LOADING });
  callAPI("GET", "profiles", `?limit=5000`, null)
    .then(res => {
      dispatch({
        type: types.GET_PROJECTS,
        data: res.data
      });
    })
    .catch(err =>
      dispatch({ type: types.GET_ERRORS, payload: err.response.data })
    );
};

export const showRevenue = query => ({
  type: types.SHOW_REVENUE,
  payload: query
});

// Get seat
export const getPlates = plates => ({
  type: types.GET_PLATES,
  payload: plates
});

// Clear errors
export const closeDialog = () => ({
  type: types.CLEAR_ERRORS
});
