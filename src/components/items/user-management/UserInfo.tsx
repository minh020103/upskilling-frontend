import { Avatar, Col, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components"
import { Div } from "../../styles/Div"

export const UserInfo: React.FC<{ image: string, name: string, position: string, size: number, distance: number }> = ({ image, name, position, size, distance }) => {
    return (
        <UserInfoStyled>
            <Col className="area" style={{ marginRight: distance + 'px' }}>
                <Avatar className="avatar" src={image} style={{ width: size + 'px', height: size + 'px' }} />
            </Col>
            <Div className="area">
                <Col>
                    <Typography className="name">
                        {name}
                    </Typography>
                    <Div className="position">{position}</Div>
                </Col>
            </Div>
        </UserInfoStyled>
    )
}
const UserInfoStyled = styled(Row)(({ }) => ({
    '& .area': {
        display: 'flex',
        alignItems: 'center',
    },
    '& .name': {
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '28px',
        textAlign: 'left',
    },
    '& .position': {
        display: 'inline-block',
        fontFamily: 'Roboto',
        fontSize: '12px',
        fontWeight: '400',
        lineHeight: '20px',
        textAlign: 'left',
        padding: '0 8px',
        gap: '3px',
        borderRadius: '2px',
        border: '1px solid #FFD591',
        opacity: '0px',
        background: '#FFF7E6',
        color: '#FA8C16'
    },
}));