import { Spin, Steps } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserChallengeStart } from "../../../models/dashboard";
import { getDataChallengeStartService } from "../../../services/ChallengeService";
import { LineStyled } from "../../styles/dashboard";
import { Div } from "../../styles/Div"
import { InitialEvaluationBottom } from "./InitialEvaluationBottom";

export const ContentInitialEvaluation = () => {
    const { userChallengeStartId } = useParams();
    const [data, setData] = useState<UserChallengeStart | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(1);
    const getDataChallengeCompleted = async () => {
        setLoading(true);
        try {
            const res = await getDataChallengeStartService(Number(userChallengeStartId));
            if (res.status == 200) {
                const success = res.data as UserChallengeStart;
                if (success.status != "CHALLENGE_START_STATUS_PROGRESS") {
                    setProgress(4);
                }
                else {
                    setProgress(0);
                }
                if (success.status == "CHALLENGE_START_STATUS_SCAN_COMPLTETED") {
                    setProgress(1);
                }
            }
        } catch (error) {

        }

        setLoading(false);
    }
    useEffect(() => {
        getDataChallengeCompleted();
    }, [])
    return (
        <ContentInitialEvaluationStyled>
            <Steps className="custom-step"
                current={progress}
                items={[
                    {
                        title: 'Submitted'
                    },
                    {
                        title: 'Initial Evaluation'
                    },
                    {
                        title: 'Peer Review'
                    },
                    {
                        title: 'Final Evaluation'
                    },
                ]}
            />
            <Spin spinning={loading}>
                <LineStyled />
                {userChallengeStartId &&
                    <InitialEvaluationBottom
                        progress={progress}
                        setProgress={setProgress}
                        userChallengeStartId={Number(userChallengeStartId)} />
                }
            </Spin>
        </ContentInitialEvaluationStyled>
    )
}
const ContentInitialEvaluationStyled = styled(Div)(({ }) => ({
    margin: '24px',
    background: '#fff',
    padding: '24px',
    '& .custom-step': {
        padding: '16px 0px 16px 0px',
    },

}));