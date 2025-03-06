import { AxiosResponse } from "axios";
import { postRequest } from ".";
import { LoginModel, RegisterModel } from "../models/AuthModel";
import { FailResponseModel, SuccessResponseModel } from "../models/ResponseModel";


// Call the login API and return the result after each call
export const loginService = (loginModel: LoginModel): Promise<AxiosResponse<SuccessResponseModel | FailResponseModel>> => {
    const data = { username: loginModel.username, password: loginModel.password };
  
    return postRequest(
        `auth/login`,
        data
    );
}
export const registerService = (registerModel: RegisterModel): Promise<AxiosResponse<SuccessResponseModel | FailResponseModel>> => {
    const data = { username: registerModel.username, fullName: registerModel.fullName, dateBirth: registerModel.dateBirth, email: registerModel.email, phone: registerModel.phone, roles: registerModel.roles };
    return postRequest(
        `auth/register`,
        data
    );
}