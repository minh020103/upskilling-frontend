export interface ResponseModel {
    status: number;
    data: Object;
}
export interface SuccessResponseModel {
    message: string;
    result: Object;
}
export interface FailResponseModel {
    errorCode: string;
    errorMessage: string;
}