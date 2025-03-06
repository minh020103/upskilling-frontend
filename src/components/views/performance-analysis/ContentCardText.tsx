import { Col, Flex, Typography } from "antd";
import styled from "styled-components";
import { ContentCardTextProps } from "../../../models/performance-analysis";
import { ItemStrengths } from "../../items/performance-analysis/ItemStrengths";
import { Div } from "../../styles/Div";

export const ContentCardText = (props: ContentCardTextProps) => {
    const { title, items } = props;
    return (
        <ContentCardTextStyled>
            <Flex className="content-top">
                <Typography className="title">{title}</Typography>

            </Flex>
            {items.map(item => (
                <Col>
                    <ItemStrengths
                        title={item.title}
                        description={item.description} />
                </Col>
            ))}
        </ContentCardTextStyled>
    )
}
const ContentCardTextStyled = styled(Div)(({ }) => ({
    marginTop: '24px',
    padding: '24px',
    background: '#fff',
    '& .content-top': {
        justifyContent: 'space-between',
        '& .title': {
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '28px',
            textAlign: 'left',
            marginBottom: '24px',
        }
    },
    '& .content': {
        marginTop: '5px'
    }
}));
