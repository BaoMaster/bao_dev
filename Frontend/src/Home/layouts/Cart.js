/* eslint-disable */
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import productActions from '../../redux/product/actions';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userid: '', productInCart: [], header: [{ id: '', name: '', price: '' }] };
  }
  componentDidMount = async () => {
    await this.setState({
      userid: localStorage.getItem('userauth').split('id')[1].split(`"`)[2],
    });
    // let userid = localStorage.getItem("userauth").split("id")[1].split(`"`)[2];
    // this.props.getProductFromCart(userid);
    this.getProductFromCart(this.state.userid);
    // console.log("baoooo:", userid);
  };

  getProductFromCart = async (userid) => {
    console.log('id:', userid);
    await axios
      .get('http://localhost:3030/shop/api/getproductfromcart/' + userid)
      .then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          this.setState({
            productInCart: res.data,
          });
          console.log('asdad:', this.state.productInCart);
        }
        // console.log(res.data), console.log('id', res.data.length);
        // for (let index = 0; index < res.data.length; index++) {
        //   this.setState({
        //     product: res.data,
        //     // product: [
        //     //   (id = res.data.index.id),
        //     //   (img = res.data.index.illustration),
        //     //   (name = res.data.index.productname),
        //     //   (price = res.data.index.price),
        //     // ],
        //   });
        // }
        // const { photo } = this.state;
        // photo = this.state.product.map((photo) => {
        //   this.setState({ imagePro: photo.illustration });
        //   const { imagePro } = this.state;
        //   // console.log("asasasa", imagePro);
        // });
        // this.setState({
        //   // product: [
        //   //   (id = res.data.id),
        //   //   (img = res.data.illustration),
        //   //   (name = res.data.productname),
        //   //   (price = res.data.price),
        //   // ],
        // }),
        // let product=this.state.product
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { productInCart } = this.state;
    var result = productInCart.map((productInCart, index) => {
      return (
        <tr key={index}>
          {/* <td className='cart_product'>
            <a href=''>
              <img src='images/cart/one.png' alt='' />
            </a>
          </td> */}
          <td className='cart_description'>
            <h4>
              <a href=''>{productInCart.productid}</a>
            </h4>
          </td>
          <td className='cart_name'>
            <p>{productInCart.products.productname}</p>
          </td>
          <td className='cart_name'>
            {/* <p>{productInCart.products.productname}</p> */}
            <input className='cart_quantity_input' type='text' name='quantity' value={productInCart.products.amount} autocomplete='off' size='2' />
          </td>
          <td className='cart_price'>
            <p>${productInCart.products.price}</p>
          </td>
          <td className='cart_quantity'>
            <div className='cart_quantity_button'>
              {/* <a href=''> + </a> */}
              <button style={{ borderRadius: '100px', backgroundColor: '#ee4d2d' }} type='button'>
                <PlusOutlined />
              </button>
              <input
                style={{ height: '50px', borderRadius: '5px', fontSize: '15px', textAlign: 'center' }}
                type='text'
                name='quantity'
                value={productInCart.products.amount}
                autocomplete='off'
                size='2'
              />
              {/* <a href=''> - </a> */}
              <button type='button'>
                <MinusOutlined />
              </button>
            </div>
          </td>
          <td className='cart_total'>
            <p className='cart_total_price'>{parseInt(productInCart.products.amount) * parseInt(productInCart.products.price)}</p>
          </td>
          <td>
            {/* <a className='cart_quantity_delete' href=''>
              <CloseOutlined />
            </a> */}
            <button className='btn btn-danger' type='button'>
              <CloseOutlined />
            </button>
          </td>
        </tr>
      );
    });
    var renderTableHeader = () => {
      const header = Object.keys(this.state.header);
      return header.map((key, index) => <th key={index}>{key.toUpperCase()}</th>);
    };

    return (
      <div>
        <section id='cart_items'>
          <div className='container'>
            <div className='breadcrumbs'>
              <ol className='breadcrumb'>
                <li>
                  <NavLink to='/'>Home</NavLink>
                </li>
                <li className='active'>Shopping Cart</li>
              </ol>
            </div>
            <div className='table-responsive cart_info'>
              <table className='table table-condensed'>
                <thead>
                  <tr className='cart_menu'>
                    <td className='image'>Item</td>
                    <td className='description'>Product Name</td>
                    <td className='description'>Size</td>
                    <td className='price'>Price</td>
                    <td className='quantity'>Quantity</td>
                    <td className='total'>Total</td>
                    <td className='total'>Action</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr> {renderTableHeader}</tr> */}
                  {result}
                  {/* {result} */}
                  {/* <tr>
                    <td className='cart_product'>
                      <a href=''>
                        <img src='images/cart/one.png' alt='' />
                      </a>
                    </td>
                    <td className='cart_description'>
                      <h4>
                        <a href=''>{result.productid}</a>
                      </h4>
                      <p>Web ID: 1089772</p>
                    </td>
                    <td className='cart_price'>
                      <p>{productInCart.userid}</p>
                    </td>
                    <td className='cart_quantity'>
                      <div className='cart_quantity_button'>
                        <a className='cart_quantity_up' href=''>
                          {' '}
                          +{' '}
                        </a>
                        <input className='cart_quantity_input' type='text' name='quantity' value='1' autocomplete='off' size='2' />
                        <a className='cart_quantity_down' href=''>
                          {' '}
                          -{' '}
                        </a>
                      </div>
                    </td>
                    <td className='cart_total'>
                      <p className='cart_total_price'>$59</p>
                    </td>
                    <td className='cart_delete'>
                      <a className='cart_quantity_delete' href=''>
                        <i className='fa fa-times'></i>
                      </a>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section id='do_action'>
          <div className='container'>
            <div className='heading'>
              <h3>What would you like to do next?</h3>
              <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
            </div>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='chose_area'>
                  <ul className='user_option'>
                    <li>
                      <input type='checkbox' />
                      <label>Use Coupon Code</label>
                    </li>
                    <li>
                      <input type='checkbox' />
                      <label>Use Gift Voucher</label>
                    </li>
                    <li>
                      <input type='checkbox' />
                      <label>Estimate Shipping & Taxes</label>
                    </li>
                  </ul>
                  <ul className='user_info'>
                    <li className='single_field'>
                      <label>Country:</label>
                      <select>
                        <option>United States</option>
                        <option>Bangladesh</option>
                        <option>UK</option>
                        <option>India</option>
                        <option>Pakistan</option>
                        <option>Ucrane</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className='single_field'>
                      <label>Region / State:</label>
                      <select>
                        <option>Select</option>
                        <option>Dhaka</option>
                        <option>London</option>
                        <option>Dillih</option>
                        <option>Lahore</option>
                        <option>Alaska</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className='single_field zip-field'>
                      <label>Zip Code:</label>
                      <input type='text' />
                    </li>
                  </ul>
                  <a className='btn btn-default update' href=''>
                    Get Quotes
                  </a>
                  <a className='btn btn-default check_out' href=''>
                    Continue
                  </a>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='total_area'>
                  <ul>
                    <li>
                      Cart Sub Total <span>$59</span>
                    </li>
                    <li>
                      Eco Tax <span>$2</span>
                    </li>
                    <li>
                      Shipping Cost <span>Free</span>
                    </li>
                    <li>
                      Total <span>$61</span>
                    </li>
                  </ul>
                  <NavLink to='/cartupdate' activeClassName='btn btn-default update'>
                    Update
                  </NavLink>
                  <NavLink to='/checkout' activeClassName='btn btn-default check_out'>
                    Check Out
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // deleteUser: (userId) => dispatch(userActions.deleteUser(userId)),
  // updateUser: (userId, user) => dispatch(userActions.updateUser(userId, user)),
  // getUserById: (userId) => dispatch(userActions.getUserById(userId)),
  // addUser: (user) => dispatch(userActions.addUser(user)),
  // loginUser: (user) => dispatch(userActions.loginUser(user)),
  getProduct: () => dispatch(productActions.getProduct),

  getProductFromCart: () => dispatch(productActions.getProductFromCart),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));

// export default Cart;
