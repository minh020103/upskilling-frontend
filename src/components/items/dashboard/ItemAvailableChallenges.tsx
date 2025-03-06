import { Avatar, Flex, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ItemAvailableChallengesProps } from "../../../models/dashboard";


export const ItemAvailableChallenges = (props: ItemAvailableChallengesProps) => {
    const navigate = useNavigate();
    const { imgItem, title, description, time, avatars, id, className } = props;
    const onClickItemChallenge = () => {
        navigate(`/user/dashboard/available-challenges/${id}`);
    }
    return (
        <ItemAvailableChallengesStyled onClick={onClickItemChallenge} className={className+""}>
            <img className="img-item" src={imgItem} />
            <Layout className="content-area">
                <Typography className="title-item">{title}</Typography>
                <Typography className="description-item">{description}</Typography>
                <Layout className="bottom-area-item">
                    <Typography className="time-item">{time} minutes</Typography>
                    <Flex className="list-avatar">
                        {
                            avatars.map(item => (
                                <Avatar className="avatar" src={item.avatar}></Avatar>
                            ))
                        }
                    </Flex>
                </Layout>
            </Layout>
        </ItemAvailableChallengesStyled>
    )
}
const ItemAvailableChallengesStyled = styled(Layout)(({ }) => ({
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
        background: '#fff',
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
            height: '32px',
            gap: '0px',
            opacity: '0px',
            position: 'relative',
            background: '#fff',
            display: 'flex',
            justifyContent: 'center',
            '& .time-item': {
                position: 'absolute',
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '22px',
                textAlign: 'left',
                color: '#00000073',
                top: '50%',
                transform: 'translateY(-50%)',
            },
            '& .list-avatar': {
                position: 'absolute',
                display: 'flex',
                right: '0',
                '& .avatar': {
                    width: '32px',
                    height: '32px',
                    gap: '0px',
                    opacity: '0px',
                    '&:nth-child(1)': {
                        order: '3',
                    },
                    '&:nth-child(2)': {
                        order: '2',
                    },
                    '&:nth-child(3)': {
                        order: '1',
                    },
                },
            }
        }
    },
}));