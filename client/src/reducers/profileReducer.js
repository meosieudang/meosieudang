import {
  GET_ALL_PROJECT,
  GET_PROFILE,
  ADD_NEW_PROJECT_SUCCESS,
  ADD_NEW_LICENSE_PLATES_SUCCESS,
  GET_DETAIL_CAR,
  ADD_NEW_LIST_SEAT,
  ADD_OR_UPDATE_SUCCESS,
  CLEAR_ERRORS,
  ADD_MULTI_USER,
  SWAP_SEAT_SUCCESS,
  GET_USER,
  GET_PLATES,
  UPDATE_LICENSE_PLATES_SUCCESS,
  DELETE_PLATES_SUCCESS,
  DELETE_SEAT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  SEARCH_PROJECT,
  DELETE_LIST_SEAT_SUCCESS
} from "../actions/type";

const initialState = {
  projects: [],
  profiles: {},
  detailProfile: {},
  isAuthenticated: false,
  seatUp: [],
  seatDown: [],
  user: null,
  plates: null,
  search: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT:
      return {
        ...state,
        projects: action.payload,
        profiles: {}
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        profiles: {},
        projects: state.projects.filter(item => item._id !== action.idProject),
        search: state.search.filter(item => item._id !== action.idProject)
      };

    case GET_PROFILE:
    case UPDATE_LICENSE_PLATES_SUCCESS:
    case ADD_NEW_LICENSE_PLATES_SUCCESS:
    case DELETE_PLATES_SUCCESS:
      return {
        ...state,
        detailProfile: {},
        profiles: action.payload,
        seatUp: [],
        seatDown: [],
        search: []
      };

    case GET_DETAIL_CAR:
    case ADD_NEW_LIST_SEAT:
    case ADD_OR_UPDATE_SUCCESS:
    case SWAP_SEAT_SUCCESS:
    case DELETE_SEAT_SUCCESS:
    case DELETE_LIST_SEAT_SUCCESS:
      const seatDown = action.payload.seat.filter(
        item => item.nameSeat.indexOf("A") !== -1
      );
      const seatUp = action.payload.seat.filter(
        item => item.nameSeat.indexOf("B") !== -1
      );
      return {
        ...state,
        detailProfile: action.payload,
        seatDown: seatDown,
        seatUp: seatUp
      };

    case ADD_MULTI_USER:
      return {
        ...state,
        msg: action.payload
      };

    case ADD_NEW_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        isAuthenticated: true
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        plates: null
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload
      };

    case GET_PLATES:
      return {
        ...state,
        plates: action.payload
      };

    case SEARCH_PROJECT:
      return {
        ...state,
        search: [
          ...state.projects.filter(
            project => project.create_date.indexOf(action.payload) !== -1
          )
        ]
      };
    default:
      return state;
  }
};
