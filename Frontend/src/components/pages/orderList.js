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
  Row,
  Col,
  Radio,
} from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link, withRouter } from "react-router-dom";

import LocalStorageService from "../../config/LocalStorageService";
import notification from "../../helper/Notification";
import productActions from "../../redux/product/actions";
import shopProductActions from "../../redux/shopProduct/actions";
import LayoutContentWrapper from "../../utility/layoutWrapper";

// import { getAll } from "../../Actions/authActions";
// import CreateOrUpdateUser from "./CreateOrUpdateCompany.js";
// import { registerUser } from "../../Actions/authActions";
// import TableRow from "./TableRow";
const { confirm } = Modal;
const { Option } = Select;

const { TabPane } = Tabs;

class OrderList extends Component {
  columns = [
    {
      title: "User Name",
      dataIndex: "name",
    },
    {
      title: "Phonenumber",
      dataIndex: "phone",
    },
    {
      title: "Address",
      //   key: "brand",
      dataIndex: "address",
    },
    {
      title: "OrderCode",
      //   key: "description",
      dataIndex: "ordercode",
    },
    {
      title: "Product",
      children: [
        {
          title: "Product Name",
          dataIndex: "products",
          // key: 'productname',
          render: (item) => {
            return (
              <Col>
                {item.map((i) => (
                  <Row>
                    -<a href={"../detail/" + i.id}>{i.productname}</a>-
                  </Row>
                ))}
              </Col>
            );
          },
        },
        {
          title: "Size",
          dataIndex: "products",
          render: (item) => {
            return (
              <Col>
                {item.map((i) => (
                  <Row>-{i.size}-</Row>
                ))}
              </Col>
            );
          },
          width: 70,
        },
        {
          title: "Amount",
          dataIndex: "products",
          render: (item) => {
            return (
              <Col>
                {item.map((i) => (
                  <Row>-{i.total}-</Row>
                ))}
              </Col>
            );
          },
          width: 50,
        },
      ],
    },

    // {
    //   title: "Illustration",
    //   key: "illustration",
    //   // dataIndex: "illustration",
    //   render: (com) => {
    //     return (
    //       <div>
    //         <img
    //           style={{ width: "100px" }}
    //           src={"http://localhost:3030/images/product/" + com.illustration}
    //           alt="sadad"
    //         />
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Total",
      //   key: "price",
      dataIndex: "total",
    },
    {
      title: "Paid",
      //   key: "amount",
      dataIndex: "paid",
    },
    {
      title: "Status",
      //   key: "amount",
      dataIndex: "status",
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
      products: [],
      isShowModal: false,
      productId: null,
      products: [],
      productsInTable: [],
      idverify: [],
      totalItem: 0,
      visibleDelete: false,
      productIdDelete: null,
      searchInput: "",
      productname: "",
      price: "",
      amount: "",
      illustration: "",
      brand: "",
      productcode: "",
      description: "",
      errors: {},
      loading: false,
      imageUrl: "",
      paid: "",
      status: "",
    };
  }
  componentDidMount() {
    this.getProduct();
  }
  handleToggleDeletedModal = (isShow, id = 0) => {
    this.setState({
      ...this.state,
      productIdDelete: id,
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
      this.setState({
        loading: true,
        // illustration: info.file,
      });
      const { illustration } = this.state;
      // console.log("url", imageUrl);
      // console.log("info:", info.file);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.setState({
        // loading: true,
        illustration: info.file.response.name,
      });
      console.log("info:", info.file.response.name);

      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  getProduct = async () => {
    await axios
      .get("http://localhost:3030/shop/api/getorder")
      .then((response) => {
        console.log(response.data);
        this.setState({
          products: response.data,
          productsInTable: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleUpdate = (orderid) => {
    console.log("bao:", orderid, "-", this.state.paid, "-", this.state.status);
    this.setState({ isShowModal: true, productId: orderid });

    // this.props.getProductById(productId).then((res) => {
    //   console.log("daat:", res);
    //   this.setState({
    //     brand: res.data.data.brand,
    //     productname: res.data.data.productname,
    //     productcode: res.data.data.productcode,
    //     illustration: res.data.data.illustration,
    //     description: res.data.data.description,
    //     price: res.data.data.price,
    //     amount: res.data.data.amount,
    //   });
    // });
  };

  handleModal = () => {
    this.setState({ isShowModal: true });
    this.cleanData();
  };

  handleDelete = (productId) => {
    this.props.deleteProduct(productId).then((res) => {
      console.log("status:", res.data.status);
      if (res.data.status === "success") {
        console.log("okkkk");
        this.getProduct();
        this.handleToggleDeletedModal(false, 0);
        notification("success", `Delete Product Successfully`, "");
      }
    });
  };

  handleOk = async () => {
    console.log(
      "ddsds:",
      this.state.productId,
      "-",
      this.state.paid,
      "-",
      this.state.status
    );
    const obj = {
      orderid: this.state.productId,
      paid: this.state.paid,
      status: this.state.status,
    };
    this.props.updateOrder(obj).then((data) => {
      if (data.data.status === "success") {
        notification("success", "Update successfully");
      }
      this.setState({ isShowModal: false });
    });
    // if (this.state.productId) {
    //   console.log("update");
    //   const obj = {
    //     brand: this.state.brand,
    //     productname: this.state.productname,
    //     productcode: this.state.productcode,
    //     illustration: this.state.illustration,
    //     description: this.state.description,
    //     price: this.state.price,
    //     amount: this.state.amount,
    //   };
    //   await this.props.updateProduct(this.state.productId, obj).then((res) => {
    //     if (res.data.status === "success") {
    //       this.getProduct();
    //       this.setState({ isShowModal: false });
    //       notification("success", `Update Product Successfully`, "");
    //     }
    //   });
    // } else {
    //   console.log("submit");
    //   const obj = {
    //     brand: this.state.brand,
    //     productname: this.state.productname,
    //     productcode: this.state.productcode,
    //     illustration: this.state.illustration,
    //     description: this.state.description,
    //     price: this.state.price,
    //     amount: this.state.amount,
    //   };
    //   await this.props.addProduct(obj).then((res) => {
    //     if (res.data.status === "success") {
    //       console.log("okkkk add");
    //       this.getProduct();
    //       this.handleToggleDeletedModal(false, 0);
    //       notification("success", `Add Product Successfully`, "");
    //       this.setState({ isShowModal: false });
    //     }
    //   });
    // }
    // const closeModal = localStorage.getItem("openModal");
    // this.setState({ isShowModal: false });
    // message.success("Add user success!");
  };
  cleanData = () => {
    this.setState({
      brand: "",
      productname: "",
      productcode: "",
      illustration: "",
      description: "",
      price: "",
      amount: "",
    });
  };
  handleAva = () => {};
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(e.target.value);
  };

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
          header={{ title: "Product" }}
          // extra={
          //   <React.Fragment>
          //     {/* <SearchBox
          //       placeholder="Search companies"
          //       handleOnTransferText={this.handleOnTransferText}
          //     ></SearchBox> */}
          //     <Button
          //       className="btn-add"
          //       type="primary"
          //       onClick={this.handleModal}
          //     >
          //       Add Product
          //     </Button>
          //   </React.Fragment>
          // }
        >
          <Modal
            title="Are you sure?"
            visible={this.state.visibleDelete}
            onOk={() => this.handleDelete(this.state.productIdDelete)}
            okType={"danger"}
            onCancel={() =>
              this.handleToggleDeletedModal(false, this.state.productIdDelete)
            }
          >
            <p>Do you really want to delete this product?</p>
          </Modal>

          <Table
            columns={this.columns}
            dataSource={this.state.productsInTable}
            rowKey={(item) => item.userId}
          />
        </Card>

        {this.state.isShowModal && (
          <>
            <Modal
              className="company-details"
              title={this.state.productId ? "Update Order" : "Add New Product"}
              visible={this.state.isShowModal}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form>
                <div>
                  <label>Paid: </label>
                  <br></br>
                  {/* <Input
                      type="text"
                      name="price"
                      value={this.state.price}
                      onChange={this.onChange}
                      id="price"
                    ></Input> */}
                  <Radio.Group id="paid" onChange={this.onChange}>
                    <Radio id="paid" value="true">
                      True
                    </Radio>
                    <Radio id="paid" value="false">
                      False
                    </Radio>
                  </Radio.Group>
                </div>
                <br></br>
                <div>
                  <label>Status: </label>
                  <br></br>
                  {/* <Input
                    type="text"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onChange}
                    id="amount"
                  ></Input> */}
                  <Radio.Group id="status" onChange={this.onChange}>
                    <Radio id="status" value="Coming">
                      Coming
                    </Radio>
                    <Radio id="status" value="Delivered">
                      Delivered
                    </Radio>
                    <Radio id="status" value="Canceled">
                      Canceled
                    </Radio>
                  </Radio.Group>
                </div>
              </Form>
            </Modal>
          </>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (productId) =>
    dispatch(productActions.deleteProduct(productId)),
  updateProduct: (productId, product) =>
    dispatch(productActions.updateProduct(productId, product)),
  getProductById: (productId) =>
    dispatch(productActions.getProductById(productId)),
  addProduct: (product) => dispatch(productActions.addProduct(product)),
  updateOrder: (data) => dispatch(shopProductActions.updateOrder(data)),
});

export default connect(null, mapDispatchToProps)(withRouter(OrderList));
