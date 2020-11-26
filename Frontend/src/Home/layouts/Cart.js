/* eslint-disable */
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import notification from '../../helper/Notification';
import productActions from '../../redux/product/actions';
import shopProduct from '../../redux/shopProduct/actions';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      productInCart: [],
      header: [{ id: '', name: '', price: '' }],
      total: 0,
      finalTotal: 0,
      discount: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
      checkout: '',
    };
  }
  componentDidMount = async () => {
    if (localStorage.getItem('userauth')) {
      await this.setState({
        userid: localStorage.getItem('userauth').split('id')[1].split(`"`)[2],
      });
      this.getProductFromCart(this.state.userid);
    }
    // let userid = localStorage.getItem("userauth").split("id")[1].split(`"`)[2];
    // this.props.getProductFromCart(userid);
    // console.log("baoooo:", userid);
  };
  onCheckout = () => {
    var obj = {
      userid: this.state.userid,
      email: this.state.email,
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      total: this.state.finalTotal,
      discount: this.state.discount,
      product: this.state.checkout,
      note: this.state.note,
    };
    this.props.addToCheckout(obj).then((res) => {
      console.log('how:', res);
      this.props.history.push('/checkout');
    });
  };
  handleDelete = (productId) => {
    // productId.preventDefault();
    console.log('delete action:', this.state.userid);
    console.log('delete action aa:', productId);
    const { userid } = this.state;
    const obj = {
      userid: userid,
      productid: productId,
    };
    this.props.removeFromCart(obj).then((res) => {
      const { userid } = this.state;
      if (res.data.status === 'success') {
        this.getProductFromCart(userid);
        notification(res.data.status, res.data.message);
      }
    });
  };
  getProductFromCart = (userid) => {
    console.log('id:', userid);
    axios
      .get('http://localhost:3030/shop/api/getproductfromcart/' + userid)
      .then((res) => {
        this.setState({
          productInCart: res.data,
        });
        var temp = localStorage.getItem('userauth');
        const { productInCart } = this.state;
        var total = 0;
        var checkout = [];
        for (let index = 0; index < productInCart.length; index++) {
          checkout = checkout + productInCart[index].productid + '/' + productInCart[index].amount + '***';
          total = total + parseInt(productInCart[index].amount) * parseInt(productInCart[index].products.price);
        }
        this.setState({ total: total, checkout: checkout });
        console.log('baooo:', this.state.total);
        console.log('checkout:', this.state.checkout);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onChangeValue = async (e) => {
    console.log('value change:', e.target.value);
    if (e.target.value == 'discount10') {
      await this.setState({ discount: 10 });
    }
    if (e.target.value == 'discount20') {
      await this.setState({ discount: 20 });
    }
    if (e.target.value == 'discount30') {
      await this.setState({ discount: 30 });
    }
    localStorage.setItem('discount', this.state.discount);
    this.setState({
      finalTotal: parseInt(this.state.total) + 2 - parseInt(this.state.discount),
    });
  };
  render() {
    const { productInCart } = this.state;
    !productInCart ? console.log('true') : console.log('false');
    if (!productInCart.length) {
      var result = <Empty />;
    } else {
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
              <input className='cart_quantity_input' type='text' name='quantity' value={productInCart.amount} autocomplete='off' size='2' />
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
                  style={{
                    height: '50px',
                    borderRadius: '5px',
                    fontSize: '15px',
                    textAlign: 'center',
                  }}
                  type='text'
                  name='quantity'
                  value={productInCart.amount}
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
              <p className='cart_total_price'>{parseInt(productInCart.amount) * parseInt(productInCart.products.price)}$</p>
            </td>
            <td>
              {/* <a className='cart_quantity_delete' href=''>
              <CloseOutlined />
            </a> */}
              <button className='btn btn-danger' type='button' onClick={() => this.handleDelete(productInCart.productid)}>
                <CloseOutlined />
              </button>
            </td>
          </tr>
        );
      });
    }

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
                  <div onChange={this.onChangeValue}>
                    <ul className='user_option'>
                      <li>
                        <input type='radio' name='option' value='discount10' />
                        <label>Use Coupon Code Discount 10%</label>
                      </li>
                      <li>
                        <input type='radio' name='option' value='discount20' />
                        <label>Use Coupon Code Discount 20%</label>
                      </li>
                      <li>
                        <input type='radio' name='option' value='discount30' />
                        <label>Use Coupon Code Discount 30%</label>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <ul className='user_info'>
                      <li style={{ float: 'none' }}>
                        <label>Name: </label>
                        <input onChange={this.onChange} id='name' type='text' placeholder='Customer Name' style={{ width: '400px' }} />
                      </li>

                      <li style={{ float: 'none' }}>
                        <label>Email: </label>

                        <input onChange={this.onChange} id='email' type='text' placeholder='Email*' style={{ width: '400px' }} />
                      </li>
                      <li>
                        <label>Phone: </label>

                        <input onChange={this.onChange} id='phone' type='text' placeholder='Phone *' style={{ width: '400px' }} />
                      </li>
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
                      <li>
                        <label>Address</label>
                        <textarea onChange={this.onChange} id='address' type='text' rows='5' cols='70' placeholder='Address'></textarea>
                      </li>
                    </ul>
                  </div>
                  {/* <div className='col-sm-7'>sads</div> */}
                  {/* <a className="btn btn-default update" href="">
                    Get Quotes
                  </a> */}
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='total_area' style={{ marginBottom: '10px' }}>
                  {/* <div className='col-sm-6'> */}
                  <div className='order-message'>
                    <p style={{ marginLeft: '50px' }}>Shipping Order</p>
                    <textarea
                      onChange={this.onChange}
                      id='note'
                      name='message'
                      placeholder='Notes about your order, Special Notes for Delivery'
                      style={{
                        height: '140px',
                        marginLeft: '35px',
                        width: '90%',
                      }}
                      rows='3'
                    ></textarea>
                    {/* <label>
                        <input type='checkbox' /> Shipping to bill address
                      </label> */}
                    {/* </div> */}
                  </div>
                </div>
                <div className='total_area'>
                  <ul>
                    <li>
                      Cart Sub Total <span>${this.state.total}</span>
                    </li>
                    <li>
                      Eco Tax <span>$2</span>
                    </li>
                    <li>
                      Shipping Cost <span>Free</span>
                    </li>
                    <li>
                      Discount <span>${this.state.discount}</span>
                    </li>
                    <li style={{ fontWeight: 'bold' }}>
                      Total <span>${this.state.finalTotal || parseInt(this.state.total) + 2 - parseInt(this.state.discount)}</span>
                    </li>
                  </ul>
                  {/* <NavLink to='/cartupdate' activeClassName='btn btn-default update'>
                    Update
                  </NavLink>
                  <NavLink to='/checkout' activeClassName='btn btn-default check_out'>
                    Check Out
                  </NavLink> */}
                </div>
              </div>
              <button
                onClick={this.onCheckout}
                className='btn btn-default check_out'
                style={{
                  textAlign: 'center',
                  marginLeft: '520px',
                  marginTop: '25px',
                }}
              >
                Continue Checkout
              </button>
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
  getProduct: () => dispatch(productActions.getProduct),
  removeFromCart: (data) => dispatch(shopProduct.removeFromCart(data)),
  addToCheckout: (data) => dispatch(shopProduct.addToCheckout(data)),

  getProductFromCart: () => dispatch(productActions.getProductFromCart),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
