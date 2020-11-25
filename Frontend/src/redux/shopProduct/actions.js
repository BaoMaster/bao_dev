import axios from "axios";

// import { UserRoles } from 'src/shared/library/helpers/userRoles';

const shopProductActions = {
  getProduct: () => {
    return (dispatch) => {
      return axios.get(`./shop/api/getproduct`);
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
