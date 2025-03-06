import { useState, CSSProperties } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Typography, Button, Input, Form, Spin } from 'antd';
import styled from 'styled-components';
import { LoginModel } from '../../models/AuthModel';
import { loginService } from '../../services/AuthService';
import { FailResponseModel, SuccessResponseModel } from '../../models/ResponseModel';
import { notifyErr } from '../../utils/notify';

// Css login form
const LoginFormStyled = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  background: none;
  align-items: center;
  flex-direction: column;

  button {
    background: #1890ff;
    color: #ffffff;
    width: 360px;
    margin-bottom: 22px;

    &:hover {
        background: #005db4 !important;
        color: #ffffff !important;
    }
  }

  .link-register {
    text-decoration: none;
    color: red;

    &:hover {
      color: #005db4 !important;
    }
  }

  .title-form {
    font-family: Avenir;
    font-size: 33px;
    font-weight: 800;
    line-height: 38px;
    letter-spacing: 0.005em;
    text-align: center;
    margin-bottom: 40px;
  }

  .input-custom {
    width: 360px;
    background-color: #ffffff;
    height: 40px;

    input {
      color: #000;
    }

    input[type="date"] {
      text-align: right;
    }
  }
`;


// CSS for the loading section
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    zIndex: 999,
    position: "fixed",
    top: "25%",
};
const initialFormData: LoginModel = {
    username: "",
    password: "",
};

export default function LoginForm() {
    // Properties for the loading section
    let [loading, setLoading] = useState(false);
    // Navigation
    const navigate = useNavigate();
    // Fields for the login section

    const [formData, setFormData] = useState<LoginModel>(initialFormData);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle login
    const handleLogin = async (loginModel: LoginModel) => {
        try {
            const response = await loginService(loginModel);
            const { status, data } = response;
            if (status === 200) {
                const successData = data as SuccessResponseModel;
                // Handle success, possibly redirecting the user to another page
                Cookies.set('tokenJwt', successData.result + "", { expires: 30 });
                navigate("/user");
            } else {
                const failData = data as FailResponseModel;
                notifyErr(failData.errorMessage);
            }
        } catch (error) {
            // Handle errors, display error message to the user
            alert(error);
        }
        setLoading(false);
    };

    // Event when the login button is pressed
    const onLogin = () => {
        if (formData.username === "") {
            notifyErr("Please enter a username");
        } else if (formData.username.length < 4) {
            notifyErr("Enter a username with at least 4 characters");
        } else if (formData.password === "") {
            notifyErr("Please enter a password");
        } else if (formData.password.length < 8) {
            notifyErr("Please enter a password with at least 8 characters");
        } else {
            setLoading(true);
            handleLogin(formData);
        }
    };

    return (
        <>
            {/* Display loading status when the loading field is true */}
            <Spin spinning={loading} style={override}>
                <LoginFormStyled>
                    <Typography className="title-form">
                        Challenge App
                    </Typography>
                    <Form layout="vertical">
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Tên đăng nhập"
                                name="username"
                                value={formData.username}
                                onChange={(e) => handleInputChange(e)}
                                className="input-custom"
                                prefix={<img src="/images/input-prefix.png" alt="" />}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                type="password"
                                placeholder="Mật khẩu"
                                name="password"
                                value={formData.password}
                                onChange={(e) => handleInputChange(e)}
                                className="input-custom"
                                prefix={<img src="/images/input-prefix-lock.png" alt="" />}
                            />
                        </Form.Item>
                        <Button className="button-custom" onClick={onLogin}>Đăng nhập</Button>
                        <Typography className="text-form">
                            Bạn đã có tài khoản chưa?
                            <Link className="link-register" to={"/register"}> Đăng ký</Link>
                        </Typography>
                    </Form>
                </LoginFormStyled>
            </Spin>
        </>
    );
}
