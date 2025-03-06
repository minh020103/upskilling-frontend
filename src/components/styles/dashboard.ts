import styled from "styled-components";
import { ChallengeAndViewAll } from "../views/ChallengeAndViewAll";

const Div = styled.div``;
export const TopContentStyled = styled(Div)(({ }) => ({
    background: '#fff',
    padding: '24px 16px',
    '& .route-disable': {
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
        textAlign: 'left',
        color: '#00000073',
    },
    '& .route-active': {
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
        textAlign: 'left',
    },
    '& .title-component': {
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '28px',
        textAlign: 'left',
        marginTop: '8px !important',
    },
    '& .form-search': {
        display: 'flex',
        alignItems: 'center',
    }
}));
export const LineStyled = styled(Div)(({ }) => ({
    background: '#0000000F',
    height: '2px',
    width: '100%',
    marginTop: '40px',
    marginBottom: '24px',
}));
export const ChallengeAndViewAllCustom = styled(ChallengeAndViewAll)(({ }) => ({
    marginBottom: '24px',
    '& .custom-available-challenge-top': {
        minWidth: '282px',
        maxWidth: '282px',
    }
}));