import { CSSProperties, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { isValid, parse } from 'date-fns';
import styled from 'styled-components';
import { Typography, Button, Input, Form, Spin } from 'antd';
import { RegisterModel } from '../../models/AuthModel';
import { registerService } from '../../services/AuthService';
import { FailResponseModel, SuccessResponseModel } from '../../models/ResponseModel';
import { notifyErr, notifySuccess } from '../../utils/notify';

// Css login form
const RegisterFormStyled = styled.div`
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
      color: #005db4;
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

// Fields for the register section
const initialFormData: RegisterModel = {
    username: "",
    fullName: "",
    dateBirth: "",
    email: "",
    phone: "",
    roles: [2],
};
export default function RegisterForm() {
    // Properties for the loading section
    let [loading, setLoading] = useState(false);
    // Navigation
    const navigate = useNavigate();

    const [formData, setFormData] = useState<RegisterModel>(initialFormData);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }


    // Handle Register
    const handleRegister = async (registerModel: RegisterModel) => {
        try {
            const res = await registerService(registerModel);
            const { status, data } = res;
            if (status == 200) {
                const successData = data as SuccessResponseModel;
                // Display success message and redirect user to login page
                notifySuccess(successData.message);
                notifySuccess("Account information and password have been sent to your email");
                navigate("/login");
            } else if (status == 409) {
                const successData = data as FailResponseModel;
                // Registration failure due to existing account
                notifyErr(successData.errorMessage);
            }

        } catch (error) {
            // Handle errors, display error message to the user
        }
        setLoading(false);
    };
    // Event when the register button is pressed
    const onClickRegister = () => {
        const parsedDate = parse(formData.dateBirth, 'yyyy-MM-dd', new Date());
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^0\d{9}$/;

        if (formData.username === "") {
            notifyErr('Please input username');
        } else if (formData.username.length < 4) {
            notifyErr('Enter a username with at least 4 characters');
        } else if (formData.fullName === "") {
            notifyErr('Please input full name');
        } else if (formData.dateBirth === "") {
            notifyErr('Please input dateBirth');
        } else if (!isValid(parsedDate)) {
            notifyErr('Please enter your date of birth correctly');
        } else if (formData.email === "") {
            notifyErr('Please input email');
            return;
        } else if (!emailRegex.test(formData.email)) {
            notifyErr('Please enter a valid email');
            return;
        } else if (formData.phone === "") {
            notifyErr('Please input phone');
            return;
        } else if (!phoneRegex.test(formData.phone)) {
            notifyErr('Enter a phone number starting with 0 and up to 10 digits');
            return;
        } else {
            setLoading(true);
            handleRegister(formData);
        }
    }

    return (
        <>
            <Spin spinning={loading} style={override}>
                <RegisterFormStyled>
                    <Typography className="title-form">
                        Register
                    </Typography>
                    <Form layout="vertical">
                        <Form.Item>
                            <Input
                                type="text"
                                addonBefore="Tên đăng nhập"
                                name="username"
                                value={formData.username}
                                onChange={(e) => handleInputChange(e)}
                                className="input-custom"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                type="text"
                                addonBefore="Họ và tên"
                                name="fullName"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange(e)}
                                className="input-custom"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                type="date"
                                addonBefore="Ngày sinh"
                                name="dateBirth"
                                value={formData.dateBirth}
                                onChange={(e) => handleInputChange(e)}
                                className="input-custom"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                type="text"
                                addonBefore="Email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange(e)}
                                className="input-custom"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                type="text"
                                addonBefore="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange(e)}
                                className="input-custom"
                            />
                        </Form.Item>
                        <Button className="button-custom" onClick={onClickRegister}>Đăng Ký</Button>
                        <Typography className="text-form">
                            Bạn đã có tài khoản chưa?
                            <Link className="link-register" to={"/login"}> Đăng Nhập</Link>
                        </Typography>
                    </Form>
                </RegisterFormStyled>
            </Spin>
        </>
    )
}