import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";

const SideNav = () => {
  const history = useHistory();

  const handleUserClick = () => {
    history.push("/admin/userlist");
  };

  const handleProductsClick = () => {
    history.push("/admin/productlist");
  };

  const handleFileClick = () => {
    history.push("/files");
  };
  const handleRegisterClick = () => {
    history.push("/register");
  };

  return (
    <div>
      <div
        style={{
          height: "32px",
          background: "rgba(255, 255, 255, 0.2)",
          margin: "16px",
        }}
      ></div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" onClick={handleUserClick}>
          <UnorderedListOutlined />
          <span> Users List</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={handleProductsClick}>
          <UnorderedListOutlined />
          <span> Product List</span>
        </Menu.Item>
        {/* <Menu.Item key="3" onClick={handleFileClick}>
                    <UploadOutlined />
                    <span> Files</span>
                </Menu.Item> */}
        <Menu.Item key="4" onClick={handleRegisterClick}>
          <UploadOutlined />
          <span> Register</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideNav;
