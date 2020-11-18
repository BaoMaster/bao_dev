import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Select,
  Table,
  Tabs,
  Upload,
} from "antd";
import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LocalStorageService from "../../config/LocalStorageService";

import notification from "../../helper/Notification";
import userActions from "../../redux/user/actions";

// import CreateOrUpdateUser from "./CreateOrUpdateCompany.js";
// import TableRow from "./TableRow";
const { confirm } = Modal;
const { Option } = Select;

const { TabPane } = Tabs;
const menu = (
  <Menu>
    <Menu.Item value="ADMIN">Admin</Menu.Item>
    <Menu.Item value="USER">User</Menu.Item>
  </Menu>
);
class UserList extends Component {
  //   tabRow() {
  //     return this.state.persons.map((object, i) => {
  //       return <TableRow obj={object} key={i} />;
  //     });

  // return this.state.persons.map(function (object, i) {
  //   return <TableRow obj={object} key={i} />;
  // });
  //   }

  columns = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Avatar",
      key: "avatar",
      dataIndex: "avatar",
    },
    // {
    //   title:'IsVerify',
    //   dataIndex: 'idverify'
    // },
    {
      title: "Action",
      key: "action",
      render: (com) => {
        return (
          // <Space size="middle">
          <div>
            <Button
              className="btn-delete"
              type="danger"
              onClick={() => this.handleToggleDeletedModal(true, com.id)}
            >
              Delete
            </Button>

            <Button
              className="btn-update"
              type="primary"
              onClick={() => this.handleUpdate(com.id)}
            >
              Update
            </Button>
          </div>
          //   </Space>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      isShowModal: false,
      userId: null,
      users: [],
      usersInTable: [],
      idverify: [],
      totalItem: 0,
      visibleDelete: false,
      userIdDelete: null,
      searchInput: "",
      username: "",
      email: "",
      password: "",
      avatar: undefined,
      phoneNumber: "",
      address: "",
      dayOfBirth: "",
      errors: {},
      loading: false,
      imageUrl: "",
      role: "",
    };
  }
  componentDidMount() {
    this.getUser();
  }
  handleToggleDeletedModal = (isShow, id = 0) => {
    this.setState({
      ...this.state,
      userIdDelete: id,
      visibleDelete: isShow,
    });
  };
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
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

  getUser = async () => {
    // if (this.props.isAuthenticated) {
    //   this.props.history.push("/");
    // } else {
    await axios
      .get("http://localhost:3030/users/api/getall")
      .then((response) => {
        console.log(response.data);
        this.setState({
          users: response.data,
          usersInTable: response.data,
          idverify: response.data.idverify,
        });
        const { users } = this.state;
        console.log("bao", users);
      })
      .catch(function (error) {
        console.log(error);
      });
    // }
  };

  // setInterval(this.getUser(), 5000);

  handleUpdate = (userId) => {
    this.setState({ isShowModal: true, userId: userId });
    this.props.getUserById(userId).then((res) => {
      console.log("daat:", res);
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
  };

  handleModal = () => {
    this.setState({ isShowModal: true });
    this.cleanData();
  };

  handleDelete = (userId) => {
    this.props.deleteUser(userId).then((res) => {
      console.log("status:", res.data.status);
      if (res.data.status === "success") {
        console.log("okkkk");
        this.getUser();
        this.handleToggleDeletedModal(false, 0);
        notification("success", `Delete Company Successfully`, "");
      }
    });
  };

  handleOk = async () => {
    if (this.state.userId) {
      console.log("update");
      const obj = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        avatar: this.state.avatar,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        dayOfBirth: this.state.dayOfBirth,
      };
      await this.props.updateUser(this.state.userId, obj).then((res) => {
        if (res.data.status === "success") {
          this.getUser();
          this.setState({ isShowModal: false });
          notification("success", `Update User Successfully`, "");
        }
      });
    } else {
      console.log("submit");
      const obj = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        avatar: this.state.avatar,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        dayOfBirth: this.state.dayOfBirth,
      };
      await this.props.addUser(obj).then((res) => {
        if (res.data.status === "success") {
          console.log("okkkk add");
          this.getUser();
          this.handleToggleDeletedModal(false, 0);
          notification("success", `Add User Successfully`, "");
          this.setState({ isShowModal: false });
        }
      });
    }
    // const closeModal = localStorage.getItem("openModal");
    // this.setState({ isShowModal: false });
    // message.success("Add user success!");
  };
  cleanData = () => {
    this.setState({
      userId: "",
      address: "",
      avatar: "",
      dayOfBirth: "",
      email: "",
      phoneNumber: "",
      role: "",
      username: "",
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  // showDeleteConfirm = () => {
  //   const { userIdDelete } = this.state;
  //   console.log("null?", userIdDelete);
  //   confirm({
  //     title: "Are you sure delete this User?",
  //     //   icon: <ExclamationCircleOutlined />,
  //     content: "Some descriptions",
  //     okText: "Yes",
  //     okType: "danger",
  //     cancelText: "No",
  //     onOk() {
  //       axios
  //         .delete("http://localhost:3030/users/api/delete/" + userIdDelete)
  //         .then(() => {
  //           console.log("OK");
  //           message.success("Delete user success");
  //         });
  //     },
  //     onCancel() {
  //       console.log("Cancel");
  //     },
  //   });
  // };
  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }
  handleCancel = (e) => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      // <LayoutContentWrapper className="company">
      <div>
        <Card
          header={{ title: "Companies" }}
          extra={
            <React.Fragment>
              {/* <SearchBox
                placeholder="Search companies"
                handleOnTransferText={this.handleOnTransferText}
              ></SearchBox> */}
              <Button
                className="btn-add"
                type="primary"
                onClick={this.handleModal}
              >
                Add User
              </Button>
            </React.Fragment>
          }
        >
          <Modal
            title="Are you sure?"
            visible={this.state.visibleDelete}
            onOk={() => this.handleDelete(this.state.userIdDelete)}
            okType={"danger"}
            onCancel={() =>
              this.handleToggleDeletedModal(false, this.state.userIdDelete)
            }
          >
            <p>Do you really want to delete this record?</p>
          </Modal>
          {/* <Modal
            title="Are you sure?"
            visible={this.state.visibleDelete}
            onOk={() => this.handleDelete(this.state.companyIdDelete)}
            okType={'danger'}
            onCancel={() =>
              this.handleToggleDeletedModal(false, this.state.companyIdDelete)
            }
          >
            <p>Do you really want to delete this record?</p>
          </Modal> */}
          <Table
            // className="com-table"
            columns={this.columns}
            dataSource={this.state.usersInTable}
            rowKey={(item) => item.userId}
          />
          {/* <Table
            className="com-table"
            columns={this.columns}
            dataSource={this.state.companiesInTable}
            rowKey={item => item.companyId}
            {...defaultPropTable}
          /> */}
        </Card>

        {this.state.isShowModal && (
          <>
            <Modal
              className="company-details"
              title={this.state.userId ? "Update User" : "Add New User"}
              visible={this.state.isShowModal}
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

                <Tabs
                  defaultActiveKey="1"
                  activeKey={this.state.activeTab}
                  onChange={(activeTab) => this.setState({ activeTab })}
                >
                  {/* <TabPane tab="General Info" key="1">
                    <label>
                        Info
                    </label>
                </TabPane> */}
                  <TabPane tab="Add user" key="1">
                    <div>
                      <label>Avatar</label>
                      <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="http://localhost:3030/users/post"
                        headers={{
                          authorization: `Bearer ${LocalStorageService.getAccessToken()}`,
                        }}
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="image"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
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
                    <div>
                      <label>Password</label>
                      <Input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        id="password"
                      ></Input>
                    </div>
                  </TabPane>
                </Tabs>
              </Form>
            </Modal>
          </>
        )}
      </div>
    );
  }
}
// UserList.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };
// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });
// export default connect(mapStateToProps, { registerUser })(withRouter(UserList));
const mapDispatchToProps = (dispatch) => ({
  deleteUser: (userId) => dispatch(userActions.deleteUser(userId)),
  updateUser: (userId, user) => dispatch(userActions.updateUser(userId, user)),
  getUserById: (userId) => dispatch(userActions.getUserById(userId)),
  addUser: (user) => dispatch(userActions.addUser(user)),
});

export default connect(null, mapDispatchToProps)(withRouter(UserList));
