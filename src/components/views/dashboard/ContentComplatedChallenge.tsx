import { Button, Flex, Modal, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components"
import { UserChallengeStart } from "../../../models/dashboard";
import { ButtonCustom } from "../../items/custom-item/ButtonCustom";
import { LineStyled } from "../../styles/dashboard";
import { Div } from "../../styles/Div"
import { ContentNameChallenge } from "./ContentNameChallenge";

export const ContentComplatedChallenge = (props: ContentComplatedChallengeProps) => {
    
    const [open, setOpen] = useState<boolean>(false);

    const showLoading = () => {
        setOpen(true);

    };
    const closeModel = () => {
        setOpen(false)
    }
    const { data } = props;
    
    return (
        <ContentComplatedChallengeStyled>
            <img className="img-challenge" src={data.challenge.image} />
            <LineStyled />
            <Typography className="title">
                Description
            </Typography>
            <Typography className="discription">
                {data.challenge.description}
            </Typography>
            <Flex className="buttom-area">
                <Button type="primary" style={{ borderRadius: '0' }} className='buttom' onClick={showLoading}>View all details</Button>
            </Flex>
            <LineStyled />
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
                    id={data.challenge.id}
                    active={true}
                />
            </Modal>
        </ContentComplatedChallengeStyled>
    )
}
const ContentComplatedChallengeStyled = styled(Div)(({ }) => ({
    '& .img-challenge': {
        width: '100%',
        padding: '0 80px',
    },
    '& .title': {
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        textAlign: 'left',
        padding: '0 80px',
    },
    '& .discription': {
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
        marginTop: '12px',
        padding: '0 80px',
    },
    '& .buttom-area': {
        justifyContent: 'center',
        marginTop: '16px',
        '& .buttom': {
            '&:hover': {
                background: 'blue',
                color: '#fff',
            }
        }
    }
}));
interface ContentComplatedChallengeProps {
    data: UserChallengeStart
}