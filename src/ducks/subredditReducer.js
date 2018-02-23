import axios from "axios";

const PULL_HOT = "PULL_HOT";
const PULL_BEST = "PULL_BEST";
const GET_SIDEBAR_SUBREDDIT = "GET_SIDEBAR_SUBREDDIT";
const GET_SIDEBAR_TRENDING = "GET_SIDEBAR_TRENDING";

//Axios call to pull "hot" posts from Reddit
export function pullHot(after, limit) {
  let url = `/api/hot?`;

  if (after) {
    url += `after=${after}&`;
  }
  if (limit) {
    url += `limit=${limit}&`;
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
export function pullBest(after, limit) {
  let url = `/api/best?`;

  if (after) {
    url += `after=${after}&`;
  }
  if (limit) {
    url += `limit=${limit}&`;
  }
  return {
    type: PULL_BEST,
    payload: axios
      .get(url)
      .then(response => response.data)
      .catch(console.log)
  };
}

export function getSidebarSubreddit(subreddit_name) {
  return {
    type: GET_SIDEBAR_SUBREDDIT,
    payload: axios
      .get(`/api/sidebar/${subreddit_name}`)
      .then(response => response.data.data)
      .catch(console.log)
  };
}

export function getSidebarTrending() {
  return {
    type: GET_SIDEBAR_TRENDING,
    payload: axios
      .get("/api/subreddits/trending")
      .then(response => response.data)
      .catch(console.log)
  };
}

const initialState = {
  posts: [],
  after: "",
  subreddit: {},
  trending: [],
  isLoading: false,
  didError: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    //PULL_HOT axios call is pending
    case `${PULL_HOT}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    //Adding PULL_HOT response to the posts array on state
    case `${PULL_HOT}_FULFILLED`:
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
      console.log(action.payload);
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

    // GET SIDEBAR SUBREDDIT
    case `${GET_SIDEBAR_SUBREDDIT}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_SIDEBAR_SUBREDDIT}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        subreddit: action.payload
      });

    case `${GET_SIDEBAR_SUBREDDIT}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    // GET SIDEBAR TRENDING
    case `${GET_SIDEBAR_TRENDING}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_SIDEBAR_TRENDING}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        trending: action.payload
      });

    case `${GET_SIDEBAR_TRENDING}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      });

    default:
      return state;
  }
}
