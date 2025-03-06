import { UserInformationModel } from "./UserModel";

export interface DataFormProps {
    loading: boolean;
    data: UserInformationModel;
}
export interface InputTextProps {
    label: string;
    loading: boolean;
    value: string;
    disabled: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    name: string;
}
export interface TopContentSearchProps {
    routes?: string[] | null,
    routeActive?: string | null,
    title?: string,
    onClickSearch?: ((key: string) => void) | null,
    onSelectedLevel?: ((value: string) => void) | null,
    onSelectedTime?: ((value: string) => void) | null,
    className?: string | null,
    dataLevel?: string[] | null,
    dataTime?: string[] | null
}