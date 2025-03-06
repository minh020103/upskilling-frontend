import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DataFormProps } from "../../../models/profile";
import { InputTextProfile } from "./InputTextProfile";

export const FormAccountInProfile = (props: DataFormProps) => {
    const { loading, data } = props;
    return (
        <FormAccountInProfileStyled>
            <Typography className="title-account">Account information</Typography>
            <InputTextProfile label={"Username:"} loading={loading} value={data.username} disabled={true} name="username" onChange={{} as (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} />
            <Typography className="change-password"><Link to={"/change-password"}>Change password</Link></Typography>

        </FormAccountInProfileStyled>
    )
}
const FormAccountInProfileStyled = styled(Layout)(({ }) => ({
    width: '484px',
    height: 'Hug (168px)px',
    gap: '16px',
    opacity: '0px',
    textAlign: 'left',
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
    '& .change-password': {
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        textAlign: 'left',
        '& a': {
            width: '0',
            textDecoration: 'none',
            color: '#1890FF',
            '&:hover': {
                color: 'red',
            },
        },
    },
}));
