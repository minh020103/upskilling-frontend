import { Col, Row, Spin } from "antd";
import Typography from "antd/es/typography/Typography";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import { ItemInformation } from "../../items/dashboard/ItemInformation";
import { ItemResult } from "../../items/dashboard/ItemResult";
import { Div } from "../../styles/Div"
import { getDataFromSonarQService } from "../../../services/ChallengeService";
import { useEffect, useState } from "react";
import { ChallengeScanStatus } from "../../../models/response/code-development";
import { UserChallengeStartDataProps } from "../../../models/dashboard";
import moment from "moment";

export const ResultCompletedChallenge = (props: UserChallengeStartDataProps) => {
    const { id } = useParams();
    const [data, setData] = useState<ChallengeScanStatus>();
    const [loading, setLoading] = useState<boolean>(true);
    const getDataFromSonarQ = async () => {
        setLoading(true);
        try {
            const result = await getDataFromSonarQService(Number(id));
            if (result.status == 200) {
                setData(result.data as ChallengeScanStatus);
            }
        } catch (error) {

        }
        setLoading(false);
    }
    useEffect(() => {
        getDataFromSonarQ();
    }, [])
    return (
        <ResultCompletedChallengeStyled>
            <Typography>
                Results
            </Typography>
            <Row className="info-result">
                <Col span={6}>
                    <ItemInformation
                        title={"Automated checks"}
                        value={props.data.scoreScan+""}
                        color="#52C41A"
                        className={null}
                    />
                </Col>
                <Col span={6}>
                    <ItemInformation
                        title={"Auto and peer checks"}
                        value={props.data.scorePeerReview+""}
                        color="#000"
                        className={null}
                    />
                </Col>
                <Col span={6}>
                    <ItemInformation
                        title={"Last Completed"}
                        value={moment(props.data.updatedAt).format("MMMM yyyy")}
                        color="#000"
                        className={null}
                    />
                </Col>
                <Col span={6}>
                    <ItemInformation
                        title={"Times"}
                        value="5"
                        color="#1890FF"
                        className={null}
                    />
                </Col>
            </Row>

            <Spin spinning={loading}>
                <Row>
                    {data && data.summaries.map((item) => (
                        <Col span={8}>
                            <ItemResult
                                title={item.title}
                                unit={item.unit}
                                rating={item.rating}
                                value={Number(item.value)}
                            />
                        </Col>
                    ))}
                </Row>
            </Spin>
        </ResultCompletedChallengeStyled>
    )
}
const ResultCompletedChallengeStyled = styled(Div)(({ }) => ({
    padding: '24px 56px',
    background: '#FAFAFA',
    '& .info-result': {
        marginTop: '12px'
    }
}));