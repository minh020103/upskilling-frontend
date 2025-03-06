import { Col, Row } from "antd";
import styled from "styled-components"
import { UserChallengeStartDataProps } from "../../../models/dashboard";
import { Div } from "../../styles/Div"
import { ContentLeftComplatedChallenge } from "./ContentLeftComplatedChallenge";
import { ContentRightComplatedChallenge } from "./ContentRightComplatedChallenge";

export const ContentChallengeComplated = (props: UserChallengeStartDataProps) => {
    const { data } = props;
    return (
        <ContentChallengeComplatedStyled>
            <Row>
                <Col span={18}>
                    <ContentLeftComplatedChallenge
                        data={data}
                    />
                </Col>
                <Col span={6}>
                    <ContentRightComplatedChallenge
                        data={data} />
                </Col>
            </Row>
        </ContentChallengeComplatedStyled>
    )
}
const ContentChallengeComplatedStyled = styled(Div)(({ }) => ({
    margin: '24px',
}));