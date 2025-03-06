import { Col, Row, Spin } from "antd";
import { RcFile } from "antd/es/upload";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Challenge } from "../../../models/ChallengeModel";
import { ScanFileSourceResponse, UploadFileSuccessResponce } from "../../../models/response/code-development";
import { FailResponseModel } from "../../../models/ResponseModel";
import { scanFileSourceService, uploadFileService } from "../../../services/ChallengeService";
import { checkSizeFile, checkTypeFile } from "../../../utils/file";
import { notifyErr, notifySuccess } from "../../../utils/notify";
import { ContentLeftCodeDeverlopment } from "../../items/dashboard/ContentLeftCodeDeverlopment";
import { ContentRightCodeDeverlopment } from "../../items/dashboard/ContentRightCodeDeverlopment";

export const Content = styled(Row)(({ }) => ({
    padding: '24px',
}));
export const ContentCodeDeverlopment: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
    const navigate = useNavigate();
    const [userChallengeStartId, setUserChallengeStartId] = useState<number>();
    const [fileSource, setFileSource] = useState<RcFile | null>(null);
    const [fileText, setFileText] = useState<RcFile | null>(null);
    const [scanLoading, setScanLoading] = useState<boolean>(false);

    const onFileSelectSource = (file: RcFile | null) => {
        setFileSource(file);
    }
    const onFileSelectText = (file: RcFile | null) => {
        setFileText(file);
    }
    const onClickQuit = () => {

    }
    const onClickSubmit = () => {
        const maxSize = 250 * 1024 * 1024;
        if (fileSource && fileText) {
            if (checkTypeFile(fileSource, "application/zip") || checkTypeFile(fileSource, "application/x-zip-compressed") && checkTypeFile(fileText, "text/plain") && checkSizeFile(fileSource, maxSize) && checkSizeFile(fileText, maxSize)) {
                uploadFile();
            }
        }
    }



    const uploadFile = async () => {
        setScanLoading(true);
        try {
            if (fileSource && fileText && userChallengeStartId) {
                const res = await uploadFileService(userChallengeStartId, fileSource, fileText);
                const { status, data } = res;
                if (status == 202) {
                    notifySuccess("Upload file success. Scanning the source file");
                    const success = data as UploadFileSuccessResponce;
                    scanFile(success.fileSource);
                }
                else {
                    const fail = data as FailResponseModel;
                    notifyErr(fail.errorMessage);
                    setScanLoading(false);
                }
            }
        } catch (error) {

        }
    }
    const scanFile = async (pathFile: string) => {
        try {
            if (fileSource && fileText && userChallengeStartId) {
                const res = await scanFileSourceService(userChallengeStartId, pathFile);
                const { status, data } = res;
                if (status == 200) {
                    notifySuccess("Scan file success");
                    navigate(`/user/dashboard/available-challenges/${userChallengeStartId}/initial-evaluation`);
                }
                else {
                    const fail = data as FailResponseModel;
                    notifyErr(fail.errorMessage);
                }
            }
        } catch (error) {

        }
        setScanLoading(false);
    }

    return (
        <Spin spinning={scanLoading}>
            <Content gutter={24}>
                <Col span={18}>
                    <ContentLeftCodeDeverlopment
                        challenge={challenge}
                        onFileSelectSource={onFileSelectSource}
                        onFileSelectText={onFileSelectText} />
                </Col>
                <Col span={6}>
                    <ContentRightCodeDeverlopment
                        challenge={challenge}
                        onClickQuit={onClickQuit}
                        onClickSubmit={onClickSubmit}
                        setUserChallengeStartId={setUserChallengeStartId} />
                </Col>
            </Content>
        </Spin >
    )
}
