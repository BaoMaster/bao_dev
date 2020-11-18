import axios from 'axios';

import * as authActions from '../../actions/auth';
import notification from '../../helper/Notification';

// import { UserRoles } from 'src/shared/library/helpers/userRoles';

const userActions = {
  getUsers: () => {
    return (dispatch) => {
      return axios.get(`./users/api/getall`);
    };
  },

  checkAuth: () => {
    return (dispatch) => {
      dispatch({ type: authActions.CHECK_AUTH });
    };
  },

  logout: () => {
    return (dispatch) => {
      dispatch({ type: authActions.LOGOUT });
    };
  },

  // getCompanyById: companyId => {
  //   return dispatch => {
  //     return axios.get(`./api/companies/${companyId}`);
  //   };
  // },

  // getSupportData: () => {
  //   return dispatch => {
  //     return axios.get(`./api/companies/support-data`);
  //   };
  // },

  // getSelections: () => () => axios.get(`./api/companies/selections`),

  deleteUser: (userId) => {
    return (dispatch) => {
      return axios.delete(`./users/api/delete/${userId}`);
    };
  },
  loginUser: (user) => {
    return (dispatch) => {
      dispatch({ type: authActions.LOGIN });
      try {
        axios.post('./api/login', user).then((res) => dispatch({ type: authActions.LOGIN_SUCCESS, data: res.data }));
        notification('success', 'Login Successfully!');
      } catch (err) {
        dispatch({ type: authActions.LOGIN_FAIL, data: err?.response?.data });
      }
    };
  },
  addUser: (user) => {
    return (dispatch) => {
      return axios.post(`./api/register`, user);
    };
  },
  updateUser: (userId, user) => {
    return (dispatch) => {
      return axios.put(`./users/api/update/${userId}`, user);
    };
  },
  getUserById: (userId) => {
    return (dispatch) => {
      return axios.get(`./users/api/getuserbyid/${userId}`);
    };
  },
  loginGuestUser: (user) => {
    return (dispatch) => {
      dispatch({ type: authActions.USER_LOGIN });
      try {
        axios.post('./api/login', user).then((res) => {
          dispatch({ type: authActions.USER_LOGIN_SUCCESS, data: res.data });
          dispatch({ type: authActions.CHECK_AUTH_USER });
        });
        notification('success', 'Login Successfullys!');
      } catch (err) {
        dispatch({ type: authActions.USER_LOGIN_FAIL, data: err?.response?.data });
      }
    };
  },

  // updateCompany: (companyId, company) => {
  //   return dispatch => {
  //     return axios.put(`./api/companies/${companyId}`, company);
  //   };
  // },

  // getCompaniesBaseOnUserRole: currentUserRole => {
  //   return dispatch => {
  //     switch (currentUserRole) {
  //       case UserRoles.CompanyAdmin:
  //       case UserRoles.CompanyOwner:
  //         return axios.get('/api/companies/admin');

  //       case UserRoles.PlexusAdmin:
  //         return axios.get('/api/companies/selections');

  //       default:
  //         return Promise.reject('Cannot get list companies!');
  //     }
  //   };
  // },

  // getCompanySites: companyId => {
  //   return dispatch => {
  //     return axios.get(`/api/sites/company/${companyId}`);
  //   };
  // },
};

export default userActions;
