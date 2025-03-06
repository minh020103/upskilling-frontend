import { Skeleton, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Challenge } from "../../../models/ChallengeModel";
import { PageImpl } from "../../../models/PaginationModel";
import { FailResponseModel } from "../../../models/ResponseModel";
import { getAvailableChallengesService } from "../../../services/ChallengeService";
import { notifyErr } from "../../../utils/notify";
import { ItemAvailableChallenges } from "../../items/dashboard/ItemAvailableChallenges";
import { ChallengeAndViewAllCustom } from "../../styles/dashboard";
import { ChallengeAndViewAll } from "../ChallengeAndViewAll";
const itemNumberInPage = 4;
export const TopContentChallenge = () => {
    const [currenPage, setCurrenPage] = useState<number>(1);
    const navigate = useNavigate();
    const [data, setData] = useState<PageImpl<Challenge>>();
    const [loading, setLoading] = useState<boolean>(true);
    const onClickLeft = () => {
        if (currenPage > 1) {
            setCurrenPage(currenPage - 1);
        }
        else {
            notifyErr("This is the first page");
        }
    }
    const onClickRight = () => {
        if (data && data.totalPages > currenPage) {
            setCurrenPage(currenPage + 1);
        }
        else {
            notifyErr("This is the last page");
        }
    }
    useEffect(() => {
        getData();
    }, [currenPage])
    const getData = async () => {
        setLoading(true);
        try {
            const response = await getAvailableChallengesService(currenPage - 1, itemNumberInPage);
            const { status, data } = response;
            if (status == 200) {
                const success = data as PageImpl<Challenge>;
                setData(success);
            } else {
                const fail = data as FailResponseModel;
                alert(fail.errorMessage);
            }

        } catch (error) {
            alert(error);
        }
        setLoading(false);
    }
    const onClickViewAll = () => {
        navigate('/user/dashboard/available-challenges');
    }
    return (
        <>
            {!loading ?
                data && data.totalElements > 0 ?
                    <ChallengeAndViewAllCustom
                        className={null}
                        title="Available challenges"
                        description={null}
                        onClickLeft={onClickLeft}
                        onClickRight={onClickRight}
                        onClickViewAll={onClickViewAll}
                        loadMoreActive={data.totalElements > itemNumberInPage ? "active" : "in-active"}
                        render={
                            data?.content.map(item => (
                                <ItemAvailableChallenges
                                    className={"custom-available-challenge-top"}
                                    imgItem={item.image}
                                    title={item.title}
                                    description={item.description}
                                    time={item.duration}
                                    avatars={[]}
                                    id={item.id} />
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
