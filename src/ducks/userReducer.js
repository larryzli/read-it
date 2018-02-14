import axios from "axios";

const GET_USER_INFO = "GET_USER_INFO";

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

const initialState = {
    user_id: {},
    user: {},
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
                user: action.payload
            });
        //GET_USER_INFO axios call failed
        case `${GET_USER_INFO}_REJECTED`:
            return Object.assign({}, state, {
                isLoading: false,
                didError: true
            });

        //Default to initial state
        default:
            return state;
    }
}
