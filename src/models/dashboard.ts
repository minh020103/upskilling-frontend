import { RcFile } from "antd/es/upload";
import { AvatarModel, Challenge } from "./ChallengeModel";
import { UserInformationModel } from "./UserModel";

export interface ItemAvailableChallengesProps {
    imgItem: string,
    title: string,
    description: string,
    time: number,
    avatars: AvatarModel[],
    id: number
    className: string | null,
}
export interface ItemYourProcessProps {
    id: number
    imgItem: string,
    title: string,
    description: string,
    progress: number,
    status: string,
}
export interface ItemtextInLineProps {
    index: number | null,
    content: string,
}
export interface ContentNameChallengeProps {
    id: number,
    active: boolean,
}
export interface ContentRightCodeDeverlopmentProps {
    setUserChallengeStartId: (id: number) => void,
    challenge: Challenge,
    onClickSubmit: () => void,
    onClickQuit: () => void
}
export interface ContentLeftCodeDeverlopmentProps {
    challenge: Challenge,
    onFileSelectSource: (file: RcFile | null) => void,
    onFileSelectText: (file: RcFile | null) => void
}
export interface ItemResultProps {
    title: string,
    unit: string,
    value: number,
    rating: string | null
}
export interface ItemDownloadProps {
    link: string,
    textButton: string,
    orientation: "vertical" | "horizontal"
}
export interface InitialEvaluationBottomProps {
    progress?: number
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    userChallengeStartId: number
}
export interface UserChallengeStart {
    userId: number,
    challenge: Challenge,
    status: string,
    pathFileSource: string,
    pathFileText: string,
    scorePeerReview: number,
    scoreScan: number,
    updatedAt: string
}
export interface FeedBack {
    feedBack: string,
    file: string,
    createdAt: string,
    user: UserInformationModel
}
export interface UserChallengeStartDataProps {
    data: UserChallengeStart
}