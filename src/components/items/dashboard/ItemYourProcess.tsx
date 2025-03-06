import { Layout, Progress, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ItemYourProcessProps } from "../../../models/dashboard";
const Div = styled.div``;
export const ItemYourProcess = (props: ItemYourProcessProps) => {
    const navigate = useNavigate();
    const { id, imgItem, title, description, progress, status } = props;
    const onClickItem = () => {
        navigate(`/user/dashboard/available-challenges/${id}/initial-evaluation`);
    }
    return (
        <ItemYourProcessStyled onClick={onClickItem}>
            <img className="img-item" src={imgItem} />
            <Layout className="content-area">
                <Typography className="title-item">{title}</Typography>
                <Typography className="description-item">{description}</Typography>
                <Div className="bottom-area-item">
                    <Progress percent={progress} status="active" className="progress-custom" /> {status}
                </Div>
            </Layout>
        </ItemYourProcessStyled>
    )
}
const ItemYourProcessStyled = styled(Layout)(({ }) => ({
    height: '323px',
    maxWidth: '284px',
    border: 'solid 1px #0000000F',
    marginRight: '24px',
    padding: '0px',
    '&:last-child': {
        marginRight: '0px !important',
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
        '& .description-item': {
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitLayoutOrient: 'vertical',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '22px',
            maxHeight: '44px',
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        '& .bottom-area-item': {
            width: '236px',
            height: '32px',
            gap: '0px',
            opacity: '0px',
            display: 'flex',
            alignItems: 'center',
            '& .progress-custom': {
                marginRight: '10px',
                '& .ant-progress-bg': {
                    background: "red",
                }
            }
        }
    },
}));