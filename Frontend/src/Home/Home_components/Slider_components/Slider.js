/* eslint-disable */
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  LeftOutlined,
  MessageOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Form, Modal, Tabs } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SlickSlider from "react-slick";

import notification from "../../../helper/Notification";
import shoes1 from "../../../image/1.jpg";
import shoes2 from "../../../image/2.jpg";
import shoes3 from "../../../image/3.jpg";
import shoes4 from "../../../image/4.jpg";
import shoes5 from "../../../image/5.jpg";
import ao1 from "../../../image/ao1.jpg";
import ao2 from "../../../image/ao2.jpg";
import ao3 from "../../../image/ao3.jpg";

import ShopProductActions from "../../../redux/shopProduct/actions";

const RenderArrow = ({ className, style, onClick, type }) => {
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      {type === "pre" && (
        <LeftOutlined style={{ fontSize: 24, color: "black" }} />
      )}
      {type === "next" && (
        <RightOutlined
          style={{ fontSize: 24, color: "black", height: "50px" }}
        />
      )}
    </div>
  );
};

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      price: "",
      productname: "",
      productcode: "",
      illustration: "",
      isShowModal: false,
      productId: "",
      brand: "",
      id: "",
    };
  }
  handleSelect = async (productId) => {
    this.props.history.push("/detail/" + productId);
  };
  // handleSelect = async (productId) => {
  //   console.log("clicked");
  //   await this.setState({ isShowModal: true, productId: productId });
  //   console.log("bao:", this.state.isShowModal);
  //   this.props.getProductById(productId).then((res) => {
  //     this.setState({
  //       // id: res.data.data.id,
  //       productname: res.data.data.productname,
  //       productcode: res.data.data.productcode,
  //       illustration: res.data.data.illustration,
  //       price: res.data.data.price,
  //       description: res.data.data.description,
  //       brand: res.data.data.brand,
  //     });
  //     console.log("bao:", res.data.data.productname);
  //   });
  // };
  handleCancel = () => {
    this.setState({ isShowModal: false });
    console.log("status:", this.state.isShowModal);
  };
  handleOk = () => {
    this.setState({ isShowModal: false });
    const obj = {
      productId: this.state.id,
      userId: localStorage.getItem("userauth").split("id")[1].split(`"`)[2],
    };
    // console.log("baoo:", obj);
  };
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      // autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <RenderArrow type={"next"} />,
      prevArrow: <RenderArrow type={"pre"} />,
    };
    return (
      <div className="container" style={{ width: "845px", marginTop: "30px" }}>
        <div className="row">
          <div className="col-sm-12">
            <div
              id="slider-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              {/* <div className='carousel-inner'>
                <div className='item active'>
                  <div className='col-sm-6'>
                    <h1>
                      <span>Watch</span>-Shop
                    </h1>
                    <p>Welcome to greate website to buy Real Watch</p>
                  </div>
                  <div className='col-sm-6'>
                    <img src={Rolex} className='girl img-responsive' />
                  </div>
                </div>
              </div> */}
              <div>
                <SlickSlider {...settings}>
                  <div
                    onClick={(e) => this.handleSelect("6")}
                    className="col-sm-6"
                    style={{ marginTop: "10px" }}
                  >
                    <div
                      style={{
                        marginTop: "5px",
                        float: "left",
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      <h2> ÁO THUN KHÔNG CỔ 6M4031CT3/ST2 viettien</h2>
                      <h3>Color: Light-Blue</h3>
                      <p>
                        Áo thun không cổ Smart Casual có các tính năng như thấm
                        hút tốt, mềm mịn, ít nhăn dễ ủi và co dãn cao, phù hợp
                        với các chàng trai trẻ trung, năng động. Áo thun không
                        cổ Smart Casual được sử dụng trong môi trường đi chơi,
                        dạo phố, đi du lịch...Sản phẩm đang được bán tại hệ
                        thống Cửa hàng Việt Tiến Phía Nam.
                      </p>
                    </div>
                    <div>
                      <img
                        style={{ paddingLeft: "50px", width: "200px" }}
                        src={ao1}
                        className="girl img-responsive"
                      />
                    </div>
                  </div>
                  <div onClick={(e) => this.handleSelect("7")}>
                    <div
                      style={{
                        float: "left",
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      <h2> ÁO THUN KHÔNG CỔ 6M4051CT3/ST2 viettien</h2>
                      <h3>Color: Gray</h3>
                      <p>
                        Áo thun không cổ Smart Casual có các tính năng như thấm
                        hút tốt, mềm mịn, ít nhăn dễ ủi và bền màu, phù hợp với
                        các chàng trai trẻ trung, năng động. Áo thun không cổ
                        Smart Casual được sử dụng trong môi trường đi chơi, dạo
                        phố, đi du lịch...Sản phẩm đang được bán tại hệ thống
                        Cửa hàng Việt Tiến trên toàn quốc.
                      </p>
                    </div>
                    <div>
                      <img
                        style={{ paddingLeft: "50px", width: "200px" }}
                        src={ao2}
                        className="girl img-responsive"
                      />
                    </div>
                  </div>
                  <div onClick={(e) => this.handleSelect("8")}>
                    <div
                      style={{
                        float: "left",
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      <h2> ÁO THUN 6M4024CT3/ST2 </h2>
                      <h3>Color: BEIGE</h3>
                      <p>
                        Áo thun không cổ Smart Casual có các tính năng như: Thấm
                        hút tốt, mềm mịn, ít nhăn dễ ủi và bền màu, phù hợp với
                        các quý ông trung niên, những chàng " đậm" người, hoặc
                        có vòng 2 " dư chuẩn". Áo thun không cổ Smart Casual
                        được sử dụng trong môi trường đi chơi, dạo phố, đi du
                        lịch. Sản phẩm đang được bán tại hệ thống Cửa hàng Việt
                        Tiến Phía Nam.
                      </p>
                    </div>
                    <div>
                      <img
                        style={{ paddingLeft: "50px", width: "200px" }}
                        src={ao3}
                        className="girl img-responsive"
                      />
                    </div>
                  </div>
                  {/* <div>
                    <div
                      style={{
                        float: "left",
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      <h2> Nike Air Jordan Retro 1</h2>
                      <h3>Color: White BLue</h3>
                      <p>
                        The Nike Air Jordan signature shoe bearing Michael
                        Jordan was first released in 1985 and is the only model
                        to replace the Nike Air logo on the reed with the
                        Jumpman image. As an Air Jordan line, the Nike Air
                      </p>
                    </div>
                    <div>
                      <img
                        style={{ paddingLeft: "50px" }}
                        src={shoes4}
                        className="girl img-responsive"
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        float: "left",
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      <h2> Nike Air Jordan 4 st 308497-110</h2>
                      <h3>Color: White Red</h3>
                      <p>
                        Premium material is soft and smooth, creating a
                        comfortable feeling for every step. The base is made of
                        synthetic rubber with anti-slip groove, ensuring the
                      </p>
                    </div>
                    <div>
                      <img
                        style={{ paddingLeft: "20px", width: "300px" }}
                        src={shoes5}
                        className="girl img-responsive"
                      />
                    </div>
                  </div> */}
                </SlickSlider>
              </div>
              <div>
                {/* {this.state.isShowModal === true && ( */}
                <>
                  {/* {console.log('that work')} */}
                  <Modal
                    okText="Add to Cart"
                    className="company-details"
                    title="Product Details"
                    visible={this.state.isShowModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <Form>
                      <h1>{this.state.productname}</h1>
                      <div
                        style={{
                          float: "left",
                          textAlign: "center",
                          width: "60%",
                          height: "auto",
                        }}
                      >
                        <p>{this.state.description}</p>
                      </div>
                      <div>
                        {/* <img style={{ marginLeft: '10px' }} src={shoes + this.state.productId} /> */}
                        <p style={{ textAlign: "center" }}>
                          Price:<b>{this.state.price}$</b>
                        </p>
                      </div>
                    </Form>
                  </Modal>
                </>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (productId) =>
    dispatch(ShopProductActions.deleteProduct(productId)),
  updateProductr: (productId, product) =>
    dispatch(ShopProductActions.updateProduct(productId, product)),
  getProductById: (productId) =>
    dispatch(ShopProductActions.getProductById(productId)),
  addProduct: (product) => dispatch(ShopProductActions.addProduct(product)),
});

export default connect(null, mapDispatchToProps)(withRouter(Slider));

// export default Slider;
