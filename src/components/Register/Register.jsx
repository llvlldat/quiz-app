import { Form, Input, Button, Row, Col, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/api";
import Swal from "sweetalert2";

function Register() {
    const navigate = useNavigate()

    const onFinish = (values) => {
        register(values.username, values.password, values.email)
            .then((res) =>
                Swal.fire({
                    icon: "success",
                    title: "Register successfully!",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Login now",
                    cancelButtonText: "Not now",
                })
                .then(result => {
                    if(result.isConfirmed){
                        navigate("/login")
                    }
                })
            )
            .catch((err) =>
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.response.data.message,
                })
            );
    };

    return (
        <Row
            type="flex"
            align="middle"
            justify="center"
            style={{ height: "100vh" }}
        >
            <Col
                span={7}
                style={{
                    border: "1px solid #c1c1c1",
                    padding: "24px 48px",
                    borderRadius: "8px",
                }}
            >
                <Typography.Title>Register</Typography.Title>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Enter exact your email!",
                                type: "email",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <MailOutlined className="site-form-item-icon" />
                            }
                            placeholder="Email"
                        />
                    </Form.Item>
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
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            "The two passwords that you entered do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Confirm your password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Register
                        </Button>
                        &ensp; Or <Link to="/login">Login now!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Register;
