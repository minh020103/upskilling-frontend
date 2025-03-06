import Cookies from "js-cookie";
import { FailResponseModel, ResponseModel } from "../../../models/ResponseModel";
import { UserInformationModel } from "../../../models/UserModel";
import { getUserByToken } from "../../../services/UserService";
import { styled } from "styled-components";
import { Layout } from "antd";
import { FormAccountInProfile } from "../../items/profile/FormAccountInProfile";
import { FormInformationInProfile } from "../../items/profile/FormUpdateUserInformationProfile";
import React from "react";
import { notifyErr } from "../../../utils/notify";

const FormUpdateStyle = styled(Layout)(({ }) => ({
    margin: '24px',
    width: 'Fixed (1,184px)px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '181px',
    left: '232px',
    padding: '24px 0px 24px 0px',
    gap: '10px',
    opacity: '0px',
    flexDirection: 'column',
    marginBottom: '100px',
}));

const initialGetUser: UserInformationModel = {
    id: 0,
    username: "",
    fullName: "",
    dateBirth: "",
    email: "",
    phone: "",
    status: "",
    avatar: "",
    roles: [],
    position: "",
    company: "",
    address: "",
};

export const FormUpdateUserInformation = () => {
    const tokenJwt: string = Cookies.get("tokenJwt") + "";
    const [loading, setLoading] = React.useState<boolean>(true);
    const [user, setUser] = React.useState<UserInformationModel>(initialGetUser);
    React.useEffect(() => {
        const getInfomationOfUser = async (tokenJwt: string) => {
            setLoading(true);
            if (tokenJwt) {
                const response: ResponseModel = await getUserByToken(tokenJwt);
                const { status, data } = response;


                if (status === 200) {
                    const userInformation = data as UserInformationModel;
                    setUser(userInformation);
                } else {
                    const fail: FailResponseModel = data as FailResponseModel;
                    notifyErr(fail.errorMessage);
                }
            }

            setLoading(false);
        }
        getInfomationOfUser(tokenJwt);
    }, [tokenJwt]);

    return (
        <FormUpdateStyle>
            <FormAccountInProfile loading={loading} data={user} />
            <FormInformationInProfile loading={loading} data={user} />
        </FormUpdateStyle>
    )
}

