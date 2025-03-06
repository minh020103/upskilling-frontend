import { Button, Flex, Typography } from "antd";
import styled from "styled-components";
import { ChallengeAndViewAllProps } from "../../models/performance-analysis";
import { Div } from "../styles/Div";
export const ChallengeAndViewAll = (props: ChallengeAndViewAllProps) => {
    const { title, description, onClickLeft, onClickRight, onClickViewAll, render, className, loadMoreActive } = props;
    return (
        <TopContentStyled className={className ? className : ""}>
            <Flex className="content-title">
                <Typography className="title">{title}</Typography>
                {
                    loadMoreActive == "active" ?
                        <Flex className="content-title-right">
                            <Button type="text" className="icon-buttom" onClick={onClickLeft}>
                                <svg width="10" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.83962 2.06646V1.03119C8.83962 0.941456 8.7365 0.891902 8.66685 0.946813L2.62935 5.66244C2.57805 5.70233 2.53655 5.75341 2.50799 5.81179C2.47944 5.87016 2.4646 5.93429 2.4646 5.99927C2.4646 6.06425 2.47944 6.12838 2.50799 6.18675C2.53655 6.24512 2.57805 6.29621 2.62935 6.3361L8.66685 11.0517C8.73783 11.1066 8.83962 11.0571 8.83962 10.9673V9.93208C8.83962 9.86646 8.80882 9.80351 8.75792 9.76333L3.93649 5.99994L8.75792 2.23521C8.80882 2.19503 8.83962 2.13208 8.83962 2.06646Z" fill="black" fill-opacity="0.85" />
                                </svg>
                            </Button >
                            <Button type="text" className="icon-buttom" onClick={onClickRight}>
                                <svg width="10" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.39777 5.66281L3.36027 0.947189C3.34449 0.934768 3.32553 0.92705 3.30557 0.924919C3.2856 0.922788 3.26544 0.926332 3.2474 0.935143C3.22936 0.943955 3.21417 0.957676 3.20357 0.974732C3.19298 0.991787 3.18741 1.01149 3.1875 1.03156V2.06683C3.1875 2.13246 3.2183 2.1954 3.2692 2.23558L8.09063 6.00031L3.2692 9.76505C3.21697 9.80522 3.1875 9.86817 3.1875 9.9338V10.9691C3.1875 11.0588 3.29063 11.1083 3.36027 11.0534L9.39777 6.33781C9.44908 6.29779 9.4906 6.24658 9.51915 6.1881C9.5477 6.12962 9.56254 6.06539 9.56254 6.00031C9.56254 5.93523 9.5477 5.87101 9.51915 5.81253C9.4906 5.75404 9.44908 5.70284 9.39777 5.66281Z" fill="black" fill-opacity="0.85" />
                                </svg>
                            </Button >
                            <Button className="view-all" onClick={onClickViewAll}>View all</Button>
                        </Flex>
                        :
                        <></>
                }
            </Flex>
            {description ?
                <Typography className="description">{description}</Typography>
                :
                <></>
            }
            <ContentLayout>
                {render}
            </ContentLayout>
        </TopContentStyled>
    )
}
const ContentLayout = styled(Flex)(({ }) => ({
    overflowX: 'auto',
    padding: '24px 24px 24px 0',
    display: 'flex',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
}));

const TopContentStyled = styled(Div)(({ }) => ({
    backgroundColor: '#FFFFFF',
    padding: '24px 0 0 24px',
    width: '100%',
    '& .ant-layout': {
        background: '#fff',
    },
    '& .content-title': {
        display: 'flex',
        marginRight: '24px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '32px',
        '& .content-title-right': {
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'right',
            '& .view-all': {
                right: '0',
                height: '32px',
                padding: '0px 15px 0px 15px',
                gap: '8px',
                borderRadius: '2px 0px 0px 0px',
                border: '1px 0px 0px 0px',
                opacity: '0px',
                backgroundColor: '#1890FF',
                color: '#FFFFFF',
                marginLeft: '8px',
                textTransform: 'none',
            },
            '& .icon-buttom': {
                borderRadius: '0',
                width: "42px",
                padding: '0px 15px 0px 15px',
                border: 'solid 1px #D9D9D9',
                height: '32px',
                marginLeft: '8px',
            }
        }

    },
    '& .title': {
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '28px',
        textAlign: 'left',
    },
    '& .description': {
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
        textAlign: 'left',
        color: '#00000073'
    },
    '& .custom-available-challenge': {
        maxWidth: '284px',
    }
}));
