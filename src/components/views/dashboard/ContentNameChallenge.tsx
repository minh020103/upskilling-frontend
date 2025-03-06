import { Col, Spin, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { Challenge } from "../../../models/ChallengeModel";
import { ContentNameChallengeProps } from "../../../models/dashboard";
import { FailResponseModel } from "../../../models/ResponseModel";
import { getDetailChallengeService } from "../../../services/ChallengeService";
import { notifyErr } from "../../../utils/notify";
import { ButtonCustom } from "../../items/custom-item/ButtonCustom";
import { ItemtextInLine } from "../../items/dashboard/ItemtextInLine";

const Div = styled.div``;
const ContentNameChallengeStyled = styled(Div)(({ }) => ({
    margin: '24px',
    padding: '24px 56px',
    background: '#fff',
    '& .content': {
        '& .image-area': {
            '& img': {
                width: '100%',
                height: '50%',
            }
        },
        '& .request-area': {

        },
        '& .start-code': {
            background: '#E6F7FF',
            padding: '15px',
            whiteSpace: 'pre-line',
        },
        '& .accept-button': {
            '&:hover': {
                background: 'blue',
                color: '#fff',
            }
        }
    },
}));
const TitleStyled = styled(Typography)(({ }) => ({
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
    textAlign: 'left',
    marginBottom: '12px',
}));
const LineStyled = styled(Div)(({ }) => ({
    background: '#0000000F',
    height: '2px',
    width: '100%',
    marginTop: '40px',
    marginBottom: '24px',
}));
export const ContentNameChallenge = (props: ContentNameChallengeProps) => {
    const [challenge, setChallenge] = useState<Challenge>();
    const [loading, setLoading] = useState<boolean>(true);
    const { id, active } = props;
    const navigate = useNavigate();
    const onClickAccept = () => {
        navigate(`/user/dashboard/available-challenges/${challenge?.id}/code-deverlopment`);
    }
    useEffect(() => {
        getDetailChallenge();
    }, [])

    const getDetailChallenge = async () => {
        setLoading(true);
        try {
            const resp = await getDetailChallengeService(Number(id));
            if (resp.status == 200) {
                const success = resp.data as Challenge;
                setChallenge(success);
            }
            else {
                const fail = resp.data as FailResponseModel;
                notifyErr(fail.errorMessage);
            }
        }
        catch (err) {
            alert(err);
        }
        setLoading(false);
    }
    
    return (
        <Spin spinning={loading}>
            <ContentNameChallengeStyled>
                <Col className="content">
                    <Div className="image-area">
                        <img src={challenge?.image} />
                    </Div>
                    <LineStyled />
                    <Div className="request-area">
                        <TitleStyled>
                            Description
                        </TitleStyled>
                        {
                            challenge?.description
                        }
                    </Div>
                    <LineStyled />
                    <Div className="request-area">
                        <TitleStyled>Duration</TitleStyled>
                        <ItemtextInLine
                            index={null}
                            content={challenge?.duration + " minutes"}
                        />
                    </Div>
                    <LineStyled />
                    <Div className="request-area">
                        <TitleStyled>
                            Requirements
                        </TitleStyled>
                        {
                            challenge?.requirements?.map((item, index) => (
                                <ItemtextInLine
                                    index={index + 1}
                                    content={item}
                                />
                            ))
                        }
                    </Div>
                    <LineStyled />
                    <Div className="request-area">
                        <TitleStyled>
                            Guidelines
                        </TitleStyled>
                        {
                            challenge?.guidelines?.map((item, index) => (
                                <ItemtextInLine
                                    index={index + 1}
                                    content={item}
                                />
                            ))
                        }
                    </Div>
                    <LineStyled />
                    <Div className="request-area">
                        <TitleStyled>
                            Start code
                        </TitleStyled>
                        <Div className="start-code">
                            {
                                challenge?.starterCode?.map((item) => (
                                    <>{item} <br /></>
                                ))
                            }
                        </Div>
                    </Div>
                    <LineStyled />
                    <Div className="request-area">
                        <TitleStyled>
                            Bonus Points
                        </TitleStyled>
                        {
                            challenge?.bonusPoints?.map((item, index) => (
                                <ItemtextInLine
                                    index={index + 1}
                                    content={item}
                                />
                            ))
                        }
                    </Div>
                    <LineStyled />
                    <Div className="request-area">
                        <TitleStyled>
                            Evaluation Criteria
                        </TitleStyled>
                        {
                            challenge?.evaluationCriteria?.map((item, index) => (
                                <ItemtextInLine
                                    index={index + 1}
                                    content={item}
                                />
                            ))
                        }
                    </Div>
                    {active == false ?
                        <>
                            <LineStyled />
                            <ButtonCustom
                                className={'accept-button'}
                                label={'Accept challenge'}
                                onClickButton={onClickAccept}
                                type={"primary"}
                            />
                        </>
                        :
                        <></>
                    }
                </Col>
            </ContentNameChallengeStyled>
        </Spin>
    )
}