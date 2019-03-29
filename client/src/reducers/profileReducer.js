import * as types from "../actions/type";

const initialState = {
  projects: [],
  profiles: {},
  detailProfile: {},
  isAuthenticated: false,
  isLoading: false,
  isUpdate: false,
  isDelete: false,
  isAdd: false,
  seatUp: [],
  seatDown: [],
  user: null,
  plates: null,
  search: []
};

const listSeat = (arr, value) =>
  arr.filter(item => item.nameSeat.indexOf(value) !== -1);

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
        detailProfile: {},
        isLoading: false,
        profiles: action.payload
      };

    case types.UPDATE_LICENSE_PLATES_SUCCESS:
    case types.ADD_NEW_LICENSE_PLATES_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        profiles: action.payload
      };

    case types.GET_DETAIL_CAR:
      const seatDown = listSeat(action.payload.seat, "A");
      const seatUp = listSeat(action.payload.seat, "B");
      return {
        ...state,
        detailProfile: action.payload,
        seatDown: seatDown,
        seatUp: seatUp,
        profiles: {},
        isLoading: false,
        isAuthenticated: false
      };

    case types.ADD_NEW_LIST_SEAT:
    case types.ADD_OR_UPDATE_SUCCESS:
    case types.SWAP_SEAT_SUCCESS:
    case types.DELETE_SEAT_SUCCESS:
    case types.DELETE_LIST_SEAT_SUCCESS:
      const seatDown1 = listSeat(action.payload.seat, "A");
      const seatUp1 = listSeat(action.payload.seat, "B");
      return {
        ...state,
        detailProfile: action.payload,
        seatDown: seatDown1,
        seatUp: seatUp1,
        profiles: {},
        isLoading: false
      };

    case types.ADD_MULTI_USER:
      return {
        ...state,
        msg: action.payload,
        isLoading: true
      };

    case types.ADD_NEW_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        isAuthenticated: true
      };

    case types.SHOW_ADD:
    case types.CLOSE_ADD:
      return {
        ...state,
        isAdd: !state.isAdd
      };

    case types.SHOW_UPDATE:
    case types.CLOSE_UPDATE:
      return {
        ...state,
        isUpdate: !state.isUpdate
      };

    case types.SHOW_DELETE:
    case types.CLOSE_DELETE:
      return {
        ...state,
        isDelete: !state.isDelete
      };

    case types.LOADING:
      return {
        ...state,
        isLoading: true
      };

    case types.GET_ERRORS:
      return {
        ...state,
        isLoading: false
      };

    case types.CLEAR_ERRORS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
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
