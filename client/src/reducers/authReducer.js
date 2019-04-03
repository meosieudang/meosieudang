import {
  SET_CURRENT_USER,
  LOG_OUT_USER,
  REGISTER_SUCCESS,
  GET_ALL_USERS,
  DELETE_SUCCESS
} from "../actions/type";
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: {},
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length !== 0,
        user: action.payload,
        isLoading: false
      };
    case LOG_OUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    case REGISTER_SUCCESS:
      return {};

    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
      };
    default:
      return state;
  }
}
