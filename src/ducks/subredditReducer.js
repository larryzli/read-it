import axios from 'axios';

const PULL_HOT = "PULL_HOT";

export function pullHot() {
    return {
        type: PULL_HOT,
        payload: axios
            .get(`/api/hot`)
            .then(response => response.data)
            .catch(console.log)
    };
}


const initialState = {
    posts: [],
    after: '',
    isLoading: false,
    didError: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case `${PULL_HOT}_PENDING`:
            return Object.assign({}, state, { isLoading: true });

        case `${PULL_HOT}_FULFILLED`:
            console.log(action.payload)
            return Object.assign({}, state, {
                isLoading: false,
                posts: action.payload.posts,
                after: action.payload.after
            });

        case `${PULL_HOT}_REJECTED`:
            return Object.assign({}, state, {
                isLoading: false,
                didError: true
            });



        default: return state;
    }
}