/* eslint-disable */
import React from 'react';

class Header_top extends React.Component {
  render() {
    return (
      <div className='header_top' style={{ backgroundColor: '#ee4d2d', color: 'white' }}>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-6'>
              <div className='contactinfo'>
                <ul className='nav nav-pills'>
                  <li>
                    <a style={{ color: 'white' }}>
                      <i className='fa fa-phone'></i> +84 942 099 721
                    </a>
                  </li>
                  <li>
                    <a style={{ color: 'white' }}>
                      <i className='fa fa-envelope'></i> info@sneakershop@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header_top;
