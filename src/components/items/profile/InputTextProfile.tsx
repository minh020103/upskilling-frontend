import { Input, Layout, Skeleton } from "antd";
import styled from "styled-components";
import { InputTextProps } from "../../../models/profile";

export const InputTextProfile = (props: InputTextProps) => {
    const { label, loading, value, disabled, onChange, name } = props;

    return (
        <InputTextStyled>
            <label className="label-custom" htmlFor={label}>{label}
            </label>
            {loading ?
                <Skeleton className="loading-custom" />
                :
                <Input type={'text'} disabled={disabled} className="input-text-custom" id={label} value={value} onChange={onChange} name={name} />
            }
        </InputTextStyled>
    )
}
const InputTextStyled = styled(Layout)(({ }) => ({
    position: 'relative',
    marginBottom: '24px',
    '& .input-text-custom': {
        width: '100%',
        height: '32px',
        gap: '4px',
        borderRadius: '2px 0px 0px 0px',
        border: '1px 0px 0px 0px',
        opacity: '0px',
        padding: '0 12px',
    },
    '& .label-custom': {
        position: 'absolute',
        transform: 'translate(-100%, -50%)',
        top: '50%',
        paddingRight: '10px',
        whiteSpace: 'nowrap',
    },
    '& .loading-custom': {
        width: '100%',
        height: '40px',
    }
}));