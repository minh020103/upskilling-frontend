import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Challenge } from "../../../../models/ChallengeModel";
import { FailResponseModel } from "../../../../models/ResponseModel";
import { getDetailChallengeService } from "../../../../services/ChallengeService";
import { notifyErr } from "../../../../utils/notify";
import { ContentCodeDeverlopment } from "../../../views/dashboard/ContentCodeDeverlopment";
import { TopContentSearch } from "../../../views/TopContentSearch";
const initChallenge: Challenge = {
    id: 0,
    bonusPoints: [],
    description: "",
    duration: 0,
    evaluationCriteria: [],
    guidelines: [],
    image: "",
    requirements: [],
    starterCode: [],
    title: ""
}

export const CodeDeverlopment = () => {
    const { id } = useParams<{ id: string }>();
    const [challenge, setChallenge] = useState<Challenge>(initChallenge);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        getDetailChallenge();
    }, [])

    const getDetailChallenge = async () => {
        setLoading(true);
        try {
            const resp = await getDetailChallengeService(Number(id));
            if (resp.status == 200) {
                const success = resp.data as Challenge;
                setChallenge(success);
            }
            else {
                const fail = resp.data as FailResponseModel;
                notifyErr(fail.errorMessage);
            }
        }
        catch (err) {
            alert(err);
        }
        setLoading(false);
    }
    return (
        <Spin spinning={loading}>
            {!loading && <>
                <TopContentSearch
                    routes={["Dashboard"]}
                    title={challenge.title}
                    onClickSearch={null}
                    routeActive={challenge.title + ""}
                    className={null}
                    dataLevel={[]}
                    dataTime={[]}
                    onSelectedLevel={null}
                    onSelectedTime={null}
                />
                <ContentCodeDeverlopment challenge={challenge} />
            </>}
        </Spin>
    )
}