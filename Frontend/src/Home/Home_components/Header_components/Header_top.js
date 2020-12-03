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
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import notification from "../../../helper/Notification";
import userLogo from "../../../image/no-avatar.png";
import userActions from "../../../redux/user/actions";
import userGuestActions from "../../../redux/user/userAction";

const { confirm } = Modal;

class Header_top extends React.Component {
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
  render() {
    const { username } = this.props.auth;
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
      <div
        className="header_top"
        style={{ backgroundColor: "#ee4d2d", color: "white" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="contactinfo">
                <ul className="nav nav-pills" style={{ width: "1000px" }}>
                  <li>
                    <a style={{ color: "white", marginTop: "8px" }}>
                      <i className="fa fa-phone"></i> +84 942 099 721
                    </a>
                  </li>
                  <li>
                    <a style={{ color: "white", marginTop: "8px" }}>
                      <i className="fa fa-envelope"></i>{" "}
                      info@sneakershop@gmail.com
                    </a>
                  </li>
                  <li>
                    <div style={{ width: "200px", marginLeft: "465px" }}>
                      <Link
                        style={{
                          fontSize: "30px",
                          marginLeft: "1%",
                          color: "#EE4D2D",
                          marginTop: "50px",
                        }}
                        to={"/shop/cart"}
                      >
                        <ShoppingCartOutlined />
                      </Link>
                      {username ? (
                        <Dropdown overlay={menu} placement="bottomCenter" arrow>
                          {/* <Button>bottomCenter</Button> */}
                          {/* <Link
                            style={{
                              marginLeft: '5%',
                              color: 'white',
                              fontSize: '20px',
                              marginTop: '50px',
                              width: 'auto',
                            }}
                          >
                            Hello {username}
                          </Link> */}
                          <img
                            style={{ width: "45px", marginBottom: "5px" }}
                            src={userLogo}
                          ></img>
                        </Dropdown>
                      ) : (
                        // <button type='button'></button>
                        // <div style={{ marginLeft: '2%' }}>
                        // </div>
                        <Link
                          style={{
                            fontSize: "20px",
                            marginLeft: "5%",
                            color: "white",
                            marginTop: "50px",
                          }}
                          to={"/shop/login"}
                        >
                          <UnlockOutlined /> {"Login"}
                        </Link>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header_top));

// export default Header_top;
