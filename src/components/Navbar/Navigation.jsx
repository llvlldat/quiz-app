import logo from "../../logo/logo.png";
import { userContext } from "../../context/Context";
import { useContext } from "react";
import { Col, Row, Space, Typography, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { logout } from "../../api/api";

function Navigation() {
    const context = useContext(userContext);

    const menu = (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => {
                    logout(localStorage.getItem("refreshToken"))
                        .then(() => context.setUser({}))
                        .catch((err) => console.log(err));
                }}
            >
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Row
            style={{
                position: "fixed",
                width: "100%",
                height: "50px",
                borderBottom: "1px solid #c1c1c1",
                top: 0
            }}
            align="middle"
            gutter={8}
        >
            <Col span={4}>
                <img src={logo} alt="logo" style={{ margin: "auto 10px" }} />
            </Col>
            <Col span={4} offset={16} style={{ textAlign: "right" }}>
                {!context.user.role ? (
                    <Space>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </Space>
                ) : (
                    <Space>
                        <Typography.Title level={5} style={{ margin: 0 }}>
                            {context.user.username}
                        </Typography.Title>
                        <img
                            src={context.user.avatar}
                            style={{ width: "30px" }}
                            alt="anh"
                        />
                        <Dropdown overlay={menu}>
                            <DownOutlined />
                        </Dropdown>
                    </Space>
                )}
            </Col>
        </Row>
    );
}

export default Navigation;
