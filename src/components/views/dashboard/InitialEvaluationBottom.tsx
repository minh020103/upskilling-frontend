import { InitialEvaluationBottomProps } from "../../../models/dashboard";
import { FeedBack } from "./FeedBack";
import { PeerReview } from "./PeerReview";
import { Result } from "./Result";
import { ReUploadFile } from "./ReUploadFile";

export const InitialEvaluationBottom = (props: InitialEvaluationBottomProps) => {
    const { progress, setProgress, userChallengeStartId } = props;
    return (
        <>
            {
                progress == 0 ?
                    <ReUploadFile
                    setProgress={setProgress}
                    userChallengeStartId={userChallengeStartId}/>
                    : progress == 1 ?
                        <Result
                            setProgress={setProgress}
                            userChallengeStartId={userChallengeStartId} />
                        :
                        progress == 2 ?
                            <PeerReview
                                setProgress={setProgress}
                                userChallengeStartId={userChallengeStartId} />
                            :
                            <FeedBack />
            }
        </>
    )
}
