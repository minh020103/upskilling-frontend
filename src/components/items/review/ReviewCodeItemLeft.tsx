import { Button, Modal, Row, Typography } from "antd"
import { useState } from "react";
import styled from "styled-components";
import { PeerReviewInfo, ReviewCodeItemLeftProps } from "../../../models/review";
import { LineStyled } from "../../styles/dashboard";
import { Div } from "../../styles/Div";
import { ContentNameChallenge } from "../../views/dashboard/ContentNameChallenge";
import { ButtonCustom } from "../custom-item/ButtonCustom";
import { ItemDownload } from "../dashboard/ItemDownload";

export const ReviewCodeItemLeft = (props: ReviewCodeItemLeftProps) => {
    const { data } = props;
    const [open, setOpen] = useState<boolean>(false);

    const showLoading = () => {
        setOpen(true);

    };
    const closeModel = () => {
        setOpen(false)
    }
    return (
        <LeftContent>
            <Row className="note">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM7.5 10.375C7.5 10.4438 7.44375 10.5 7.375 10.5H6.625C6.55625 10.5 6.5 10.4438 6.5 10.375V6.125C6.5 6.05625 6.55625 6 6.625 6H7.375C7.44375 6 7.5 6.05625 7.5 6.125V10.375ZM7 5C6.80374 4.99599 6.61687 4.91522 6.47948 4.775C6.3421 4.63478 6.26515 4.4463 6.26515 4.25C6.26515 4.0537 6.3421 3.86522 6.47948 3.725C6.61687 3.58478 6.80374 3.50401 7 3.5C7.19626 3.50401 7.38313 3.58478 7.52052 3.725C7.6579 3.86522 7.73485 4.0537 7.73485 4.25C7.73485 4.4463 7.6579 4.63478 7.52052 4.775C7.38313 4.91522 7.19626 4.99599 7 5Z" fill="#1890FF" />
                </svg>
                <Typography className="note-text">[Name of peer] just finished the {data?.userChallengeStart?.challenge?.title}. Please review it by downloading the files below.</Typography>
            </Row>
            <Typography className="title">
                Description
            </Typography>
            <Typography className="description">
                {data?.userChallengeStart?.challenge?.description}
            </Typography>
            <Button className="button-detail" onClick={showLoading}>View detail</Button>
            <LineStyled />
            <Typography className="title">
                Source code
            </Typography>
            <ItemDownload
                link={data?.userChallengeStart?.pathFileSource + ""}
                textButton="Download to review"
                orientation="horizontal"
            />
            <Typography className="title">
                Text file
            </Typography>
            <ItemDownload
                link={data?.userChallengeStart?.pathFileText + ""}
                textButton="Download to review"
                orientation="horizontal"
            />
            <Modal
                width={1000}
                title={<p>Challenge details</p>}
                footer={
                    <ButtonCustom type="primary" onClickButton={closeModel} className={null} label={"OK"} />
                }
                // loading={loadingModal}
                open={open}
                onCancel={() => setOpen(false)}
            >
                {data?.userChallengeStart &&
                    <ContentNameChallenge
                        id={data.userChallengeStart.challenge.id}
                        active={true}
                    />
                }
            </Modal>
        </LeftContent>
    )
}
const LeftContent = styled(Div)(({ }) => ({
    background: "#fff",
    padding: '24px 80px',
    '& .note': {
        background: '#E6F7FF',
        border: '1px solid #91D5FF',
        padding: '9px 16px',
        borderRadius: '2px',
        display: 'flex',
        alignItems: 'center',
        '& .note-text': {
            marginLeft: '10px',
        }
    },
    '& .title': {
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        textAlign: 'left',
        marginTop: '40px',
        marginBottom: '12px',
    },
    '& .description': {
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
        textAlign: 'left',
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxHeight: '66px',
    },
    '& .button-detail': {
        marginTop: '24px',
        borderRadius: '0',
    },
}));