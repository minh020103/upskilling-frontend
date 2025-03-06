import { Col, Typography } from "antd";
import moment from "moment";
import styled from "styled-components"
import { UserInformationModel } from "../../../models/UserModel";
import { Div } from "../../styles/Div"
import { UserInfo } from "../user-management/UserInfo";
import { ItemNameOfFile } from "./ItemNameOfFile";
interface UserFeedBackInfo {
    user?: UserInformationModel,
    feedBack?: string,
    file?: string,
    createdAt?: string
}
export const ItemCommentFeedBack = (props: UserFeedBackInfo) => {
    const { user, feedBack, file, createdAt } = props;
    return (
        <ItemCommentFeedBackStyled>
            <UserInfo
                image={user ? user.avatar : ""}
                name={user ? user.fullName : ""}
                position={user ? user.position : ""}
                size={44}
                distance={8}
            />
            <Col className="content-area">
                <Typography>
                    {feedBack ? feedBack : ""}
                </Typography>
                {file &&
                    <ItemNameOfFile
                        fileName={file}
                    />
                }
                <Typography className="time-cre">{moment(createdAt).format("DD/MM/yyyy hh:mm")}</Typography>
            </Col>
        </ItemCommentFeedBackStyled>
    )
}
const ItemCommentFeedBackStyled = styled(Div)(({ }) => ({
    marginTop: '12px',
    padding: '24px',
    border: '1px solid #F0F0F0',
    '& .content-area': {
        marginTop: '8px',
        '& .content': {
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '22px',
            textAlign: 'left',
        },
        '& .time-cre': {
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '22px',
            textAlign: 'left',
            color: '#00000040',
            marginTop: '8px',
        }
    }
}));