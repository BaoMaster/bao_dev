/* eslint-disable */
import { ShoppingCartOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Divider, Layout } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import PrivateRouteUser from '../components/privateRoute/user';
import RedirectIfUserAuth from '../config/RedireactIfUserAuth';
import userGuestActions from '../redux/user/userAction';
import store from '../store';
import Content from './Home_components/Content_components/Content';
import Footer from './Home_components/Footer_components/Footer';
import Header_bottom from './Home_components/Header_components/Header_bottom';
import Header_middle from './Home_components/Header_components/Header_middle';
import Header_top from './Home_components/Header_components/Header_top';
import Slider from './Home_components/Slider_components/Slider';
import All_product from './layouts/All_product';
import Cart from './layouts/Cart';
import Checkout from './layouts/Checkout';
import Login from './layouts/Login';
import Not_found from './layouts/Not_found';

const { Header, Sider } = Layout;

// import routes from "../routes";
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  // useEffect(() => {
  //   props.checkAuth();
  // }, []);

  componentDidMount() {
    this.props.checkUserAuth();
  }

  render() {
    const { isAuthenticated, username } = this.props.auth;

    return (
      <React.Fragment>
        <Provider store={store}>
          <Router>
            <div>
              <header id='header'>
                <Header_top />
                {/* <Header_middle /> */}
                <Layout>
                  <Header style={{ padding: 0, backgroundColor: 'white' }}>
                    {/* {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      className: 'trigger',
                      onClick: handleToggle,
                      style: {
                        color: '#fff',
                        clear: 'both',
                        float: 'left',
                        marginTop: '23px',
                      },
                    })} */}
                    {/* <p style={{ color: '#fff', marginLeft: '70%' }}>
                      {username ? username : 'You are not login'}
                      {isAuthenticated ? (
                        <Button className='btn-delete' type='danger' onClick={logout}>
                          Logout
                        </Button>
                      ) : (
                        ''
                      )}
                    </p> */}
                    <Link style={{ fontSize: '20px', marginLeft: '20%', float: 'left' }} to={'/'}>
                      Home
                    </Link>
                    {/* <Link style={{ fontSize: '15px', marginLeft: '60%' }} to='/checkout'>
                      Checkout
                    </Link> */}

                    <Link style={{ fontSize: '15px', marginLeft: '50%', color: 'black' }} to={'/cart'}>
                      <ShoppingCartOutlined />
                      Cart
                    </Link>
                    {username ? (
                      <label style={{ marginLeft: '2%' }}>{username}</label>
                    ) : (
                      // <button type='button'></button>
                      // <div style={{ marginLeft: '2%' }}>
                      // </div>
                      <Link style={{ fontSize: '15px', marginLeft: '2%', color: 'black' }} to={'/login'}>
                        <UnlockOutlined /> {username || 'Login'}
                      </Link>
                    )}
                  </Header>
                </Layout>
                <Divider />
                <Header_bottom />
              </header>
              <section id='slider' className='clr-white'>
                <Slider />
              </section>
              <section className='clr-white'>
                <Switch>
                  <Route path='/' exact component={Content} />
                  <RedirectIfUserAuth exact path='/login'>
                    <Login />
                  </RedirectIfUserAuth>
                  <PrivateRouteUser path='/cart' exact component={Cart} />
                  <Route path='/checkout' exact component={Checkout} />
                  <Route component={Not_found} />
                </Switch>
              </section>
              <Footer />
            </div>
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
  // showContentMain = (routes) => {
  //   var result = null;
  //   if(routes){
  //     result = routes.map((route, index) => {
  //       return (
  //         <Route
  //           key={index}
  //           path={route.path}
  //           exact={route.exact}
  //           component={route.main}
  //         />
  //       );
  //     });
  //   }
  //   return result;
  // }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkUserAuth: () => dispatch(userGuestActions.checkUserAuth()),
    userGuestLogout: () => dispatch(userGuestActions.userGuestLogout()),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;
