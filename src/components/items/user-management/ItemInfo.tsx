import { Typography } from "antd";
import React from "react";
import styled from "styled-components"
import { Div } from "../../styles/Div"

export const ItemInfo: React.FC<{ title: string, value: string }> = ({ title, value }) => {
    return (
        <ItemInfoStyled>
            <Typography className="title">{title}</Typography>
            <Typography className="value">{value}</Typography>
        </ItemInfoStyled>
    )
}
const ItemInfoStyled = styled(Div)(({ }) => ({
    marginBottom: '16px',
    '& .title': {
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
        textAlign: 'left',
        color: '#00000073'
    },
    '& .value': {
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
        textAlign: 'left',
    },
}));