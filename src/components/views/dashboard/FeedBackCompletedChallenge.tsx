import { Spin, Typography } from "antd"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { FeedBack } from "../../../models/dashboard"
import { PageImpl } from "../../../models/PaginationModel"
import { getFeedBackByPeerReviewService } from "../../../services/ChallengeService"
import { PageCustom } from "../../items/custom-item/PageCustom"
import { ItemCommentFeedBack } from "../../items/dashboard/ItemCommentFeedBack"
import { Div } from "../../styles/Div"
const itemInpage = 3;
export const FeedBackCompletedChallenge = () => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [data, setData] = useState<PageImpl<FeedBack>>();
    const [loading, setLoading] = useState<boolean>(true);
    const getFeedBackByPeerReview = async () => {
        setLoading(true);
        try {
            const res = await getFeedBackByPeerReviewService(Number(id), currentPage - 1, itemInpage);
            if (res.status == 200) {
                setData(res.data as PageImpl<FeedBack>)
            }
        } catch (error) {

        }
        setLoading(false);
    }
    const onPageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
    }
    useEffect(() => {
        getFeedBackByPeerReview();
    }, [currentPage])
    return (
        <Spin spinning={loading}>
            <FeedBackCompletedChallengeStyled>
                <Typography className="title">
                    Feedback ({data?.totalElements})
                </Typography>
                {data?.content.map((item) =>
                (
                    <ItemCommentFeedBack
                        user={item.user}
                        feedBack={item.feedBack}
                        file={item.file}
                        createdAt={item.createdAt}
                    />
                )
                )}

                {Number(data?.totalPages) > 1 ?
                    <PageCustom
                        total={Number(data?.totalElements)}
                        currentPage={currentPage}
                        itemNumberInPage={itemInpage}
                        onPageChange={onPageChange}
                    />
                    : <></>
                }
            </FeedBackCompletedChallengeStyled>
        </Spin>
    )
}
const FeedBackCompletedChallengeStyled = styled(Div)(({ }) => ({
    padding: '0 56px',
    '& .title': {
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        textAlign: 'left',
    },
}));