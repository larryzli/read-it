import axios from 'axios';

const GET_USER_BY_ID = "GET_USER_BY_ID";
const CREATE_USER_BY_ID = "CREATE_USER_BY_ID"


//Axios call to retrive user by their Reddit ID
export function getUserById(user_id) {
    return {
        type: GET_USER_BY_ID,
        payload: axios
            .get(`/api/users/${user_id}`)
            .then(response => response.data)
            .catch(console.log)
    };
}

//Axios call to create user on the db by user's Reddit id
export function createUserById(user_id) {
    return {
        type: CREATE_USER_BY_ID,
        payload: axios
        .get(`/api/users/create/${user_id}`)
        .then( response => response.data )
        .catch( console.log)
    }
}


const initialState = {
    user_id: {},
    isLoading: false,
    didError: false
};

//This is the UserReducer
export default function userReducer(state = initialState, action) {
    switch (action.type) {

        //GET_USER axios call is pending
        case `${GET_USER_BY_ID}_PENDING`:
            return Object.assign({}, state, {
                 isLoading: true
                 });
        //Adding GET_USER payload to the user_id object on state
        case `${GET_USER_BY_ID}_FULFILLED`:
            return Object.assign({}, state, {
                isLoading: false,
                user_id: action.payload
            });
        //GET_USER axios call failed
        case `${GET_USER_BY_ID}_REJECTED`:
            return Object.assign({}, state, {
                isLoading: false,
                didError: true
            });



        //CREATE_USER call is pending
        case `${CREATE_USER_BY_ID}_PENDING`:
            return Object.assign({}, state, {
                isLoading: true
            });
            //Adding User_id to the user_id object 
        case `${CREATE_USER_BY_ID}_FULFILLED`:
            return Object.assign({}, state, {
            isLoading: false,
            user_id: action.payload
        });
        //CREATE_USER call failed
        case `${CREATE_USER_BY_ID}_REJECTED`:
            return Object.assign({}, state, {
                isLoading: false,
                didError: true
            });

        //Default to initial state
        default: return state;
    }
}