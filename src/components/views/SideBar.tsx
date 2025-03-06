import { Menu, Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { IconDashboard, IconLeaderboard, IconPerformanceAnalysis, IconUserManagement } from '../items/Icon';

const { Item } = Menu;
const { Sider } = Layout;
const SideBarStyled = styled.div(() => ({
    backgroundColor: '#ffffff',
    height: '100vh',
    boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
    zIndex: '1000',
    '& .ant-menu-item': {
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        textAlign: 'left',
        color: '#000000',
    },
    '& .ant-menu':{
        paddingTop: '5px',
        border: '0 !important',
    },
    '& .list-item-sidebar .ant-menu-item': {
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        textAlign: 'left',
        paddingLeft: '16px !important',
        borderRadius: '0',
        margin: '0',
        width: '100%',
    },
    '& .ant-menu-item-selected':{
        borderRight: '5px #1890FF solid'
    },
    '& .list-item-sidebar svg': {
        fill: '#000',
        marginRight: '10px',
    },
    '& .list-item-sidebar .ant-menu-item-selected': {
        color: '#1890FF',
        '& svg': {
            fill: '#1890FF',
        },
    },
}));


export default function SideBar() {
    const routes = [
        {
            route: "/user/dashboard",
            label: "Dashboard",
            icon: <IconDashboard />
        },
        {
            route: "/user/user-management",
            label: "User Management",
            icon: <IconUserManagement />
        },
        {
            route: "/user/leaderboard",
            label: "Leaderboard",
            icon: <IconLeaderboard />
        },
        {
            route: "/user/performance-analysis",
            label: "Performance Analysis",
            icon: <IconPerformanceAnalysis />
        }
    ];

    return (
        <SideBarStyled>
            <Sider>
                <Menu
                    className='list-item-sidebar'
                    mode="inline"
                    theme="light"
                    defaultSelectedKeys={['/user/dashboard']}
                >
                    {routes.map(item => (
                        <Item key={item.route} icon={item.icon} className="item-sidebar">
                            <NavLink to={item.route} className='link-custom'>
                                {item.label}
                            </NavLink>
                        </Item>
                    ))}
                </Menu>
            </Sider>
        </SideBarStyled>
    );
}
