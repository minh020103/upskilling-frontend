import { Button, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { InitialEvaluationBottomProps } from "../../../models/dashboard";
import { FailResponseModel } from "../../../models/ResponseModel";
import { UserReviewModel } from "../../../models/UserModel";
import { sendNotificationPeerReviewService } from "../../../services/ChallengeService";
import { getUserReview } from "../../../services/UserService";
import { notifyErr, notifySuccess } from "../../../utils/notify";
import { Div } from "../../styles/Div"

export const PeerReview = (props: InitialEvaluationBottomProps) => {
    const { progress, setProgress, userChallengeStartId } = props;
    const [selectedValue, setSelectedValue] = useState([]);
    const [users, setUsers] = useState<any>([]);
    const handleChange = (value: any) => {
        setSelectedValue(value);
    };
    const handSearch = (value: any) => {
        fetchUsers(value);
    };
    const onClickNextFind = () => {
        sendNotification();
        setProgress(4);
    }
    const sendNotification = async () => {
        try {
            const res = await sendNotificationPeerReviewService(selectedValue, userChallengeStartId);
            if (res.status == 200) {
                const success = res.data as string;
                notifySuccess(success);
            }
        } catch (error) {

        }
    }
    const fetchUsers = async (key: string) => {
        try {
            const res = await getUserReview(key);
            if (res.status == 200) {
                const success = res.data as UserReviewModel;
                setUsers(success);
            }
            else {
                const fail = res.data as FailResponseModel;
                notifyErr(fail.errorMessage);
            }
        } catch (error) {

        }
    };
    useEffect(() => {
        fetchUsers("");
    }, []);

    return (
        <ResultStyled>
            <Typography className="title-result">Peer review</Typography>
            <Div className="result-area">
                <Typography className="text-top">
                    Search for cross-reviewers.
                </Typography>
                <Select
                    mode="tags"
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Search to Select"
                    optionFilterProp="label"
                    value={selectedValue}
                    onChange={handleChange}
                    onSearch={handSearch}
                    options={users.map((user: { id: any; username: any; email: any; }) => ({
                        value: user.id,
                        label: `${user.username} (${user.email})`,
                    }))}
                />
                <Button type="primary" className="button-next" onClick={onClickNextFind}>Submit</Button>
            </Div>
        </ResultStyled>
    )
}

const ResultStyled = styled(Div)(({ }) => ({
    '& .title-result': {
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '28px',
        textAlign: 'left',
    },
    '& .result-area': {
        background: '#E6F7FF',
        border: '#BAE7FF 1px solid',
        marginTop: '16px',
        textAlign: 'center',
        padding: '16px 8px',
        '& .text-top': {
            fontfamily: 'Roboto',
            fontsize: '14px',
            fontweight: '400',
            lineheight: '22px',
            textalign: 'center',
            marginBottom: '8px',
        },
        '& .button-next': {
            borderRadius: '0',
            marginTop: '12px'
        }
    },
}));