import Typography from "antd/es/typography/Typography";
import React from "react";
import styled from "styled-components"
import { UserChallengeStart } from "../../../models/dashboard";
import { ItemDownload } from "../../items/dashboard/ItemDownload";
import { Div } from "../../styles/Div"

export const ContentRightComplatedChallenge:React.FC<{data: UserChallengeStart}> = ({data}) => {
    return (
        <ContentRightComplatedChallengeStyled>
            <Typography className="title">An’s answer</Typography>
            <Div className="dowload-area">
                <Typography className="title-dowload">
                    Source
                </Typography>
                <ItemDownload
                    link={data.pathFileSource}
                    textButton="Download"
                    orientation="vertical"
                />
                <Typography className="title-dowload">
                    Text
                </Typography>
                <ItemDownload
                    link={data.pathFileText}
                    textButton="Download"
                    orientation="vertical"
                />
            </Div>
        </ContentRightComplatedChallengeStyled>
    )
}
const ContentRightComplatedChallengeStyled = styled(Div)(({ }) => ({
    marginLeft: '24px',
    background: '#fff',
    '& .title': {
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '24px',
        textAlign: 'center',
        border: '1px solid #F0F0F0',
        padding: '16px 0',
        margin: '0'
    },
    '& .dowload-area': {
        padding: '0 24px 24px 24px',
        '& .title-dowload': {
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '24px',
            textAlign: 'left',
            marginBottom: '12px',
            marginTop: '24px',
        },
    },
}));