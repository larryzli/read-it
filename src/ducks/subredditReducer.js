import axios from 'axios';

const PULL_HOT = "PULL_HOT";
const PULL_BEST = "PULL_BEST"


//Axios call to pull "hot" posts from Reddit
export function pullHot(after, limit) {
    let url=`/api/hot?`
    
    if(after){
        url += `after=${after}&`
    }
    if(limit){
        url += `limit=${limit}&`
    }

    return {
        type: PULL_HOT,
        payload: axios
            .get(url)
            .then(response => response.data)
            .catch(console.log)
    };
}

//Axios call to pull "best" posts from Reddit
export function pullBest(after, limit){
    let url=`/api/best?`
    
    if(after){
        url += `after=${after}&`
    }
    if(limit){
        url += `limit=${limit}&`
    }
    return {
        type:PULL_BEST,
        payload: axios
            .get(url)
            .then(response => response.data)
            .catch(console.log)
    }
}


const initialState = {
    posts: [],
    after: '',
    isLoading: false,
    didError: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {

        //PULL_HOT axios call is pending
        case `${PULL_HOT}_PENDING`:
            return Object.assign({}, state, { isLoading: true });

        //Adding PULL_HOT response to the posts array on state
        case `${PULL_HOT}_FULFILLED`:
            console.log(action.payload)
            return Object.assign({}, state, {
                isLoading: false,
                posts: action.payload.posts,
                after: action.payload.after
            });
        
        //PULL_HOT axios call failed
        case `${PULL_HOT}_REJECTED`:
            return Object.assign({}, state, {
                isLoading: false,
                didError: true
            });

            
        //PULL_BEST axios call is pending
        case `${PULL_BEST}_PENDING`:
            return Object.assign({}, state, { isLoading: true });

        //Adding PULL_BEST response to the posts array on state
        case `${PULL_BEST}_FULFILLED`:
            console.log(action.payload)
            return Object.assign({}, state, {
                isLoading: false,
                posts: action.payload.posts,
                after: action.payload.after
            });
        
        //PULL_BEST axios call failed
        case `${PULL_BEST}_REJECTED`:
            return Object.assign({}, state, {
                isLoading: false,
                didError: true
            });



        default: return state;
    }
}