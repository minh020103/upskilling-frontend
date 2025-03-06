import { Button } from "antd"
import React from "react";
import styled from "styled-components"

export const ButtonCustom:React.FC<{type?: "link" | "text" | "dashed" | "default" | "primary", label?: string, className?: string|null, onClickButton?: (()=>void)}> = ({type, label, className, onClickButton}) => {
    return (
        <ButtomCustomStyled type={type?type:"primary"} className={className?className:""} onClick={onClickButton&&onClickButton}>
            {label&&label}
        </ButtomCustomStyled>
    )
}
const ButtomCustomStyled = styled(Button)(({})=>({
    borderRadius: 0,
}));