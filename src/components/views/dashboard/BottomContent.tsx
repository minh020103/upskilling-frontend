import { Flex, Skeleton } from "antd";
import { parse } from "date-fns";
import { duration } from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PageImpl } from "../../../models/PaginationModel";
import { ChallengeStartInfoResponse } from "../../../models/response/code-development";
import { FailResponseModel } from "../../../models/ResponseModel";
import { getChallengeProgressByUserIdService } from "../../../services/ChallengeService";
import { notifyErr } from "../../../utils/notify";
import { ItemYourProcess } from "../../items/dashboard/ItemYourProcess";
import { ChallengeAndViewAllCustom } from "../../styles/dashboard";

const pageSize: number = 4;
export const BottomContent = () => {
    const [loading, setLoading] = useState<boolean>();
    const [data, setData] = useState<PageImpl<ChallengeStartInfoResponse>>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        getChallengeProgressByUserId();
    }, [currentPage])

    const getChallengeProgressByUserId = async () => {
        setLoading(true);
        try {
            const res = await getChallengeProgressByUserIdService(currentPage - 1, pageSize);
            const { data, status } = res;
            if (status == 200) {
                const success = data as PageImpl<ChallengeStartInfoResponse>;
                setData(success);
            }
            else {
                const fail = data as FailResponseModel;
            }
        } catch (error) {
            alert(error);
        }
        setLoading(false);
    }

    const onClickLeft = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        else {
            notifyErr("This is the first page");
        }
    }
    const onClickRight = () => {
        if (data && data.totalPages > currentPage) {
            setCurrentPage(currentPage + 1);
        }
        else {
            notifyErr("This is the last page");
        }
    }

    const onClickViewAll = () => {
    }

    return (
        <>
            {!loading ?
                data && data.totalElements > 0 ?
                    <ChallengeAndViewAllCustom
                        className={null}
                        title="You Progress"
                        description={null}
                        onClickLeft={onClickLeft}
                        onClickRight={onClickRight}
                        onClickViewAll={onClickViewAll}
                        loadMoreActive={data.totalElements > pageSize ? "active" : "in-active"}
                        render={
                            data?.content.map(item => (
                                <ItemYourProcess
                                    id={item.id}
                                    imgItem={item.challengeResponse.image}
                                    title={item.challengeResponse.title}
                                    description={item.challengeResponse.description}
                                    progress={item.percent}
                                    status={item.status} />
                            ))
                        } />
                    :
                    <></>
                :
                <Skeleton active style={{ height: "451px" }} />
            }
        </>
    )
}
const ContentLayout = styled(Flex)(({ }) => ({
    overflowX: 'auto',
    padding: '24px 24px 24px 0',
    display: 'flex',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
}));

const Div = styled.div`
`;
const BottomContentStyled = styled(Div)(({ }) => ({
    backgroundColor: '#FFFFFF',
    padding: '24px',
    width: '100%',
    margin: '24px 0',
    '& .ant-layout': {
        background: '#fff',
    },
    '& .content-title': {
        display: 'flex',
        marginRight: '24px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '32px',
    },
    '& .title': {
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '28px',
        textAlign: 'left',
    }
}));
