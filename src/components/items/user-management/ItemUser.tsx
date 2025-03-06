import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { Div } from "../../styles/Div"
import { ItemInformation } from "../dashboard/ItemInformation";
import { UserInfo } from "./UserInfo";
import { UserInformationProps } from "../../../models/usermanagement";
import moment from "moment";

export const ItemUser= (props: UserInformationProps) => {
    const navigate = useNavigate();
    const onClickItemUser =()=>{
        navigate(`/user/user-management/user-detail/${props.userId}`)
    }
    return (
        <ItemUserStyled onClick={onClickItemUser}>
            <UserInfo
                image={props.userInformation.avatar}
                name={props.userInformation.fullName}
                position={props.userInformation.position}
                size={44}
                distance={8}
            />
            <Row className="user-parameters">
                <Col span={8}>
                    <ItemInformation
                        title="Total score"
                        value={props.sumTotalScore + ''}
                        color="#52C41A"
                        className={null}
                    />
                </Col>
                <Col span={8}>
                    <ItemInformation
                        title="Challenges"
                        value={props.totalChallenge + ''}
                        color="#000000D9"
                        className={null}
                    />
                </Col>
                <Col span={8}>
                    <ItemInformation
                        title="Joined"
                        value={moment(props.userInformation.createdAt + '').format('MMMM yyyy')}
                        color="#00000073"
                        className={null}
                    />
                </Col>
            </Row>
        </ItemUserStyled>
    )
}
const ItemUserStyled = styled(Div)(({ }) => ({
    padding: '24px',
    border: '1px solid #0000000F',
    '& .user-parameters':{
        marginTop: '24px',
    },
}));