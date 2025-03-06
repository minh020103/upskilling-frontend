import { Challenge } from "./ChallengeModel";
import { UserInformationModel } from "./UserModel";

export interface PeerReviewInfo {
    id: number,
    userChallengeStart: UserChallengeStart,
}
interface UserChallengeStart {
    challenge: Challenge,
    pathFileSource: String,
    pathFileText: String,
    userId: number
}
export interface ContentReviewProps {
    data: PeerReviewInfo | undefined
} 
export interface ReviewCodeItemLeftProps {
    data: PeerReviewInfo | undefined
}
export interface ContentPeerReviewInfo {
    id:number,
    user: UserInformationModel,
    userChallengeStart:UserChallengeStart,
    feedBack: string,
    file: string,
    score:number,
    status: string,
    createdAt:string,
}