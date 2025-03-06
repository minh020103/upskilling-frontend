import { Row, Typography } from "antd";
import styled from "styled-components"
import { Div } from "../../styles/Div"
import { ChartArea } from "./ChartItem";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { ItemProgressionOverTimeProps } from "../../../models/performance-analysis";
export const ItemProgressionOverTime = (props: ItemProgressionOverTimeProps) => {
    const { title, numberBig, numberSmall, increase, data } = props;
    return (
        <ItemProgressionOverTimeStyled>
            <Row className="top-content">
                <Typography className="title">{title}</Typography>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_395_768)">
                        <path d="M8 0.754639C3.58214 0.754639 0 4.33678 0 8.75464C0 13.1725 3.58214 16.7546 8 16.7546C12.4179 16.7546 16 13.1725 16 8.75464C16 4.33678 12.4179 0.754639 8 0.754639ZM8 15.3975C4.33214 15.3975 1.35714 12.4225 1.35714 8.75464C1.35714 5.08678 4.33214 2.11178 8 2.11178C11.6679 2.11178 14.6429 5.08678 14.6429 8.75464C14.6429 12.4225 11.6679 15.3975 8 15.3975Z" fill="black" fill-opacity="0.85" />
                        <path d="M7.14258 5.61178C7.14258 5.83911 7.23288 6.05713 7.39363 6.21787C7.55438 6.37862 7.77239 6.46892 7.99972 6.46892C8.22705 6.46892 8.44507 6.37862 8.60581 6.21787C8.76656 6.05713 8.85686 5.83911 8.85686 5.61178C8.85686 5.38445 8.76656 5.16644 8.60581 5.00569C8.44507 4.84494 8.22705 4.75464 7.99972 4.75464C7.77239 4.75464 7.55438 4.84494 7.39363 5.00569C7.23288 5.16644 7.14258 5.38445 7.14258 5.61178ZM8.42829 7.61178H7.57115C7.49258 7.61178 7.42829 7.67607 7.42829 7.75464V12.6118C7.42829 12.6904 7.49258 12.7546 7.57115 12.7546H8.42829C8.50686 12.7546 8.57115 12.6904 8.57115 12.6118V7.75464C8.57115 7.67607 8.50686 7.61178 8.42829 7.61178Z" fill="black" fill-opacity="0.85" />
                    </g>
                    <defs>
                        <clipPath id="clip0_395_768">
                            <rect width="16" height="16" fill="white" transform="translate(0 0.754639)" />
                        </clipPath>
                    </defs>
                </svg>
            </Row>
            <Row className="mid-content">
                <Typography className="number-big">{numberBig}</Typography>
                {numberSmall &&
                    <Typography className="number-small">{numberSmall}</Typography>
                }
                {increase && <>
                    {increase == true ?
                        < CaretUpOutlined style={{ color: '#52C41A' }} />
                        :
                        <CaretDownOutlined style={{ color: 'red' }} />
                    }
                </>
                }
            </Row>

            <ChartArea
                data={data} />
        </ItemProgressionOverTimeStyled>
    )
}
const ItemProgressionOverTimeStyled = styled(Div)(({ }) => ({
    marginTop: '24px',
    paddingRight: '120px',
    '& .top-content': {
        alignItems: 'center',
        '& .title': {
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '22px',
            textAlign: 'left',
            marginRight: '8px',
            color: '#00000073'
        },
    },
    '& .mid-content': {
        alignItems: 'center',
        '& .number-big': {
            fontFamily: 'Roboto',
            fontSize: '24px',
            fontWeight: '500',
            lineHeight: '32px',
            textAlign: 'left',
            marginRight: '34px',
        },
        '& .number-small': {
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '22px',
            textAlign: 'left',
        }
    },
}));
