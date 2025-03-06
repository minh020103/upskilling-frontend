import { Row } from "antd";
import styled from "styled-components";
import { BottomContent } from "../../../views/dashboard/BottomContent";
import { TopContentChallenge } from "../../../views/dashboard/TopContentChallenge";

const DashboardStyled = styled(Row)(({ }) => ({
    margin: '24px',
}));




export const Dashboard = () => {
    return (
        <DashboardStyled>
            <TopContentChallenge />
            <BottomContent/>
        </DashboardStyled>
    )
}



