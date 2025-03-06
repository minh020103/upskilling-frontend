import { RcFile } from "antd/es/upload";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { axiosInstance } from ".";
import { Challenge } from "../models/ChallengeModel";
import { FeedBack, UserChallengeStart } from "../models/dashboard";
import { PageImpl } from "../models/PaginationModel";
import { ContentAnalysisSkill, DataChartBySkill } from "../models/performance-analysis";
import { ChallengeScanStatus, ChallengeStartInfoResponse, ScanFileSourceResponse, UploadFileSuccessResponce } from "../models/response/code-development";
import { FailResponseModel } from "../models/ResponseModel";
import { ContentPeerReviewInfo, PeerReviewInfo } from "../models/review";
import { ContentChallengeCompletedProps } from "../models/usermanagement";

export const getAvailableChallengesService = (pageNumber: number, pageSize: number): Promise<AxiosResponse<PageImpl<Challenge> | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<PageImpl<Challenge> | FailResponseModel>> = axiosInstance.get(
        `/challenge/search?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        config
    );
    return res;
}
export const getAvailableChallengesSearchService = (pageNumber: number, pageSize: number, keyWord: string, tag: string, duration: string): Promise<AxiosResponse<PageImpl<Challenge> | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    console.log(tag);
    
    let url = `/challenge/search?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyWord}`;
    if (tag) {
        url = `/challenge/search?pageNumber=${pageNumber}&pageSize=${pageSize}&tagName=${tag}`;
    }
    if(duration){
        url = `/challenge/search?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyWord}&duration=${duration}`;
    }
    if(tag && duration){
        url = `/challenge/search?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyWord}&tagName=${tag}&duration=${duration}`;
    }
    const res: Promise<AxiosResponse<PageImpl<Challenge> | FailResponseModel>> = axiosInstance.get(
        url,
        config
    );
    return res;
}
export const getDetailChallengeService = (id: number): Promise<AxiosResponse<Challenge | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<Challenge | FailResponseModel>> = axiosInstance.get(
        `/challenge/${id}`,
        config
    );
    return res;
}
export const getChallengeLevelService = (): Promise<AxiosResponse<string[] | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<string[] | FailResponseModel>> = axiosInstance.get(
        `challenge/levels`,
        config
    );
    return res;
}
export const getChallengeTimeService = (): Promise<AxiosResponse<string[] | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<string[] | FailResponseModel>> = axiosInstance.get(
        `challenge/durations`,
        config
    );
    return res;
}
export const startChallengeService = (challengeId: number): Promise<AxiosResponse<ChallengeStartInfoResponse | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<ChallengeStartInfoResponse | FailResponseModel>> = axiosInstance.get(
        `challenge/start-challenge?challengeId=${challengeId}`,
        config
    );
    return res;
}
export const getChallengeProgressByUserIdService = (pageNumber: number, pageSize: number): Promise<AxiosResponse<PageImpl<ChallengeStartInfoResponse> | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<PageImpl<ChallengeStartInfoResponse> | FailResponseModel>> = axiosInstance.get(
        `challenge/challenge-progress?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        config
    );
    return res;
}
export const uploadFileService = (id: number, sourceCode: RcFile, textFile: RcFile): Promise<AxiosResponse<UploadFileSuccessResponce | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const formData = new FormData();
    formData.append("sourceCode", sourceCode);
    formData.append("textFile", textFile);
    formData.append("id", id + "");
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt,
            'Content-Type': 'multipart/form-data'
        }
    }
    const res: Promise<AxiosResponse<UploadFileSuccessResponce | FailResponseModel>> = axiosInstance.post(
        `challenge/upload`,
        formData,
        config

    );
    return res;
}

export const scanFileSourceService = (id: number, sourceCode: string): Promise<AxiosResponse<ScanFileSourceResponse | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const data = { userChallengeStartId: id, pathFile: sourceCode };
    const res: Promise<AxiosResponse<ScanFileSourceResponse | FailResponseModel>> = axiosInstance.post(
        `challenge/scan`,
        data,
        config
    );
    return res;
}

