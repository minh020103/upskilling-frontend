import { Typography } from "antd";
import styled from "styled-components";
import { ItemtextInLineProps } from "../../../models/dashboard";

const TextContentStyled = styled(Typography)(({ }) => ({
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '22px',
    textAlign: 'left',
}));
export const ItemtextInLine = (props: ItemtextInLineProps) => {
    const { index, content } = props;
    return (
        <TextContentStyled>
            {index? `${index} . `: ""}{content}
        </TextContentStyled>
    )
}
