import axios from 'axios';

const GET_USER_BY_ID = "GET_USER_BY_ID";


//Retrieving User By ID
export function getUserByID() {
    return {
        type: GET_USER_BY_ID,
        payload: axios
            .get(`/api/users/id`)
            .then(response => response.data)
            .catch(console.log)
    };
}


const initialState = {
    user: {},
    isLoading: false,
    didError: false
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {



        default: return state;
    }
}