import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as authActions from "../actions/auth";
import SideNav from "../components/layouts/sidebar";
import Form from "../components/pages/form";
import Login from "../components/pages/login.admin";
import ProductList from "../components/pages/productList";
import Register from "../components/pages/register.admin";
import UserList from "../components/pages/userList";
import PrivateRoute from "../components/privateRoute";
import Home from "../Home/Home";
import Footer from "../Home/Home_components/Footer_components/Footer";
import Header_bottom from "../Home/Home_components/Header_components/Header_bottom";
import Header_middle from "../Home/Home_components/Header_components/Header_middle";
import Header_top from "../Home/Home_components/Header_components/Header_top";
import Slider from "../Home/Home_components/Slider_components/Slider";
import Cart from "../Home/layouts/Cart";
import Not_found from "../Home/layouts/Not_found";
import user from "../image/no-avatar.png";
import userActions from "../redux/user/actions";
import RedirectIfUserAuth from "./RedireactIfUserAuth";
import RedirectIfAuth from "./RedirectIfAuth";

// import List from "../components/pages/list";
// import File from "../components/pages/files";
// import Videos from "../components/pages/videos";
const { Header, Sider, Content } = Layout;

const ApplicationRoutes = (props) => {
  const { isAuthenticated, username } = props.auth;
  const [collapse, setCollapse] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
    dispatch({ type: authActions.CHECK_AUTH });
  }, []);

  const handleToggle = (event) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("userauth");
    // localStorage.setItem(
    //   'auth',
    //   JSON.stringify({
    //     token: '',
    //     username: '',
    //   })
    // );
    props.logout();
  };

  return (
    <React.Fragment>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/:brand" component={Home} />
        {/* <RedirectIfUserAuth exact path={'/login'} component={Home} /> */}
        <RedirectIfUserAuth exact path="/shop/login" component={Home}>
          <Login />
        </RedirectIfUserAuth>
        <Route exact path="/detail/:id" component={Home} />
        <Route exact path="/verify/:id" component={Home} />
        <Route exact path="/search/:keyword" component={Home} />
        <Route path="/shop/checkout" exact component={Home} />
        <Route path="/shop/cart" component={Home} />
        {/* <Route component={Not_found} /> */}

        <Route
          path={"/admin"}
          render={() => (
            <Layout>
              <Sider trigger={null} collapsible collapsed={collapse}>
                <SideNav />
              </Sider>
              <Layout>
                <Header
                  className="siteLayoutBackground"
                  style={{ padding: 0, background: "#001529" }}
                >
                  {React.createElement(
                    collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: "trigger",
                      onClick: handleToggle,
                      style: {
                        color: "#fff",
                        clear: "both",
                        float: "left",
                        marginTop: "23px",
                      },
                    }
                  )}
                  <p style={{ color: "#fff", marginLeft: "70%" }}>
                    {/* {username ? username : 'You are not login'} */}
                    {isAuthenticated ? (
                      // <Button className='btn-delete' type='danger' onClick={logout}>
                      //   Logout
                      // </Button>
                      <img
                        style={{ width: "50px", marginLeft: "200px" }}
                        src={user}
                      ></img>
                    ) : (
                      "You are not login"
                    )}
                  </p>
                </Header>
                <Content
                  style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: "calc(100vh - 114px)",
                    background: "#fff",
                  }}
                >
                  <Switch>
                    <RedirectIfAuth exact path="/admin/login">
                      <Login />
                    </RedirectIfAuth>
                    <PrivateRoute
                      exact
                      path="/admin/userlist"
                      component={UserList}
                    />
                    <PrivateRoute
                      path="/admin/productlist"
                      component={ProductList}
                    />
                    <Route path="/admin/register" component={Register} />

                    {/* <Route path="/list" component={List} /> */}
                    <Route path="/form" component={Form} />
                    {/* <Route path="/files" component={File} /> */}

                    {/* <Route path="/cart" component={Cart} /> */}

                    {/* <Route path="/videos" component={Videos} /> */}

                    {/* <PrivateRoute path='/sss'></PrivateRoute> */}
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          )}
        />
        {/* <Route component={Home} /> */}
      </Router>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(userActions.checkAuth()),
    logout: () => dispatch(userActions.logout()),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRoutes);