export const getDataFromSonarQService = (id: number): Promise<AxiosResponse<ChallengeScanStatus | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    // const data = { userChallengeStartId: id };
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        },
        params: {
            userChallengeStartId: id
        }
    }
    const res: Promise<AxiosResponse<ChallengeScanStatus | FailResponseModel>> = axiosInstance.get(
        `challenge/status`,
        config
    );
    return res;
}
export const sendNotificationPeerReviewService = (userIds: number[], userChallengeStartId: number): Promise<AxiosResponse<string | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const data = {
        userIds: userIds,
        userChallengeStartId: userChallengeStartId
    }
    const res = axiosInstance.post(
        `challenge/peer-review`,
        data,
        config
    );
    return res;
}
export const getDataPeerReviewService = (peerReviewId: number): Promise<AxiosResponse<PeerReviewInfo | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<PeerReviewInfo | FailResponseModel>> = axiosInstance.get(
        `challenge/peer-review/info?peerReviewId=${peerReviewId}`,
        config
    );
    return res;
}
export const sendDataFeedBackService = (peerReviewId: number, feedBack: string, file: RcFile | null, score: number): Promise<AxiosResponse<any | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const formData = new FormData();
    if (file != null) {
        formData.append("fileFeedBack", file);        
    }
    formData.append("feedBack", feedBack + "");
    formData.append("id", peerReviewId + "");
    formData.append("scorePeerReview", score + "");
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt,
            'Content-Type': 'multipart/form-data'
        }
    }
    const res = axiosInstance.post(
        `challenge/peer-review/feed-back`,
        formData,
        config

    );
    return res;
}

export const getDataChallengeCompletedService = (userChallengeStartId: number): Promise<AxiosResponse<UserChallengeStart | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res = axiosInstance.get(
        `challenge/completed/info?userChallengeStartId=${userChallengeStartId}`,
        config
    );
    return res;
}

export const getFeedBackByPeerReviewService = (userChallengeStartId: number, pageNumber: number, pageSize: number): Promise<AxiosResponse<PageImpl<FeedBack> | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res = axiosInstance.get(
        `challenge/completed/info/feed-back?userChallengeStartId=${userChallengeStartId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        config
    );
    return res;
}
export const getChallengeCompletedByUser = (pageNumber: number, pageSize: number, userId: number): Promise<AxiosResponse<PageImpl<ContentChallengeCompletedProps> | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<PageImpl<ContentChallengeCompletedProps> | FailResponseModel>> = axiosInstance.get(
        `/challenge/completed?pageNumber=${pageNumber}&pageSize=${pageSize}&userId=${userId}`,
        config
    );
    return res;
}
export const getChallengeCompleted = (pageNumber: number, pageSize: number): Promise<AxiosResponse<PageImpl<ContentChallengeCompletedProps> | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<PageImpl<ContentChallengeCompletedProps> | FailResponseModel>> = axiosInstance.get(
        `/challenge/user/completed?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        config
    );
    return res;
}

export const getDataChallengeStartService = (userChallengeStartId: number): Promise<AxiosResponse<UserChallengeStart | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res = axiosInstance.get(
        `challenge/user-challenge-start/info?userChallengeStartId=${userChallengeStartId}`,
        config
    );
    return res;
}
export const getDataChartByUserService = (userId: number, date: string): Promise<AxiosResponse<DataChartBySkill[] | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res = axiosInstance.get(
        `challenge/info-report-user/year?userId=${userId}&date=${date}`,
        config
    );
    return res;
}
export const getDataChartMyUserService = (date: string): Promise<AxiosResponse<DataChartBySkill[] | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res = axiosInstance.get(
        `challenge/info-report-my-user/year?date=${date}`,
        config
    );
    return res;
}
export const getAllDataPeerReviewServiceByUserId = (pageNumber: number,pageSize: number): Promise<AxiosResponse<PageImpl<ContentPeerReviewInfo> | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<PageImpl<ContentPeerReviewInfo> | FailResponseModel>> = axiosInstance.get(
        `challenge/peerReview?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        config
    );
    return res;
}

export const markNotification = (id: number): Promise<AxiosResponse<void | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<void | FailResponseModel>> = axiosInstance.patch(
        `challenge/markAsRead?id=${id}`,
        null, 
        config
    );
    return res;
}

export const countNotification = (): Promise<AxiosResponse<Number | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<Number | FailResponseModel>> = axiosInstance.get(
        `challenge/countPeer`,
        config
    );
    return res;
}

export const analysisSkill = (): Promise<AxiosResponse<ContentAnalysisSkill | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<ContentAnalysisSkill | FailResponseModel>> = axiosInstance.post(
        `challenge/generateAnalysis`,
        {},
        config
    );
    return res;
}
export const getScoreScanService = (userChallengeStartId: number) => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<{scoreScan: number} | FailResponseModel>> = axiosInstance.post(
        `challenge/generateScore?userChallengeStartId=${userChallengeStartId}`,
        {},
        config
    );
    return res;
}
export const getAvailableChallengesSuggestService = (pageNumber: number, pageSize: number): Promise<AxiosResponse<PageImpl<Challenge> | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<PageImpl<Challenge> | FailResponseModel>> = axiosInstance.get(
        `/challenge/challenge-for-user?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        config
    );
    return res;
}