export interface UserInformationModel {
    id: number;
    username: string;
    fullName: string;
    dateBirth: string;
    email: string;
    phone: string;
    status: string;
    avatar: string;
    roles: Role[];
    position: string;
    company: string;
    address: string;
}
export interface UserReviewModel {
    id: number;
    username: string;
    email: string;
}
export interface Role {
    id: number;
    role: string;
    createdAt: string;
    updatedAt: string;
}
export interface UpdateUserModel {
    fullName: string;
    email: string;
    phone: string;
    position: string;
    company: string;
    address: string;
}

export interface UserInformationProps {
    userId: number;
    totalChallenge: number;
    sumScorePeerReview?: number;
    sumScoreScan?: number;
    sumTotalScore:number;
    userInformation:UserInformation;
    userIsLogged?: boolean;
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