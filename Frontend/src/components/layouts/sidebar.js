import { UnorderedListOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

import logo from '../../image/shoplogo.png';

const SideNav = () => {
  const history = useHistory();

  const handleUserClick = () => {
    history.push('/admin/userlist');
  };

  const handleProductsClick = () => {
    history.push('/admin/productlist');
  };

  const handleRegisterClick = () => {
    history.push('/admin/register');
  };

  return (
    <div>
      <div
        style={{
          height: '32px',
          background: 'rgba(255, 255, 255, 0.2)',
          margin: '16px',
        }}
      >
        <p style={{ color: 'white', fontSize: '18px', marginLeft: '25px' }}>SneakerShop</p>
      </div>
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
        <Menu.Item key='1' onClick={handleUserClick}>
          <UnorderedListOutlined />
          <span> Users List</span>
        </Menu.Item>
        <Menu.Item key='2' onClick={handleProductsClick}>
          <UnorderedListOutlined />
          <span> Product List</span>
        </Menu.Item>
        {/* <Menu.Item key="3" onClick={handleFileClick}>
                    <UploadOutlined />
                    <span> Files</span>
                </Menu.Item> */}
        <Menu.Item key='4' onClick={handleRegisterClick}>
          <UnorderedListOutlined />
          <span> Category</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideNav;
