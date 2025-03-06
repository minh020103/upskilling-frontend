import { Col, Row } from "antd";
import styled from "styled-components"
import { ContentReviewProps } from "../../models/review";
import { ReviewCodeItemLeft } from "../items/review/ReviewCodeItemLeft";
import { ReviewCodeItemLeftRight } from "../items/review/ReviewCodeItemLeftRight";

export const ContentReview = (props: ContentReviewProps) => {
    const { data } = props;
    return (
        <ContentReviewStyled gutter={24}>
            <Col span={18}>
                <ReviewCodeItemLeft
                    data={data} />
            </Col>
            <Col span={6}>
                <ReviewCodeItemLeftRight />
            </Col>
        </ContentReviewStyled>
    )
}
const ContentReviewStyled = styled(Row)(({ }) => ({
    padding: '24px',
}));