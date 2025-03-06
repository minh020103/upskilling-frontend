import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserChallengeStart } from "../../../../models/dashboard";
import { getDataChallengeStartService } from "../../../../services/ChallengeService";
import { ContentInitialEvaluation } from "../../../views/dashboard/ContentInitialEvaluation";
import { TopContentSearch } from "../../../views/TopContentSearch";
export const InitialEvaluation = () => {
    const { userChallengeStartId } = useParams<string>();
    const [data, setData] = useState<UserChallengeStart | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(1);
    const getDataChallengeCompleted = async () => {
        setLoading(true);
        try {
            const res = await getDataChallengeStartService(Number(userChallengeStartId));
            if (res.status == 200) {
                const success = res.data as UserChallengeStart;
                setData(success);
            }
        } catch (error) {

        }

        setLoading(false);
    }
    useEffect(() => {
        getDataChallengeCompleted();
    }, [])
    return (
        <>
            <Spin spinning={loading}>
                <TopContentSearch
                    routes={["Dashboard", "Available challenge"]}
                    title={data?.challenge.title}
                    onClickSearch={null}
                    routeActive={data?.challenge.title}
                    className={null}
                    dataLevel={null}
                    dataTime={null}
                    onSelectedLevel={null}
                    onSelectedTime={null}
                />
            </Spin>
            <ContentInitialEvaluation />
        </>
    )
}