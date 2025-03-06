import { Col, Layout } from 'antd';
import styled from 'styled-components';
import NavigationTop from './NavigationTop';
import { Route, Routes, useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import { Dashboard } from '../pages/user/dashboard/Dashboard';
import UserManagement from '../pages/user/user-management/UserManagement';
import Leaderboard from '../pages/user/Leaderboard';
import PerformanceAnalysis from '../pages/user/PerformanceAnalysis';
import Search from '../pages/user/Search';
import Profile from '../pages/user/profile/Profile';
import AvailableChallenges from '../pages/user/dashboard/AvailableChallenges';
import NameChallengePage from '../pages/user/dashboard/NameChallengePage';
import { CodeDeverlopment } from '../pages/user/dashboard/CodeDeverlopment';
import { InitialEvaluation } from '../pages/user/dashboard/InitialEvaluation';
import { ReviewCode } from '../pages/user/ReviewCode';
import { CompletedChallenge } from '../pages/user/dashboard/CompletedChallenge';
import { UserDetail } from '../pages/user/user-management/UserDetail';
import { Div } from '../styles/Div';
import { useEffect } from 'react';

const FormUser = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .content-right{
        overflow: auto;
        max-height: 100vh;
        padding-bottom: 20px;    
    }
    .content-right::-webkit-scrollbar {
        display: none;
    }
`;


const HomeNavAndSide = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        const contentRightElement = document.querySelector('.content-right');
        if (contentRightElement) {
            contentRightElement.scrollTo(0, 0);
        }
    }, [pathname]);
    return (
        <FormUser>
            <NavigationTop />
            <Layout>
                <SideBar/>
                <Layout className='content-right'>
                    <Div>
                        <Col>
                            <Routes>
                                <Route path="/" element={<Dashboard />}></Route>
                                <Route path="/dashboard" element={<Dashboard />}></Route>
                                <Route path="/dashboard/available-challenges" element={<AvailableChallenges />}></Route>
                                <Route path="/dashboard/available-challenges/:id" element={<NameChallengePage />}></Route>
                                <Route path="/dashboard/available-challenges/:id/code-deverlopment" element={<CodeDeverlopment />}></Route>
                                <Route path="/dashboard/available-challenges/:userChallengeStartId/initial-evaluation" element={<InitialEvaluation />}></Route>
                                <Route path="/dashboard/available-challenges/:peerReviewId/review" element={<ReviewCode />}></Route>
                                <Route path="/dashboard/available-challenges/:id/complated" element={<CompletedChallenge />}></Route>
                                <Route path="/user-management" element={<UserManagement />}></Route>
                                <Route path="/user-management/user-detail/:id" element={<UserDetail />}></Route>
                                <Route path="/leaderboard" element={<Leaderboard />}></Route>
                                <Route path="/performance-analysis" element={<PerformanceAnalysis />}></Route>
                                <Route path="/search" element={<Search />}></Route>
                                <Route path="/profile" element={<Profile />}></Route>
                            </Routes>
                        </Col>
                    </Div>
                </Layout>
            </Layout>
        </FormUser>
    );
};

export default HomeNavAndSide;