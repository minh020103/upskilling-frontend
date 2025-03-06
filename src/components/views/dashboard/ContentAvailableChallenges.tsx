import { Col, Row, Spin } from "antd";
import styled from "styled-components";
import { Challenge } from "../../../models/ChallengeModel";
import { PageImpl } from "../../../models/PaginationModel";
import { PageCustom } from "../../items/custom-item/PageCustom";
import { ItemAvailableChallenges } from "../../items/dashboard/ItemAvailableChallenges";

const Div = styled.div``;
const ContentAvailableChallengesStyled = styled(Div)(({ }) => ({
    padding: '24px',
}));
const itemNumberInPage = 8;
interface ContentAvailableChallengesProps {
    loading: boolean,
    currentPage: number,
    data: PageImpl<Challenge>,
    onPageChange: (page: number, pageSize: number) => void
}
export const ContentAvailableChallenges = (props: ContentAvailableChallengesProps) => {
    const { loading, currentPage, data, onPageChange } = props;
    return (
        <Spin spinning={loading}>
            <ContentAvailableChallengesStyled>
                <Row gutter={24}>
                    {
                        data?.content.map(item => (
                            <Col span={6} style={{ marginBottom: '24px' }}>
                                <ItemAvailableChallenges
                                    className={null}
                                    imgItem={item.image}
                                    title={item.title}
                                    description={item.description}
                                    time={item.duration}
                                    avatars={[]}
                                    id={item.id}
                                />
                            </Col>
                        ))
                    }
                </Row>
                {data &&
                    <PageCustom
                        currentPage={currentPage}
                        total={data.totalElements}
                        itemNumberInPage={itemNumberInPage}
                        onPageChange={onPageChange}
                    />
                }
            </ContentAvailableChallengesStyled>
        </Spin>
    )
}