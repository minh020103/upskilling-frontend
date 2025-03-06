import { Col, Typography } from "antd";
import styled from "styled-components";
import { Div } from "../../styles/Div";

export const ItemStrengths = (props: ItemStrengthsProps) => {
    const { title, description } = props;
    return (
        <ItemStrengthsStyled>
            <Col>
                <Typography className="title">
                    {title}
                </Typography>
                <Typography className="description">
                    {description}
                </Typography>
            </Col>
        </ItemStrengthsStyled>
    )
}
interface ItemStrengthsProps {
    title: string,
    description: string,
}
const ItemStrengthsStyled = styled(Div)(({ }) => ({
    padding: '24px',
    gap: '8px',
    border: '1px solid #F0F0F0',
    opacity: '0px',
    marginBottom: '8px',
    '& .title': {
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '24px',
        textAlign: 'left',
    },
    '& .description': {
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
        textAlign: 'left',
        whiteSpace: 'nowrap;',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
}));