import { Button, Input, Spin, Typography, UploadProps } from "antd";
import Upload, { RcFile, UploadFile } from "antd/es/upload";
import styled from "styled-components"
import { Div } from "../../styles/Div"
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { useState } from "react";
import { sendDataFeedBackService } from "../../../services/ChallengeService";
import { notifyErr, notifySuccess } from "../../../utils/notify";
const { Title } = Typography;
export const ReviewCodeItemLeftRight = () => {
    const { peerReviewId } = useParams();
    const [file, setFile] = useState<RcFile | null>(null);
    const [feedBack, setFeedBack] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [score, setScore] = useState<string>();
    const props: UploadProps = {
        beforeUpload: (file: RcFile) => {
            setFile(file);
            return false;
        },
        onRemove: () => {
            setFile(null);
        },
        fileList: file ? [file as UploadFile] : [],
        maxCount: 1,
    };
    const onClickSubmit = () => {
        if (checkSubmit()) {
            handleSendFeedBack();
        }
    }
    const handleSendFeedBack = async () => {
        setLoading(true);
        try {
            if (peerReviewId != undefined && score != undefined) {
                const res = await sendDataFeedBackService(Number(peerReviewId), feedBack, file, Number(score));
                if (res.status == 202) {
                    notifySuccess(res.data);
                }
            }
        } catch (error) {

        }
        setLoading(false);
    }
    const handleInputFeedBackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeedBack(e.target.value);
    }
    const handleInputScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScore(e.target.value);
    }
    const checkSubmit = (): boolean => {
        if (!score) {
            notifyErr("score not null");
            return false;
        }
        return true;
    }
    return (
        <Spin spinning={loading}>
            <RightContent>
                <Title className="title">
                    Review
                </Title>
                <Div className="form-review">
                    <Typography className="title-mini">
                        Review
                    </Typography>
                    <Input.TextArea
                        placeholder="Please leave your feedback here"
                        style={{ borderRadius: '0', height: '165px', marginBottom: '24px' }}
                        value={feedBack}
                        onChange={(e) => handleInputFeedBackChange(e)} />
                    <Typography className="title-mini">
                        Upload files
                    </Typography>
                    <Upload {...props}>
                        <Button style={{ borderRadius: '0' }} icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <Typography className="text-mini">
                        Max upload file 250 MB
                    </Typography>
                    <Typography className="title-mini">
                        Review
                    </Typography>
                    <Input
                        style={{ borderRadius: 0 }}
                        placeholder="Input score"
                        type="number"
                        value={score + ""}
                        onChange={(e) => handleInputScoreChange(e)} />
                    <Button type="primary" className="buttom-submit" onClick={onClickSubmit}>Submit</Button>
                </Div>
            </RightContent>
        </Spin>
    )
}
const RightContent = styled(Div)(({ }) => ({
    background: "#fff",
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
    '& .form-review': {
        padding: '24px',
        '& .title-mini': {
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '24px',
            marginBottom: '10px',
        },
        '& .text-mini': {
            fontFamily: 'Roboto',
            fontSize: '14',
            fontWeight: '400',
            lineHeight: '24px',
            marginBottom: '10px',
            color: '#00000073',
        },
        '& .buttom-submit': {
            borderRadius: 0,
            width: '100%',
            marginTop: '14px'
        }
    }
}));