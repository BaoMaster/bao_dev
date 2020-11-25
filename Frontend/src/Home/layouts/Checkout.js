/* eslint-disable */
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      productInCart: [],
      header: [{ id: '', name: '', price: '' }],
      total: 0,
      finalTotal: 0,
      discount: 0,
    };
  }
  componentDidMount = async () => {
    if (localStorage.getItem('userauth')) {
      await this.setState({
        userid: localStorage.getItem('userauth').split('id')[1].split(`"`)[2],
      });
      this.getProductFromCart(this.state.userid);
    }
    this.setState({ discount: localStorage.getItem('discount') });
    // let userid = localStorage.getItem("userauth").split("id")[1].split(`"`)[2];
    // this.props.getProductFromCart(userid);
    // console.log("baoooo:", userid);
  };
  getProductFromCart = (userid) => {
    console.log('id:', userid);
    axios
      .get('http://localhost:3030/shop/api/getproductfromcart/' + userid)
      .then(async (res) => {
        this.setState({
          productInCart: res.data,
        });
        var temp = localStorage.getItem('userauth');
        const { productInCart } = this.state;
        var total = 0;
        for (let index = 0; index < productInCart.length; index++) {
          total = total + parseInt(productInCart[index].amount) * parseInt(productInCart[index].products.price);
        }
        await this.setState({ total: total, finalTotal: parseInt(total) + 2 - parseInt(this.state.discount) });

        console.log('baooo:', this.state.total);
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
            {/* <input className='cart_quantity_input' type='text' name='quantity' value={productInCart.amount} autocomplete='off' size='2' /> */}
            <p>{productInCart.amount}</p>
          </td>
          <td className='cart_price'>
            <p>${productInCart.products.price}</p>
          </td>
          <td className='cart_quantity'>
            <div className='cart_quantity_button'>
              {/* <a href=''> + </a> */}
              {/* <button style={{ borderRadius: '100px', backgroundColor: '#ee4d2d' }} type='button'>
                <PlusOutlined />
              </button> */}
              {/* <input
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
              /> */}
              <p>{productInCart.amount}</p>
              {/* <a href=''> - </a> */}
              {/* <button type='button'>
                <MinusOutlined />
              </button> */}
            </div>
          </td>
          <td className='cart_total'>
            <p className='cart_total_price'>{parseInt(productInCart.amount) * parseInt(productInCart.products.price)}$</p>
          </td>
          {/* <td>
    
            <button className='btn btn-danger' type='button' onClick={() => this.handleDelete(productInCart.productid)}>
              <CloseOutlined />
            </button>
          </td> */}
        </tr>
      );
    });
    return (
      <div>
        <section id='cart_items'>
          <div className='container'>
            <div className='breadcrumbs'>
              <ol className='breadcrumb'>
                <li>
                  <NavLink to='/'>Home</NavLink>
                </li>
                <li className='active'>Check out</li>
              </ol>
            </div>

            {/* <div className='step-one'>
              <h2 className='heading'>Step1</h2>
            </div> */}
            {/* <div className='checkout-options'>
              <h3>New User</h3>
              <p>Checkout options</p>
              <ul className='nav'>
                <li>
                  <label>
                    <input type='checkbox' /> Register Account
                  </label>
                </li>
                <li>
                  <label>
                    <input type='checkbox' /> Guest Checkout
                  </label>
                </li>
                <li>
                  <a href=''>
                    <i className='fa fa-times'></i>Cancel
                  </a>
                </li>
              </ul>
            </div> */}

            <div className='register-req'>
              <p>Please check your cart list before making payment</p>
            </div>

            <div className='shopper-informations'>
              <div className='row'>
                {/* <div className='col-sm-3'>
                  <div className='shopper-info'>
                    <p>Shopper Information</p>
                    <form>
                      <input type='text' placeholder='Display Name' />
                      <input type='text' placeholder='User Name' />
                      <input type='password' placeholder='Password' />
                      <input type='password' placeholder='Confirm password' />
                    </form>
                    <a className='btn btn-primary' href=''>
                      Get Quotes
                    </a>
                    <a className='btn btn-primary' href=''>
                      Continue
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
            <div className='review-payment'>
              <h2>Review & Payment</h2>
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
                    {/* <td className='total'>Action</td> */}
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {result}

                  <tr>
                    <td colspan='2'>
                      <div style={{ marginLeft: '50px', marginTop: '20px' }}>
                        <p>Name: {}</p>
                        <p>Phone: {}</p>
                        <p>Address: {}</p>
                        <p>Notes about order: {}</p>
                      </div>
                    </td>
                    <td style={{ borderLeft: '1px solid #bbb', height: '80px', marginTop: '20px' }}></td>
                    <td colspan='2'>
                      <table className='table table-condensed total-result'>
                        <tr>
                          <td>Cart Sub Total</td>
                          <td>${this.state.total}</td>
                        </tr>
                        <tr>
                          <td>Exo Tax</td>
                          <td>$2</td>
                        </tr>
                        <tr>
                          <td>Discount</td>
                          <td>${this.state.discount}</td>
                        </tr>
                        <tr className='shipping-cost'>
                          <td>Shipping Cost</td>
                          <td>Free</td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td>
                            <span>${this.state.finalTotal}</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div className='payment-options'>
              <span>
                <label>
                  <input type='checkbox' /> Direct Bank Transfer
                </label>
              </span>
            </div> */}
          </div>
        </section>
      </div>
    );
  }
}

export default Checkout;
