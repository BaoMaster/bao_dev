/* eslint-disable */
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Popconfirm,
  Upload,
} from "antd";
import React from "react";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { withRouter } from "react-router-dom";

import PrivateRouteUser from "../components/privateRoute/user";
import LocalStorageService from "../config/LocalStorageService";
import RedirectIfUserAuth from "../config/RedireactIfUserAuth";
import notification from "../helper/Notification";
import Logo from "../image/shoplogo.png";
import userActions from "../redux/user/actions";
import userGuestActions from "../redux/user/userAction";
import store from "../store";
import Content from "./Home_components/Content_components/Content";
import Footer from "./Home_components/Footer_components/Footer";
import Header_bottom from "./Home_components/Header_components/Header_bottom";
import Header_middle from "./Home_components/Header_components/Header_middle";
import Header_top from "./Home_components/Header_components/Header_top";
import Slider from "./Home_components/Slider_components/Slider";
import All_product from "./layouts/All_product";
import Cart from "./layouts/Cart";
import Checkout from "./layouts/Checkout";
import Login from "./layouts/Login";
import Not_found from "./layouts/Not_found";
import ProductDetail from "./layouts/ProductDetail";

const { Header, Sider } = Layout;

const { confirm } = Modal;

// import routes from "../routes";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowInfo: false,
      showLogout: false,
      imageUrl: "",
      loading: false,
      address: "",
      avatar: "",
      dayOfBirth: "",
      email: "",
      phoneNumber: "",
      role: "",
      username: "",
      userid: "",
      id: "",
    };
  }
  // useEffect(() => {
  //   props.checkAuth();
  // }, []);

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      // console.log("info:", info.file.response.name);
      return;
    }
    if (info.file.status === "done") {
      console.log("info==:", info.file.response.name);
      this.setState({
        // loading: true,
        avatar: info.file.response.name,
      });
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };
  componentDidMount = async () => {
    await this.props.checkUserAuth();
    if (localStorage.getItem("userauth")) {
      this.setState({
        userid: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
      });
    }
    console.log("iddd:", this.state.userid);
  };

  info = (userId) => {
    this.setState({ ShowInfo: true });
    this.props.getUserById(userId).then((res) => {
      this.setState({
        address: res.data.data.address,
        avatar: res.data.data.avatar,
        dayOfBirth: res.data.data.dayOfBirth,
        email: res.data.data.email,
        phoneNumber: res.data.data.phoneNumber,
        role: res.data.data.role,
        username: res.data.data.username,
      });
    });
    console.log("baoooooo:", this.state.ShowInfo);
  };
  showConfirm() {
    confirm({
      title: "This action will log out of the account",
      icon: <ExclamationCircleOutlined />,
      content: "are you sure ?",
      okText: "Logout",
      onOk() {
        // console.log('OK');
        localStorage.removeItem("userauth");
        notification("success", `Logout Successfully`, "");
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }
  handleCancel = () => {
    this.setState({ ShowInfo: false });
    // console.log('status:', this.state.isShowModal);
  };
  render() {
    // const uploadButton = (
    //   <div>
    //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //     <div style={{ marginTop: 8 }}>Upload</div>
    //   </div>
    // );

    const { loading, imageUrl } = this.state;

    const { isAuthenticated, username } = this.props.auth;
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={() => this.info(this.state.userid)}>
            Account Information
          </a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={""}>Change Password</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() => this.info()}>Settings</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.showConfirm}>Logout</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <React.Fragment>
        <Provider store={store}>
          <Router>
            <div>
              <header id="header">
                <Header_top />
                {/* <Header_middle /> */}
                <Layout>
                  <Header
                    style={{
                      height: "100px",
                      padding: 0,
                      backgroundColor: "white",
                    }}
                  >
                    <Link style={{ marginLeft: "5%", float: "left" }} to={"/"}>
                      <img
                        style={{ height: "150px", marginLeft: "100%" }}
                        src={Logo}
                      />
                    </Link>
                    {/* <Link style={{ fontSize: '15px', marginLeft: '60%' }} to='/checkout'>
                      Checkout
                    </Link> */}
                    <div
                      className="col-sm-3"
                      style={{
                        marginLeft: "25%",
                        marginTop: "50px",
                        lineHeight: "0px",
                      }}
                    >
                      <div
                        className="search_box pull-right"
                        style={{
                          marginTop: "10px",
                          border: "2px solid red",
                          lineHeight: "0px",
                          width: "512px",
                          height: "auto",
                        }}
                      >
                        <input
                          style={{
                            width: "450px",
                            backgroundColor: "white",
                            // border: '2px solid red',
                          }}
                          type="text"
                          placeholder="Search"
                        />
                        <button
                          style={{
                            width: "58px",
                            height: "36px",
                            backgroundColor: "#EE4D2D",
                            color: "white",
                            border: "2px solid white",
                          }}
                        >
                          <SearchOutlined />
                        </button>
                      </div>
                    </div>
                    <div style={{ marginTop: "50px" }}>
                      <Link
                        style={{
                          fontSize: "30px",
                          marginLeft: "1%",
                          color: "#EE4D2D",
                          marginTop: "50px",
                        }}
                        to={"/cart"}
                      >
                        <ShoppingCartOutlined />
                      </Link>
                      {username ? (
                        <Dropdown overlay={menu} placement="bottomCenter" arrow>
                          {/* <Button>bottomCenter</Button> */}
                          <Link
                            style={{
                              marginLeft: "5%",
                              color: "#EE4D2D",
                              fontSize: "20px",
                              marginTop: "50px",
                            }}
                          >
                            Hello {username}
                          </Link>
                        </Dropdown>
                      ) : (
                        // <button type='button'></button>
                        // <div style={{ marginLeft: '2%' }}>
                        // </div>
                        <Link
                          style={{
                            fontSize: "20px",
                            marginLeft: "5%",
                            color: "#EE4D2D",
                            marginTop: "50px",
                          }}
                          to={"/login"}
                        >
                          <UnlockOutlined /> {"Login"}
                        </Link>
                      )}
                    </div>
                  </Header>
                  <div>
                    <Modal
                      className="company-details"
                      title="User Information"
                      visible={this.state.ShowInfo}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                    >
                      <Form>
                        {/* <CreateOrUpdateUser
                  // onRef={ref => (this.child = ref)}
                  ref={this.formRef}
                  userId={this.state.userId?this.state.userId:"999"}
                  handleResponse={this.handleResponseFromChild}
                ></CreateOrUpdateUser> */}

                        {/* <Tabs defaultActiveKey='1' activeKey={this.state.activeTab} onChange={(activeTab) => this.setState({ activeTab })}> */}
                        {/* <TabPane tab="General Info" key="1">
                    <label>
                        Info
                    </label>
                </TabPane> */}
                        {/* <TabPane tab='Add user' key='1'> */}
                        <div>
                          {/* <label>Avatar</label>
                          <Upload
                            name='image'
                            listType='picture-card'
                            className='avatar-uploader'
                            showUploadList={false}
                            action='http://localhost:3030/users/post'
                            headers={{
                              authorization: `Bearer ${LocalStorageService.getAccessToken()}`,
                            }}
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                          >
                            {imageUrl ? <img src={imageUrl} alt='image' style={{ width: '100%' }} /> : uploadButton}
                          </Upload> */}
                          {/* <Input
                        type="file"
                        name="image"
                        beforeUpload={this.beforeUpload}
                      ></Input> */}
                        </div>
                        <div>
                          <label>User Name</label>
                          <Input
                            type="text"
                            name="userName"
                            value={this.state.username}
                            onChange={this.onChange}
                            id="username"
                          ></Input>
                        </div>
                        <div>
                          <label>Email</label>
                          <Input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            id="email"
                          ></Input>
                        </div>
                        <div>
                          <label>Phone Number</label>
                          <Input
                            type="text"
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.onChange}
                            id="phoneNumber"
                          ></Input>
                        </div>
                        <div>
                          <label>Address</label>
                          <Input
                            type="text"
                            name="address"
                            value={this.state.address}
                            onChange={this.onChange}
                            id="address"
                          ></Input>
                        </div>
                        <div>
                          <label>Day of birth</label>
                          <Input
                            type="date"
                            name="dayOfBirth"
                            value={this.state.dayOfBirth}
                            onChange={this.onChange}
                            id="dayOfBirth"
                          ></Input>
                        </div>

                        <div>
                          <label>Role</label>
                          {/* <Select
                        placeholder="Choose user role"
                        style={{ width: "100%" }}
                        onChange={(e) => this.onChange(e)}
                        id="role"
                        name="role"
                        // value={this.state.role}
                      >
                        <Option value="ADMIN">Admin</Option>
                        <Option value="USER">User</Option>
                      </Select> */}
                          <Input
                            type="text"
                            name="role"
                            value={this.state.role}
                            onChange={this.onChange}
                            id="role"
                          ></Input>
                        </div>
                        {/* <div>
                          <label>Password</label>
                          <Input type='password' name='password' value={this.state.password} onChange={this.onChange} id='password'></Input>
                        </div> */}
                        {/* </TabPane>
                        </Tabs> */}
                      </Form>
                    </Modal>
                  </div>
                </Layout>
                <Divider />
                {/* <Header_bottom /> */}
              </header>
              {/* <section id='slider' className='clr-white'>
                <Slider />
              </section> */}
              <section className="clr-white">
                <Switch>
                  <Route path="/" exact component={Content} />
                  <RedirectIfUserAuth exact path="/login">
                    <Login />
                  </RedirectIfUserAuth>
                  <PrivateRouteUser path="/cart" exact component={Cart} />
                  <Route path="/detail/:id" exact component={ProductDetail} />
                  <Route path="/checkout" exact component={Checkout} />
                  <Route path="/bao" component={Not_found} />
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
const mapDispatchToProps = (dispatch) => ({
  // return {
  checkUserAuth: () => dispatch(userGuestActions.checkUserAuth()),
  userGuestLogout: () => dispatch(userGuestActions.userGuestLogout()),
  updateUser: (userId, user) => dispatch(userActions.updateUser(userId, user)),
  getUserById: (userId) => dispatch(userActions.getUserById(userId)),

  // };
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));

// export default Home;
