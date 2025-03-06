import { Col, Row, Spin, Typography } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import styled from "styled-components"
import { UploadFileSuccessResponce } from "../../../models/response/code-development";
import { FailResponseModel } from "../../../models/ResponseModel";
import { scanFileSourceService, uploadFileService } from "../../../services/ChallengeService";
import { checkSizeFile, checkTypeFile } from "../../../utils/file";
import { notifyErr, notifySuccess } from "../../../utils/notify";
import { ButtonCustom } from "../../items/custom-item/ButtonCustom";
import UploadFile from "../../items/UploadFile";
import { Div } from "../../styles/Div";
interface ReUploadFile {
    userChallengeStartId: number,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
}
export const ReUploadFile = (props: ReUploadFile) => {
    const { userChallengeStartId, setProgress } = props;
    const [fileSource, setFileSource] = useState<RcFile | null>(null);
    const [fileText, setFileText] = useState<RcFile | null>(null);
    const [scanLoading, setScanLoading] = useState<boolean>(false);
    const onFileSelectSource = (file: RcFile | null) => {
        setFileSource(file);
    }
    const onFileSelectText = (file: RcFile | null) => {
        setFileText(file);
    }
    const onClickSubmit = () => {
        const maxSize = 250 * 1024 * 1024;
        console.log(fileText);
        
        if (fileSource && fileText) {
            if (checkTypeFile(fileSource, "application/zip") && checkTypeFile(fileText, "text/plain") && checkSizeFile(fileSource, maxSize) && checkSizeFile(fileText, maxSize)) {
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
                    setProgress(1);
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
            <ReUploadFileStyled>
                <Typography className="title-result">Upload file</Typography>
                <Row>
                    <Col span={12}>
                        <Typography>Source code (zip)</Typography>
                        <UploadFile
                            onFileSelect={onFileSelectSource}
                        />
                    </Col>
                    <Col span={12}>
                        <Typography>Text file (txt)</Typography>
                        <UploadFile
                            onFileSelect={onFileSelectText}
                        />
                    </Col>
                    <ButtonCustom
                        label="Submit"
                        onClickButton={onClickSubmit}
                        className={"custom-buttom"}
                    />
                </Row>
            </ReUploadFileStyled>
        </Spin>
    )
}
const ReUploadFileStyled = styled(Div)(({ }) => ({
    '& .title-result': {
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '28px',
        textAlign: 'left',
    },
    '& .custom-buttom':{
        marginTop: '10px'
    }
}));