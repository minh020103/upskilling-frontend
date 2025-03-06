import { Typography } from "antd";
import styled from "styled-components";
import { Div } from "../../styles/Div";

const ItemInformationStyled = styled(Div)(({ }) => ({
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
        fontSize: '24px',
        fontWeight: '400',
        lineHeight: '28px',
        textAlign: 'left',
    }
}));
export const ItemInformation: React.FC<{ title: string, value: string, color: string, className: string | null }> = ({ title, value, color, className }) => {
    return (
        <ItemInformationStyled className={className ? className : ""}>
            < Typography className="title">
                {title}
            </Typography >
            <Typography className="value" style={{ color: color }}>
                {value}
            </Typography>
        </ItemInformationStyled>
    )
}