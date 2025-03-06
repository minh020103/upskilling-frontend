import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { axiosInstance } from ".";
import { FailResponseModel } from "../models/ResponseModel";

export const downloadFile = (pathFile: string): Promise<AxiosResponse<any | FailResponseModel>> => {
    const tokenJwt = Cookies.get('tokenJwt');
    const config = {
        headers: {
            Authorization: "Bearer " + tokenJwt,
        }
    }
    const encodedPathFile = encodeURIComponent(pathFile);
    const res = axiosInstance.get(
        `file/dowload?pathFile=${encodedPathFile}`,
        config
    );
    return res;
}