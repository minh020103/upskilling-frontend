import { Button, Col, Layout, Row, Typography } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CompletedChallengeProps } from "../../../models/performance-analysis";
import { Div } from "../../styles/Div";


export const ItemCompletedChallenge = (props: CompletedChallengeProps) => {
    const navigate = useNavigate();
    const { imgItem, title, status, score, complatedDate, className, id } = props;
    const onClickItemChallenge = () => {
        navigate(`/user/dashboard/available-challenges/${id}/complated`);
    }
    return (
        <CompletedChallengeStyled onClick={onClickItemChallenge} className={className + ""}>
            <img className="img-item" src={imgItem} />
            <Div className="content-area">
                <Typography className="title-item">{title}</Typography>
                <Button type="text" className="status">{status}</Button>
                <Row className="bottom-area">
                    <Col span={12}>
                        <Typography className="title">Score</Typography>
                        <Typography className="value">{score? score.toLocaleString('en-US'): 0}</Typography>
                    </Col>
                    <Col span={12}>
                        <Typography className="title">Complated on</Typography>
                        <Typography className="value">{moment(complatedDate).format('DD/MM/YY')}</Typography>
                    </Col>
                </Row>
            </Div>
        </CompletedChallengeStyled>
    )
}

const CompletedChallengeStyled = styled(Layout)(({ }) => ({
    height: '323px',
    border: 'solid 1px #0000000F',
    marginRight: '24px',
    padding: '0px',
    '&:last-child': {
        marginRight: '0',
    },
    '& .img-item': {
        width: '100%',
        height: '50%',
        gap: '0px',
        opacity: '0px',
    },
    '& .content-area': {
        padding: '24px',
        lineHeight: '100%',
        '& .title-item': {
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: '600',
            lineHeight: '24px',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        '& .status': {
            display: 'inline-block',
            padding: '1px 8px',
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '20px',
            textAlign: 'left',
            background: '#FAFAFA',
            border: '#D9D9D9 1px solid',
            borderRadius: '2px',
            marginTop: '8px',
        },
        '& .bottom-area': {
            marginTop: '16px',
            '& .title': {
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '22px',
                textAlign: 'left',
                color: '#00000073',
            },
            '& .value': {
                fontFamily: 'Roboto',
                fontSize: '24px',
                fontWeight: '400',
                lineHeight: '28px',
                textAlign: 'left',
            },
        },
    },
}));