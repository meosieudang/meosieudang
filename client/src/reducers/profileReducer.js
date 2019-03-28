import * as types from "../actions/type";

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
    case types.GET_ALL_PROJECT:
      return {
        ...state,
        profiles: {},
        projects: action.payload
      };

    case types.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(item => item._id !== action.idProject),
        search: state.search.filter(item => item._id !== action.idProject)
      };

    case types.GET_PROFILE:
    case types.DELETE_PLATES_SUCCESS:
      return {
        ...state,
        plates: null,
        search: [],
        profiles: action.payload
      };

    case types.UPDATE_LICENSE_PLATES_SUCCESS:
    case types.ADD_NEW_LICENSE_PLATES_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profiles: action.payload
      };

    case types.GET_DETAIL_CAR:
    case types.ADD_NEW_LIST_SEAT:
    case types.ADD_OR_UPDATE_SUCCESS:
    case types.SWAP_SEAT_SUCCESS:
    case types.DELETE_SEAT_SUCCESS:
    case types.DELETE_LIST_SEAT_SUCCESS:
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
        seatUp: seatUp,
        profiles: {}
      };

    case types.ADD_MULTI_USER:
      return {
        ...state,
        msg: action.payload,
        isAuthenticated: true
      };

    case types.ADD_NEW_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        isAuthenticated: true
      };

    case types.CLEAR_ERRORS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        plates: null
      };

    case types.GET_USER:
      return {
        ...state,
        user: action.payload
      };

    case types.GET_PLATES:
      return {
        ...state,
        plates: action.payload
      };

    case types.SEARCH_PROJECT:
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
