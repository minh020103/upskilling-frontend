import { Challenge } from "../ChallengeModel";

export interface ChallengeStartInfoResponse {
    id: number,
    userId: number,
    challengeResponse: Challenge,
    status: string,
    createdAt: string,
    percent: number
}
export interface UploadFileSuccessResponce {
    fileSource: string,
    fileText: string,
}
export interface ScanFileSourceResponse {
    projectKey: string
}
export interface ChallengeScanStatus {
    id: number,
    summaries: ItemResult[],
    statusAnalysis: string
}
export interface ItemResult{
    title: string,
    unit: string,
    value: string,
    rating: string
}