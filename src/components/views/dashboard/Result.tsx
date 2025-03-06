import { Button, Col, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { InitialEvaluationBottomProps } from "../../../models/dashboard";
import { ChallengeScanStatus } from "../../../models/response/code-development";
import { getDataFromSonarQService, getScoreScanService } from "../../../services/ChallengeService";
import { ItemResult } from "../../items/dashboard/ItemResult";
import { Div } from "../../styles/Div"

export const Result = (props: InitialEvaluationBottomProps) => {
    const { setProgress, userChallengeStartId } = props;
    const [data, setData] = useState<ChallengeScanStatus>();
    const [loading, setLoading] = useState<boolean>(true);
    const [statusAnalysis, setStatusAnalysis] = useState<string>("");
    const [score, setScore] = useState<{scoreScan: number}>();
    useEffect(() => {
        const getDataSonarQ = async () => {
            if (userChallengeStartId != undefined) {
                const res = await getDataFromSonarQService(userChallengeStartId);
                const { data, status } = res;
                const success = data as ChallengeScanStatus;
                setData(success);
                if (status == 200) {
                    if (success.statusAnalysis != "SUCCESS") {
                        setTimeout(() => getDataSonarQ(), 10000);
                    }
                    else {
                        setLoading(false);
                    }
                }
            }
        }
        getDataSonarQ()
    }, [])
    useEffect(() => {
        getScoreScan();
    }, [data])
    const onClickNext = () => {
        if (setProgress) {
            setProgress(2);
        }
    }
    const onClickBack = () => {
        if (setProgress) {
            setProgress(0);
        }
    }

    const getScoreScan = async () => {
        try {
            const res = await getScoreScanService(userChallengeStartId);
            if (res.status == 200) {
                setScore(res.data as {scoreScan: number});
            }

        } catch (error) {

        }
    }
    return (
        <Spin spinning={loading}>
            <ResultStyled>
                <Typography className="title-result">Result</Typography>
                <Row>
                    {data?.summaries?.map((item) => (
                        <Col span={4} className="item">
                            <ItemResult
                                title={item.title}
                                value={Number(item.value)}
                                unit={item.unit}
                                rating={item.rating}
                            />
                        </Col>
                    ))}
                </Row>
                <Div className="result-area">
                    <Typography className="text-top">
                        Based on these automated checks
                    </Typography>
                    <Typography className="text-mid">
                        Your score is
                    </Typography>
                    <Typography className="text-bottom">
                        {score?.scoreScan}
                    </Typography>
                    <Button type="primary" className="button-back" onClick={onClickBack}>Back</Button>
                    <Button type="primary" className="button-next" onClick={onClickNext}>Next</Button>
                </Div>
            </ResultStyled>
        </Spin>
    )
}

const ResultStyled = styled(Div)(({ }) => ({
    '& .title-result': {
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '28px',
        textAlign: 'left',
    },
    '& .result-area': {
        background: '#F6FFED',
        border: '#B7EB8F 1px solid',
        marginTop: '16px',
        textAlign: 'center',
        padding: '16px 8px',
        '& .text-top': {
            fontfamily: 'Roboto',
            fontsize: '14px',
            fontweight: '400',
            lineheight: '22px',
            textalign: 'center',
            marginBottom: '8px',
        },
        '& .text-mid': {
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontweight: '500',
            lineHeight: '28px',
            textAlign: 'center',
            marginBottom: '8px',
        },
        '& .text-bottom': {
            fontFamily: 'Roboto',
            fontSize: '38px',
            fontWeight: '500',
            lineHeight: '46px',
            textAlign: 'center',
            color: '#52C41A',
            marginBottom: '8px',
        },
        '& .button-next': {
            borderRadius: '0',
        },
        '& .button-back': {
            borderRadius: '0',
            border: "1px solid",
            background: "#fff",
            color: "#000",
            marginRight: "10px",
            "&:hover": {
                background: "#52C41A",
                border: "1px solid #52C41A",
            }
        },
    }
}));