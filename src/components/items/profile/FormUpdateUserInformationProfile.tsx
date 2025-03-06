import { Button, Layout, Row, Spin, Typography } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataFormProps } from "../../../models/profile";
import { FailResponseModel } from "../../../models/ResponseModel";
import { UpdateUserModel, UserInformationModel } from "../../../models/UserModel";
import { UpdateUserService } from "../../../services/UserService";
import { notifyErr, notifySuccess } from "../../../utils/notify";
import { InputTextProfile } from "./InputTextProfile";

export const FormInformationInProfile = (props: DataFormProps) => {
    const { loading, data } = props;
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const [formData, setFormData] = useState<UserInformationModel>({} as UserInformationModel);

    useEffect(() => {

        data && setFormData(data);
    }, [data])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
    const onClickUpdate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^0\d{9}$/;
        if (formData.fullName === "") {
            notifyErr('Please input full name');
            return;
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
        } else if (formData.position === "") {
            notifyErr('Please input position');
            return;
        } else if (formData.company === "") {
            notifyErr('Please input company');
            return;
        } else if (formData.address === "") {
            notifyErr('Please input address');
            return;
        } else {
            const userUpdate: UpdateUserModel = { fullName: formData.fullName, email: formData.email, phone: formData.phone, position: formData.position, company: formData.company, address: formData.address }
            setLoadingUpdate(true);
            handleUpdateUser(userUpdate);
        }
    }
    const handleUpdateUser = async (updateUser: UpdateUserModel): Promise<void> => {
        try {
            const tokenJwt: string = Cookies.get("tokenJwt") + "";
            const response = await UpdateUserService(updateUser, tokenJwt);
            const { status, data } = response;
            if (status == 200) {
                // const success = data as UpdateUserModel;
                notifySuccess("Update successful");
            } else {
                const fail = data as FailResponseModel;
                notifyErr(fail.errorMessage);
            }
        } catch (error) {
            // Handle errors, display error message to the user
            alert(error);
            // notifyErr(error.message);
        }
        setLoadingUpdate(false);
    };
    return (
        <Spin spinning={loadingUpdate}>
            <FormInformationInProfileStyled>
                <Typography className="title-account">Personal information</Typography>
                <InputTextProfile label={"Name:"} loading={loading} value={formData.fullName} disabled={false} name="fullName" onChange={handleInputChange} />
                <InputTextProfile label={"Email:"} loading={loading} value={formData.email} disabled={true} name="email" onChange={handleInputChange} />
                <InputTextProfile label={"Phone:"} loading={loading} value={formData.phone} disabled={false} name="phone" onChange={handleInputChange} />
                <InputTextProfile label={"position:"} loading={loading} value={formData.position} disabled={false} name="position" onChange={handleInputChange} />
                <InputTextProfile label={"Company:"} loading={loading} value={formData.company} disabled={false} name="company" onChange={handleInputChange} />
                <InputTextProfile label={"Address:"} loading={loading} value={formData.address} disabled={false} name="address" onChange={handleInputChange} />

                <Row>
                    <Button className="bottom-update" onClick={onClickUpdate}>Update</Button>
                    <Button className="bottom-cancel">Cancel</Button>
                </Row>
            </FormInformationInProfileStyled>
        </Spin>
    )
}
const FormInformationInProfileStyled = styled(Layout)(({ }) => ({
    width: '484px',
    background: 'none',
    '& .title-account': {
        width: '100%',
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '28px',
        textAlign: 'left',
        marginBottom: '16px',
    },
    '& .bottom-update': {
        backgroundColor: '#1890FF',
        color: '#FFFFFF',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'blue !important',
            color: '#FFFFFF !important',
        }
    },
    '& .bottom-cancel': {
        backgroundColor: '#FFFFFF',
        border: 'solid 1px #D9D9D9',
        marginLeft: '8px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'blue !important',
            color: '#FFFFFF !important',
        }
    }
}));