import { Row, Spin, Typography } from "antd";
import { parse } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ContentRightCodeDeverlopmentProps } from "../../../models/dashboard";
import { ChallengeStartInfoResponse } from "../../../models/response/code-development";
import { startChallengeService } from "../../../services/ChallengeService";
import { LineStyled } from "../../styles/dashboard";
import { Div } from "../../styles/Div";
import { ButtonCustom } from "../custom-item/ButtonCustom";
import { CustomProgressTime } from "./CustomProgressTime";
import { TimeCount } from "./Time";
const { Title } = Typography;
const RightContent = styled(Div)(({ }) => ({
    background: "#fff",
    padding: '16px 0',
    '& .title': {
        //styleName: H5/regular;
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        textAlign: 'center',
    },
    '& .time-area': {
        textAlign: 'center',
        '& .text-time': {
            color: '#F5222D',
            //styleName: H2/medium;
            fontFamily: 'Roboto',
            fontSize: '30px',
            fontWeight: '500',
            lineHeight: '40px',
            textAlign: 'center',
            marginBottom: '8px',
        },
        '& .buttom-area': {
            justifyContent: 'center',
            '& .buttom-custom': {
                width: '111px',
                height: '32px',
                margin: '4px'
            }
        }
    },

}));
export const ContentRightCodeDeverlopment = (props: ContentRightCodeDeverlopmentProps) => {
    const { challenge, onClickSubmit, onClickQuit, setUserChallengeStartId } = props;

    const [startTime, setStartTime] = useState<number>(0);
    const [loadingTime, setLoadingTime] = useState<boolean>(true);
    const naviagte = useNavigate();
    // const onClickSubmit = () => {
    //     naviagte(`/user/dashboard/available-challenges/${challenge.id}/initial-evaluation`);
    // }
    useEffect(() => {
        getDurationOfChallenge();
    }, [challenge]);
    const getDurationOfChallenge = async () => {
        setLoadingTime(true);

        if (challenge.id != 0) {
            try {
                const res = await startChallengeService(challenge.id);
                const { data, status } = res;
                if (status === 200) {
                    const dataSuccess = data as ChallengeStartInfoResponse;
                    setUserChallengeStartId(dataSuccess.id);
                    const serverTime = parse(dataSuccess.createdAt, 'yyyy-MM-dd HH:mm:ss', new Date());
                    const startTimestamp = serverTime.getTime();
                    setStartTime(startTimestamp);

                }
            } catch (error) {
                console.error('Failed to get challenge duration', error);
            }
            setLoadingTime(false);
        }
    };

    return (
        <RightContent>
            <Title className="title" style={{ marginTop: '0' }}>
                Time remaining
            </Title>
            <LineStyled style={{ marginTop: '16px' }} />
            <Spin spinning={loadingTime}>
                <Div className="time-area">
                    <Typography className="text-time">
                        <TimeCount
                            timeM={challenge.duration}
                            startTime={startTime}
                        />
                    </Typography>
                    <CustomProgressTime
                        timeM={challenge.duration}
                        startTime={startTime} />
                    <Row className="buttom-area">
                        <ButtonCustom type="default" onClickButton={onClickQuit} className={'buttom-custom'} label={"Quit"} />
                        <ButtonCustom type="primary" onClickButton={onClickSubmit} className={'buttom-custom'} label={"Submit"} />
                    </Row>
                </Div>
            </Spin>
        </RightContent>
    )
}