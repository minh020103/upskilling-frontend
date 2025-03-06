import { Modal, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { ContentLeftCodeDeverlopmentProps } from "../../../models/dashboard";
import { LineStyled } from "../../styles/dashboard";
import { Div } from "../../styles/Div";
import { ContentNameChallenge } from "../../views/dashboard/ContentNameChallenge";
import { ButtonCustom } from "../custom-item/ButtonCustom";
import UploadFile from "../UploadFile";
const { Title, Text } = Typography;
const LeftContent = styled(Div)(({ }) => ({
    background: "#fff",
    padding: '24px 80px',
    '& .title': {
        //styleName: H5/regular;
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        textAlign: 'left',

    },
    '& .description': {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '22px',
        maxHeight: '66px',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: '400',
    },
    '& .button-detail': {
        margin: '24px 0',
    },
}));
export const ContentLeftCodeDeverlopment = (props: ContentLeftCodeDeverlopmentProps) => {
    const { challenge, onFileSelectSource, onFileSelectText } = props;
    const [open, setOpen] = useState<boolean>(false);

    const showLoading = () => {
        setOpen(true);

    };
    const closeModel = () => {
        setOpen(false)
    }
    return (
        <LeftContent>
            <Title className="title">
                Description
            </Title>
            <Text className="description">
                {challenge.description ? challenge.description : ""}
            </Text>
            <LineStyled />

            <ButtonCustom type="default" className="button-detail" onClickButton={showLoading} label={"View detail"} />
            <Title className="title">
                Source code (zip)
            </Title>
            <UploadFile
                onFileSelect={onFileSelectSource} />
            <LineStyled />
            <Title className="title">
                Text file (txt)
            </Title>
            <UploadFile
                onFileSelect={onFileSelectText} />
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
                <ContentNameChallenge
                    id={challenge.id}
                    active={true}
                />
            </Modal>
        </LeftContent>
    )
}