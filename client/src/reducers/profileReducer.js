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
  search: [],
  searchPhone: [],
  showProject: []
};

const listSeat = (arr, value) =>
  arr.filter(item => item.nameSeat.indexOf(value) !== -1);

const total = arr => {
  const profilePlates = arr.profile.map(item => {
    return item.seat.filter(seat => seat.isBook).length * item.price;
  });
  return profilePlates.reduce((a, b) => a + b, 0);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_PROJECT:
      return {
        ...state,
        projects: action.payload,
        profiles: {},
        search: [],
        isLoading: false
      };

    case types.GET_PROJECTS:
      return {
        ...state,
        showProject: action.data,
        isLoading: false
      };

    case types.SHOW_REVENUE:
      const tempProject = [...state.showProject.docs];
      const value = action.payload;
      const revenue = [];
      for (let i = 0; i < value.length; i++) {
        const find = tempProject.filter(
          item => item.create_date.indexOf(value[i]) !== -1
        );
        const totalMonth = find
          .map(item => {
            return total(item);
          })
          .reduce((a, b) => a + b, 0);
        revenue.push(totalMonth);
      }
      // const datasets = revenue.map(item => item.revenue);
      // const totalYear = revenue
      //   .map(item => item.revenue)
      //   .reduce((a, b) => a + b, 0);

      return {
        ...state,
        revenue: revenue,
        isLoading: false
      };

    case types.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: {
          ...state.projects,
          docs: state.projects.docs.filter(
            item => item._id !== action.idProject
          )
        },
        search: []
      };

    case types.GET_PROFILE:
    case types.DELETE_PLATES_SUCCESS:
      return {
        ...state,
        profiles: action.payload,
        total: total(action.payload),
        detailProfile: {},
        search: [],
        isLoading: false
      };

    case types.UPDATE_LICENSE_PLATES_SUCCESS:
    case types.ADD_NEW_LICENSE_PLATES_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        profiles: action.payload,
        total: total(action.payload)
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
        isLoading: false,
        searchPhone: []
      };

    case types.ADD_MULTI_USER:
      return {
        ...state,
        isLoading: true
      };

    case types.ADD_NEW_PROJECT_SUCCESS:
      return {
        ...state,
        projects: {
          ...state.projects,
          docs: [action.payload, ...state.projects.docs]
        },
        isAuthenticated: true,
        isLoading: false
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
        isLoading: false,
        search: [action.payload]
      };

    case types.SEARCH_PHONE_USER:
      return {
        ...state,
        searchPhone: [
          ...state.detailProfile.seat.filter(
            item => item.phoneUser.indexOf(action.payload) !== -1
          )
        ]
      };
    default:
      return state;
  }
};
