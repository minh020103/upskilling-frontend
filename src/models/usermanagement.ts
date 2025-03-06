import { Challenge } from "./ChallengeModel";

export interface UserInformationProps {
    userId: number,
    totalChallenge: number | undefined,
    sumScorePeerReview?: number,
    sumScoreScan?: number,
    sumTotalScore:number | string,
    userInformation:UserInformation,
}

interface UserInformation{
    id: number;
    fullName: string;
    email: string;
    phone: string;
    avatar: string,
    position: string;
    company: string;
    address: string;
    createdAt: string;
}

export interface ContentUserProps {
    user: UserInformationProps;
    active?:boolean;
}

export interface ContentChallengeCompletedProps{
    userId:number;
    challenge:Challenge;
    status:string;
    totalScore:number;
    completedDate:number;
    id: number
}