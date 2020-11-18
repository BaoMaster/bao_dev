import axios from "axios";
// import { UserRoles } from 'src/shared/library/helpers/userRoles';

const productActions = {
  getProduct: () => {
    return (dispatch) => {
      return axios.get(`./product/api/getall`);
    };
  },

  deleteProduct: (productId) => {
    return (dispatch) => {
      return axios.delete(`./products/api/deleteproduct/${productId}`);
    };
  },

  addProduct: (product) => {
    return (dispatch) => {
      return axios.post(`./products/api/addproduct`, product);
    };
  },
  updateProduct: (productId, product) => {
    return (dispatch) => {
      return axios.put(`./products/api/update/${productId}`, product);
    };
  },
  getProductById: (productId) => {
    return (dispatch) => {
      return axios.get(`./products/api/getproductbyid/${productId}`);
    };
  },
};

export default productActions;
