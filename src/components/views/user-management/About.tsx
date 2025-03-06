import { Typography } from "antd";
import styled from "styled-components"
import { ItemInfo } from "../../items/user-management/ItemInfo";
import { Div } from "../../styles/Div"
import { ContentUserProps } from "../../../models/usermanagement";

export const About = (props: ContentUserProps) => {
    return (
        <AboutStyled>
            <Typography className="title-about">Personal information</Typography>
            <ItemInfo
                title="Email"
                value={props.user.userInformation.email}
            />
            <ItemInfo
                title="Phone"
                value={props.user.userInformation.phone}
            />
            <ItemInfo
                title="Position"
                value={props.user.userInformation.position}
            />
            <ItemInfo
                title="Company"
                value={props.user.userInformation.company}
            />
            <ItemInfo
                title="Address"
                value={props.user.userInformation.address}
            />
        </AboutStyled>
    )
}
const AboutStyled = styled(Div)(({ }) => ({
    background: '#fff',
    padding: '24px',
    margin: '24px',
    '& .title-about': {
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontHeight: '500',
        lineHeight: '28px',
        textAlign: 'left',
        marginBottom: '24px',
    },
}));