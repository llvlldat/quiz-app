import { Form, Input, Button, Row, Col, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/api";
import Swal from "sweetalert2";
import { userContext } from "../context/Context";
import { useContext } from "react";

const Login = () => {
    const context = useContext(userContext);
    const navigate = useNavigate()

    const onFinish = (values) => {
        login(values.username, values.password)
            .then((res) => {
                context.setUser(res.data);
                localStorage.setItem("token", res.data.tokens.access.token);
                localStorage.setItem("refreshToken", res.data.tokens.refresh.token)
                navigate('/dashboard')
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    // text: err.response.data.message,
                });
            });
    };

    return (
        <Row
            type="flex"
            align="middle"
            justify="center"
            style={{ height: "100vh" }}
        >
            <Col
                span={6}
                style={{
                    border: "1px solid #c1c1c1",
                    padding: "24px 48px",
                    borderRadius: "8px",
                }}
            >
                <Typography.Title>Login</Typography.Title>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                        &ensp; Or <Link to="/register">register now!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Login;
