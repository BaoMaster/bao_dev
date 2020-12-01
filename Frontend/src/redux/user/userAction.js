import axios from 'axios';

import * as authActions from '../../actions/auth';
import notification from '../../helper/Notification';

// import { UserRoles } from 'src/shared/library/helpers/userRoles';

const userGuestActions = {
  getGuestUsers: () => {
    return (dispatch) => {
      return axios.get(`./users/api/getall`);
    };
  },
  verifyAccount: (username) => {
    return (dispatch) => {
      return axios.post(`./api/verify/${username}`);
    };
  },
  checkUserAuth: () => {
    return (dispatch) => {
      dispatch({ type: authActions.CHECK_AUTH_USER });
    };
  },

  userGuestLogout: () => {
    return (dispatch) => {
      dispatch({ type: authActions.USER_LOGOUT });
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

  deleteGuestUser: (userId) => {
    return (dispatch) => {
      return axios.delete(`./users/api/delete/${userId}`);
    };
  },
  loginGuestUser: (user) => {
    return (dispatch) => {
      dispatch({ type: authActions.USER_LOGIN });
      try {
        axios.post('./api/login', user).then((res) => dispatch({ type: authActions.LOGIN_SUCCESS, data: res.data }));
        // notification(res.data.status, res.data.message);
      } catch (err) {
        dispatch({ type: authActions.USER_LOGIN_FAIL, data: err?.response?.data });
      }
    };
  },
  addGuestUser: (user) => {
    return (dispatch) => {
      return axios.post(`./api/register`, user);
    };
  },
  updateGuestUser: (userId, user) => {
    return (dispatch) => {
      return axios.put(`./users/api/update/${userId}`, user);
    };
  },
  getGuestUserById: (userId) => {
    return (dispatch) => {
      return axios.get(`./users/api/getuserbyid/${userId}`);
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

export default userGuestActions;
