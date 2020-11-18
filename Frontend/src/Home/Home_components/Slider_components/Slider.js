/* eslint-disable */
import { CaretLeftOutlined, CaretRightOutlined, MessageOutlined } from '@ant-design/icons';
import { Form, Modal, Tabs } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import SlickSlider from 'react-slick';

import notification from '../../../helper/Notification';
import shoes1 from '../../../image/1.jpg';
import shoes2 from '../../../image/2.jpg';
import shoes3 from '../../../image/3.jpg';
import shoes4 from '../../../image/4.jpg';
import shoes5 from '../../../image/5.jpg';
import ShopProductActions from '../../../redux/shopProduct/actions';

const RenderArrow = ({ className, style, onClick, type }) => {
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      {type === 'pre' && <CaretLeftOutlined style={{ fontSize: 24, color: '#08c' }} />}
      {type === 'next' && <CaretRightOutlined style={{ fontSize: 24, color: '#08c' }} />}
    </div>
  );
};

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      price: '',
      productname: '',
      productcode: '',
      illustration: '',
      isShowModal: false,
      productId: '',
      brand: '',
    };
  }

  handleSelect = async (productId) => {
    console.log('clicked');
    await this.setState({ isShowModal: true, productId: productId });
    console.log('bao:', this.state.isShowModal);
    this.props.getProductById(productId).then((res) => {
      this.setState({
        productname: res.data.data.productname,
        productcode: res.data.data.productcode,
        illustration: res.data.data.illustration,
        price: res.data.data.price,
        description: res.data.data.description,
        brand: res.data.data.brand,
      });
      console.log('bao:', res.data.data.productname);
    });
  };
  handleCancel = () => {
    this.setState({ isShowModal: false });
    console.log('status:', this.state.isShowModal);
  };
  handleOk = () => {
    this.setState({ isShowModal: false });
  };
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <RenderArrow type={'next'} />,
      prevArrow: <RenderArrow type={'pre'} />,
    };
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <div id='slider-carousel' className='carousel slide' data-ride='carousel'>
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
                  <div onClick={(e) => this.handleSelect(1)} className='col-sm-6'>
                    <div
                      style={{
                        float: 'left',
                        textAlign: 'center',
                        width: '50%',
                      }}
                    >
                      <h2> Nike Air Jordan 1 Mid ‘Light Smoke Grey’</h2>
                      <h3>Color: Light-Grey</h3>
                      <p>
                        With buzz around the Dior x AJ1 still as fervent as it was upon debut, it’s no question that comparisons will be drawn with every gray scheme thereafter.
                        This latest Air Jordan 1 Mid is certainly not exempt from this whatsoever, rather, it embraces such connections as palettes are nearly shot-for-shot the
                        same as its high-end counterpart, though sans any of the luxury imprint’s signature all-over graphic or their luxe Italian made leathers.#airjordan1mid
                      </p>
                    </div>
                    <div>
                      <img style={{ paddingLeft: '50px' }} src={shoes1} className='girl img-responsive' />
                    </div>
                  </div>
                  <div onClick={(e) => this.handleSelect(2)}>
                    <div
                      style={{
                        float: 'left',
                        textAlign: 'center',
                        width: '50%',
                      }}
                    >
                      <h2> Nike Men's Air Jordan 1 Retro High OG 'Origin Story' Red/White</h2>
                      <h3>Color: Red/White</h3>
                      <p>
                        The Spider-Man x Air Jordan 1 Origin Story is a special edition of Michael Jordan's first signature shoe that celebrates the 2018 release of the Marvel
                        movie Spider-Man: Into the Spider-Verse. Using the blueprint of the original Chicago colorway that is worn by the character Miles Morales in the film, the
                        design features a white and and red leather upper with a few modifications inspired by Spider-Man. The red leather panels on the upper feature a tonal dot
                        print that is also reflective, referencing Spider-Man¬ís suit. The Nike Air tongue tag is presented in blue and red as another nod to the superhero, while
                        an icy clear outsole completes the colorway. Released on December 14, 2018 to coincide with the opening of the film, the Spider-Man x Air Jordan 1 Origin
                        Story is a must-have for sneaker and comic book aficionados alike.
                      </p>
                    </div>
                    <div>
                      <img style={{ paddingLeft: '50px' }} src={shoes2} className='girl img-responsive' />
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        float: 'left',
                        textAlign: 'center',
                        width: '50%',
                      }}
                    >
                      <h2> Nike Jordan 1 Low Orange</h2>
                      <h3>Color: Orange Black White</h3>
                      <p>
                        The Air Jordan 1 Low 'Shattered Backboard' commemorates when Michael Jordan broke a backboard during a 1985 exhibition game in Italy. Inspired by the OG
                        AJ1, this low-cut version is presented in Starfish, black and Sail, a nod to the jersey worn by MJ during the game. The shoe comes with a leather upper, the
                        iconic Jumpman logo on the tongue and the classic Wings logo embroidered on the heel. An encapsulated Air-Sole unit and a rubber outsole with a pivot point
                        tread pattern finish the model.
                      </p>
                    </div>
                    <div>
                      <img style={{ paddingLeft: '50px' }} src={shoes3} className='girl img-responsive' />
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        float: 'left',
                        textAlign: 'center',
                        width: '50%',
                      }}
                    >
                      <h2> Nike Air Jordan Retro 1</h2>
                      <h3>Color: White BLue</h3>
                      <p>
                        The Nike Air Jordan signature shoe bearing Michael Jordan was first released in 1985 and is the only model to replace the Nike Air logo on the reed with the
                        Jumpman image. As an Air Jordan line, the Nike Air Jordan 1 Retro High is a limited edition release designed for the famous basketball player Russel
                        Westbrook and its highlight is the upper. Combined with both leather (leather) and nubuck leather for a luxurious look.
                      </p>
                    </div>
                    <div>
                      <img style={{ paddingLeft: '50px' }} src={shoes4} className='girl img-responsive' />
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        float: 'left',
                        textAlign: 'center',
                        width: '50%',
                      }}
                    >
                      <h2> Nike Air Jordan 4 st 308497-110</h2>
                      <h3>Color: White Red</h3>
                      <p>
                        Premium material is soft and smooth, creating a comfortable feeling for every step. The base is made of synthetic rubber with anti-slip groove, ensuring the
                        safety of the wearer. Exquisite design, trendy design is youthful, is a design for you, shoes focus on shape with each street, exuding a youthful, elegant
                        look. The sewing is meticulous and the glue line is firm and durable for a long time.
                      </p>
                    </div>
                    <div>
                      <img style={{ paddingLeft: '50px' }} src={shoes5} className='girl img-responsive' />
                    </div>
                  </div>
                </SlickSlider>
              </div>
              <div>
                {/* {this.state.isShowModal === true && ( */}
                <>
                  {/* {console.log('that work')} */}
                  <Modal
                    okText='Add to Cart'
                    className='company-details'
                    title='Product Details'
                    visible={this.state.isShowModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <Form>
                      <h1>{this.state.productname}</h1>
                      <div
                        style={{
                          float: 'left',
                          textAlign: 'center',
                          width: '50%',
                          height: 'auto',
                        }}
                      >
                        <p>{this.state.description}</p>
                      </div>
                      <div>
                        {/* <img style={{ marginLeft: '10px' }} src={shoes + this.state.productId} /> */}
                        <p style={{ textAlign: 'center' }}>
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
  deleteProduct: (productId) => dispatch(ShopProductActions.deleteProduct(productId)),
  updateProductr: (productId, product) => dispatch(ShopProductActions.updateProduct(productId, product)),
  getProductById: (productId) => dispatch(ShopProductActions.getProductById(productId)),
  addProduct: (product) => dispatch(ShopProductActions.addProduct(product)),
});

export default connect(null, mapDispatchToProps)(withRouter(Slider));

// export default Slider;
