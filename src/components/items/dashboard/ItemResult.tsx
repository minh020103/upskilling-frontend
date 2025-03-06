import { Flex, Progress, Row, Typography } from "antd";
import styled from "styled-components"
import { ItemResultProps } from "../../../models/dashboard";
import { Div } from "../../styles/Div"
const { Text } = Typography;
export const ItemResult = (props: ItemResultProps) => {
    const { title, value, unit, rating } = props;
    return (
        <ItemResultStyled>
            <Flex className="flex-two-block">
                <Text className="title">{title}</Text>
                {rating ?
                    <Div className="progress-null">
                        {rating}
                    </Div>
                    :
                    <Progress strokeLinecap="butt" strokeColor={"#58afff"} strokeWidth={25} type="circle" percent={value} size={28} format={() => null} />
                }
            </Flex>
            <Row className="progress-area">
                <Text className="completion-progress">{value} {!rating?"%": ""}</Text>
                <Text className="unit">{unit}</Text>
            </Row>
        </ItemResultStyled>
    )
}
const ItemResultStyled = styled(Div)(({ }) => ({
    padding: '8px 16px 8px 16px',
    gap: '16px',
    borderRadius: '2px 0px 0px 0px',
    border: '1px solid #0000000F',
    opacity: '0px',
    marginRight: '8px',
    marginTop: '8px',
    '& .flex-two-block': {
        justifyContent: 'space-between',
        '& .progress-null': {
            width: '28px',
            height: '28px',
            padding: '1px 8px 1px 8px',
            gap: '3px',
            borderRadius: '2px 0px 0px 0px',
            border: '1px solid #B7EB8F',
            opacity: '0px',
            background: '#F6FFED',
            display: 'flex',
            alignItems: 'center',
        },
    },
    '& .title': {
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '24px',
        textAlign: 'left',
    },
    '& .progress-area': {
        display: 'flex',
        alignItems: 'center',
        marginTop: '16px',
        '& .completion-progress': {
            fontFamily: 'Roboto',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
            textAlign: 'left',
            marginRight: '5px',
        },
        '& .unit': {
            //styleName: Body/regular;
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '22px',
            textAlign: 'left',
            color: '#00000073',
        }
    },
}));
