import axios from "axios";

const GET_USER_INFO = "GET_USER_INFO";
const ADD_FILTER = "ADD_FILTER";
const REMOVE_FILTER = "REMOVE_FILTER";

//Axios call to retrive user by their Reddit ID

export function getUserInfo() {
  return {
    type: GET_USER_INFO,
    payload: axios
      .get("/api/user/info")
      .then(response => response.data)
      .catch(console.log)
  };
}

export function addFilter(filter_name) {
  return {
    type: ADD_FILTER,
    payload: axios
      .post("/api/user/filter/add", { filter_name })
      .then(response => response.data)
      .catch(console.log)
  };
}

export function removeFilter(id) {
  return {
    type: REMOVE_FILTER,
    payload: axios
      .post("/api/user/filter/remove", { id })
      .then(response => response.data)
      .catch(console.log)
  };
}

const initialState = {
  user_id: {},
  user: {},
  filter: [],
  isLoading: false,
  didError: false
};

//This is the UserReducer
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    // Send axios call to get user info from server
    case `${GET_USER_INFO}_PENDING`:
      return Object.assign({}, state, {
        isLoading: true
      });
    //Adding GET_USER_INFO payload to the user object on state
    case `${GET_USER_INFO}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload,
        filter: action.payload.filter
      });
    //GET_USER_INFO axios call failed
    case `${GET_USER_INFO}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // ADDS A FILTER NAME
    case `${ADD_FILTER}_PENDING`:
      return Object.assign({}, state, {
        isLoading: true
      });

    case `${ADD_FILTER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        filter: action.payload
      });

    case `${ADD_FILTER}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // REMOVES A FILTER NAME
    case `${REMOVE_FILTER}_PENDING`:
      return Object.assign({}, state, {
        isLoading: true
      });

    case `${REMOVE_FILTER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        filter: action.payload
      });

    case `${REMOVE_FILTER}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    //Default to initial state
    default:
      return state;
  }
}
