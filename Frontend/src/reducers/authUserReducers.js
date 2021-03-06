import * as actions from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  // isUserAuthenticated: false,
  username: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHECK_USER_AUTH: {
      const auth = JSON.parse(localStorage.getItem('userauth'));
      if (auth === null) {
        return 0;
      }
      if (auth.token)
        return {
          ...state,
          isAuthenticated: true,
          username: auth.username,
        };
    }

    case actions.USER_LOGIN: {
      return state;
    }
    case actions.LOGIN: {
      return state;
    }

    // case actions.USER_LOGIN_SUCCESS: {
    //   localStorage.setItem(
    //     'userauth',
    //     JSON.stringify({
    //       token: action.data.access_token,
    //       username: action.data.username,
    //     })
    //   );
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     username: action.data.username,
    //   };
    // }
    // case actions.LOGIN_SUCCESS: {
    //   localStorage.setItem(
    //     'auth',
    //     JSON.stringify({
    //       token: action.data.access_token,
    //       username: action.data.username,
    //     })
    //   );
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     username: action.data.username,
    //   };
    // }

    case actions.USER_LOGIN_FAIL: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case actions.LOGIN_FAIL: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }

    case actions.USER_LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case actions.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
