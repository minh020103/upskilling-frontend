import { Button, Col, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { FeedBack as FeedBackModel, UserChallengeStart } from "../../../models/dashboard";
import { PageImpl } from "../../../models/PaginationModel";
import { getDataChallengeCompletedService, getFeedBackByPeerReviewService } from "../../../services/ChallengeService";
import { totalScore } from "../../../utils/score";
import { fileName } from "../../../utils/string-handling";
import { ButtonCustom } from "../../items/custom-item/ButtonCustom";
import { PageCustom } from "../../items/custom-item/PageCustom";
import { ItemDownload } from "../../items/dashboard/ItemDownload";
import { Div } from "../../styles/Div"
const itemInpage = 3;
export const FeedBack = () => {
    const { userChallengeStartId } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataFeedBack, setDataFeedBack] = useState<PageImpl<FeedBackModel>>();
    const [loadingFeedBack, setLoadingFeedBack] = useState<boolean>(true);
    const [dataUserChallengeStart, setDataUserChallengeStart] = useState<UserChallengeStart | null>(null);
    const [loadingUserChallengeStart, setLoadingUserChallengeStart] = useState<boolean>(true);
    const getFeedBackByPeerReview = async () => {
        setLoadingFeedBack(true);
        try {
            const res = await getFeedBackByPeerReviewService(Number(userChallengeStartId), currentPage - 1, itemInpage);
            if (res.status == 200) {
                setDataFeedBack(res.data as PageImpl<FeedBackModel>)
            }
        } catch (error) {

        }
        setLoadingFeedBack(false);
    }
    const onPageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
    }
    useEffect(() => {
        getFeedBackByPeerReview();
        getDataChallengeCompleted();
    }, [currentPage])
    const getDataChallengeCompleted = async () => {
        setLoadingUserChallengeStart(true);
        try {
            const res = await getDataChallengeCompletedService(Number(userChallengeStartId));
            if (res.status == 200) {
                const success = res.data as UserChallengeStart;
                setDataUserChallengeStart(success);

            }
        } catch (error) {

        }

        setLoadingUserChallengeStart(false);
    }
    const onClickNext = () => {
        navigate('/user/leaderboard');
    }
    const onClicHome = () => {

    }
    return (
        <ResultStyled>
            <Typography className="title-result">Feedback from your peer</Typography>

            <Spin spinning={loadingFeedBack}>
                {dataFeedBack?.content.map((item) => (
                    <>
                        <Col>
                            <Typography className="title-mini">
                                Feedback from {item.user.fullName}
                            </Typography>
                            <Typography className="content-feed-back">
                                {item.feedBack}
                            </Typography>
                        </Col>
                        {item.file &&
                            <Col>
                                <Typography className="title-mini">
                                    Upload files from {item.user.fullName}
                                </Typography>
                                <Row className="download-area">
                                    <ItemDownload
                                        link={item.file}
                                        textButton="Download"
                                        orientation="horizontal"
                                    />
                                </Row>
                            </Col>
                        }
                    </>
                ))}
                {Number(dataFeedBack?.totalPages) > 1 ?
                    <PageCustom
                        total={Number(dataFeedBack?.totalElements)}
                        currentPage={currentPage}
                        itemNumberInPage={itemInpage}
                        onPageChange={onPageChange}
                    />
                    :
                    <></>
                }
                {!dataFeedBack &&
                    <Div className="not-review">
                        <Typography className="title-mini">
                            Not reviewed yet
                        </Typography>
                        <ButtonCustom type="primary" className="button-home" onClickButton={onClicHome} label="Go to Home" />
                    </Div>
                }

            </Spin>
            <Spin spinning={loadingUserChallengeStart}>
                {
                    dataUserChallengeStart && dataFeedBack &&
                    <Div className="result-area">
                        <Typography className="text-top">
                            Based on automated checks and your peer’s review
                        </Typography>
                        <Typography className="text-mid">
                            Your score is
                        </Typography>
                        <Typography className="text-bottom">
                            {totalScore(dataUserChallengeStart.scoreScan, dataUserChallengeStart.scorePeerReview)}
                        </Typography>
                        <Button type="primary" className="button-next" onClick={onClickNext}>Go to Leaderboard</Button>
                    </Div>
                }
            </Spin>
        </ResultStyled >
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
    '& .content-feed-back': {
        padding: '8px 16px 8px 16px',
        gap: '0px',
        borderRadius: '2px 0px 0px 0px',
        border: '1px #D9D9D9 solid',
        opacity: '0px',
        marginBottom: '10px',
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
        }
    },
    '& .not-review': {
        textAlign: 'center',
        '& .title-mini': {
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontweight: '500',
            lineHeight: '28px',
            textAlign: 'center',
            marginBottom: '8px',
        }
    }
}));