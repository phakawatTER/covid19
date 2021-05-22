import { DEFAULT_COMMUNITY_VALUE } from "config/constant";
import * as reducerAction from "./action";
import moment from "moment";

export const FIRST_GATHER_DATA_DATE = moment("2021-04-30");

export const INITITAL_STATE = {
  selectedCommunity: DEFAULT_COMMUNITY_VALUE,
  communityFeatures: {},
  dataLoading: false,
  dateInterval: [FIRST_GATHER_DATA_DATE, moment()],
};

export const ACTIONS = {
  FETCH_COMMUNITIES: "FETCH_COMMUNITIES",
  SET_COMMUNITIES: "SET_COMMUNITIES",
  SET_SELECTED_COMMUNITY: "SET_SELECTED_COMMUNITY",
  SET_DATE_INTERVAL: "SET_DATE_INTERVAL",
  SET_DATA_LOADING: "SET_DATA_LOADING",
};

export const reducer = (state, { payload, type, dispatch }) => {
  switch (type) {
    case ACTIONS.FETCH_COMMUNITIES:
      const __payload = {
        id: 0,
        type: 0,
        sdate: state.dateInterval[0],
        edate: state.dateInterval[1],
      };
      reducerAction.fetchCommunities(state, dispatch, __payload);
      return { ...state, dataLoading: true };
    case ACTIONS.SET_COMMUNITIES:
      return { ...state, communityFeatures: payload };
    case ACTIONS.SET_SELECTED_COMMUNITY:
      return { ...state, selectedCommunity: payload };
    case ACTIONS.SET_DATE_INTERVAL:
      return { ...state, dateInterval: payload };
    case ACTIONS.SET_DATA_LOADING:
      return { ...state, dataLoading: payload };
    default:
      return state;
  }
};
