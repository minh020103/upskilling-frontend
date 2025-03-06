import styled from "styled-components"
import { UserChallengeStartDataProps } from "../../../models/dashboard";
import { LineStyled } from "../../styles/dashboard";
import { Div } from "../../styles/Div"
import { ContentComplatedChallenge } from "./ContentComplatedChallenge";
import { FeedBackCompletedChallenge } from "./FeedBackCompletedChallenge";
import { ResultCompletedChallenge } from "./ResultCompletedChallenge";

export const ContentLeftComplatedChallenge = (props: UserChallengeStartDataProps) => {
    const { data } = props;
    return (
        <ContentLeftComplatedChallengeStyled>
            <ContentComplatedChallenge
                data={data}
            />
            <ResultCompletedChallenge 
                data={data}/>
            <LineStyled />
            <FeedBackCompletedChallenge />
        </ContentLeftComplatedChallengeStyled>
    )
}
const ContentLeftComplatedChallengeStyled = styled(Div)(({ }) => ({
    background: '#fff',
    padding: '24px',
}));
