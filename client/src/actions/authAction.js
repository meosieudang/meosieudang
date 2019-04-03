import axios from "axios";
import setAuthToken from "../ultils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  SET_CURRENT_USER,
  GET_ERRORS,
  LOG_OUT_USER,
  CLEAR_ERRORS,
  REGISTER_SUCCESS,
  GET_ALL_USERS,
  DELETE_SUCCESS,
  LOADING
} from "../actions/type";

//register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login user
export const loginUser = (data, history) => dispatch => {
  dispatch({type: LOADING})
  axios
    .post("/api/users/login", data)
    .then(res => {
      const { token } = res.data;
      //set token to ls
      localStorage.setItem("jwtToken", token);

      //set token to auth header
      setAuthToken(token);

      //decode to get users
      const decoded = jwt_decode(token);

      //set current user
      dispatch(setCurrentUser(decoded));
      dispatch(clearErrors());
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decode => {
  return {
    type: SET_CURRENT_USER,
    payload: decode
  };
};

//log out user
export const logOutUser = () => {
  //remove token ls
  localStorage.removeItem("jwtToken");
  //remove auth header
  setAuthToken(false);
  return {
    type: LOG_OUT_USER
  };
};

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

//get all users
export const getAllUsers = () => dispatch => {
  axios
    .get("/api/users")
    .then(res =>
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      })
    )
    .catch();
};

//Delete user
export const deleteUser = id => dispatch => {
  axios
    .delete(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_SUCCESS,
        payload: id
      })
    )
    .catch();
};
