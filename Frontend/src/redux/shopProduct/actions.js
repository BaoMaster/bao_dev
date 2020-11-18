import axios from "axios";

// import { UserRoles } from 'src/shared/library/helpers/userRoles';

const shopProductActions = {
  getProduct: () => {
    return (dispatch) => {
      return axios.get(`./shop/api/getproduct`);
    };
  },

  deleteProduct: (productId) => {
    return (dispatch) => {
      return axios.delete(`./products/api/deleteproduct/${productId}`);
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
