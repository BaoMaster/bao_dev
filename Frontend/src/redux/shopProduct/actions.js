import axios from 'axios';

// import { UserRoles } from 'src/shared/library/helpers/userRoles';

const shopProductActions = {
  getProduct: () => {
    return (dispatch) => {
      return axios.get(`./shop/api/getproduct`);
    };
  },
  sendMail: (data) => {
    return (dispatch) => {
      return axios.post(`./shop/send`, data);
    };
  },
  addOneInCart: (data) => {
    return (dispatch) => {
      return axios.post(`./shop/api/addoneincart`, data);
    };
  },
  subOneInCart: (data) => {
    return (dispatch) => {
      return axios.post(`./shop/api/suboneincart`, data);
    };
  },
  addToHistory: (data) => {
    return (dispatch) => {
      return axios.post(`./shop/api/addtohistory`, data);
    };
  },
  deleteCartByUserid: (data) => {
    return (dispatch) => {
      return axios.delete(`./shop/api/deletecartbyuserid`, { params: data });
    };
  },
  deleteCheckoutByUserid: (data) => {
    return (dispatch) => {
      return axios.delete(`./shop/api/deletecheckoutbyuserid`, { params: data });
    };
  },
  createPdf: (data) => {
    return (dispatch) => {
      return axios.post(`./shop/pdf`, data);
    };
  },

  removeFromCart: (data) => {
    return (dispatch) => {
      return axios.delete(`./shop/api/removefromcart`, { params: data });
    };
  },
  getInfoFromCheckout: (userid) => {
    return (dispatch) => {
      return axios.get(`./shop/api/getinfofromcheckout/${userid}`);
    };
  },
  deleteProduct: (productId) => {
    return (dispatch) => {
      return axios.delete(`./products/api/deleteproduct/${productId}`);
    };
  },
  addToCheckout: (product) => {
    return (dispatch) => {
      return axios.post(`./shop/api/addtocheckout`, product);
    };
  },
  addProductToCart: (product) => {
    return (dispatch) => {
      return axios.post(`./shop/api/addproducttocart`, product);
    };
  },
  updateProduct: (productId, product) => {
    return (dispatch) => {
      return axios.put(`./products/api/update/${productId}`, product);
    };
  },
  getProductById: (productId) => {
    return (dispatch) => {
      return axios.get(`./shop/api/getproductbyid/${productId}`);
    };
  },
};

export default shopProductActions;
