export interface LoginModel {
    username: string;
    password: string;
}
export interface RegisterModel {
    username: string;
    fullName: string;
    dateBirth: string;
    email: string;
    phone: string;
    roles: number[];
}