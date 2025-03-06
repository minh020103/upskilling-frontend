import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { axiosInstance } from ".";
import { TokenDeviceSave } from "../models/request/TokenDevice";
import { PageImpl } from "../models/PaginationModel";
import { FailResponseModel, ResponseModel, SuccessResponseModel } from "../models/ResponseModel";
import { UpdateUserModel, UserInformationModel, UserReviewModel, UserInformationProps } from "../models/UserModel";



export const getUserByToken = (tokenJwt: string): Promise<AxiosResponse<UserInformationModel | FailResponseModel>> => {
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res = axiosInstance.get(
        `user/getuser`,
        config
    );
    return res;
}
export const UpdateUserService = (updateUserModel: UpdateUserModel, tokenJwt: string): Promise<AxiosResponse<UpdateUserModel | FailResponseModel>> => {
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res = axiosInstance.patch(
        `user/update`,
        updateUserModel,
        config
    );
    return res;
}
export const saveTokenUserService = (tokenDeviceSave: TokenDeviceSave): Promise<AxiosResponse<string | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const data = { token: tokenDeviceSave.token };
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res = axiosInstance.post(
        `user/token-device/save`,
        data,
        config
    );
    return res;
}
export const getUserReview = (key: string): Promise<AxiosResponse<UserReviewModel | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res = axiosInstance.get(
        `user/find-review?key=${key}`,
        config
    );
    return res;
}
export const getAllUser = (pageNumber: number, pageSize: number): Promise<AxiosResponse<PageImpl<UserInformationProps> | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<PageImpl<UserInformationProps> | FailResponseModel>> = axiosInstance.get(
        `/users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        config
    );
    return res;
}
export const searchUser = (pageNumber: number, pageSize: number, keyword: string): Promise<AxiosResponse<PageImpl<UserInformationProps> | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<PageImpl<UserInformationProps> | FailResponseModel>> = axiosInstance.get(
        `/users?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}`,
        config
    );
    return res;
}
export const getDetailUser = (id: number): Promise<AxiosResponse<UserInformationProps | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    const res: Promise<AxiosResponse<UserInformationProps | FailResponseModel>> = axiosInstance.get(
        `/users/${id}`,
        config
    );
    return res;
}

export const deleteTokenDeviceService = (token: string): Promise<AxiosResponse<string | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt
        }
    }
    return axiosInstance.delete(
        `/user/token-device/delete?tokenDeviceDelete=${token}`,
        config
    );
}