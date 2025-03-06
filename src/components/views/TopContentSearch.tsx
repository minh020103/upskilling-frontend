import { Button, Dropdown, Menu, Row, Space, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { TopContentSearchProps } from '../../models/profile';
const { Title, Text } = Typography;
export const TopContentSearch = (props: TopContentSearchProps) => {
    const { routes, routeActive, title, onClickSearch, className, onSelectedLevel, onSelectedTime, dataLevel, dataTime } = props;
    const handleSearch = (value: string) => {
        if (onClickSearch != null) {
            onClickSearch(value);
        }
    };
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const handleMenLevelClick = (e: { key: any; }) => {
        setSelectedLevel(e.key);
        if (onSelectedLevel) {
            onSelectedLevel(e.key);
        }
    };
    const handleMenTimeClick = (e: { key: any; }) => {
        setSelectedTime(e.key);
        if (onSelectedTime) {
            onSelectedTime(e.key);
        }

    };
    
    const menuLevel = (
        <Menu style={{ maxHeight: 120, overflowY: 'auto' }}>
            {dataLevel&&dataLevel.map((item)=>(
                <Menu.Item key={item} onClick={handleMenLevelClick}>{item}</Menu.Item>
            ))}
        </Menu>
    );
    const menuTime = (
        <Menu style={{ maxHeight: 120, overflowY: 'auto' }}>
            {dataTime&&dataTime.map((item)=>(
                <Menu.Item key={item} onClick={handleMenTimeClick}>{item} minutes</Menu.Item>
            ))}
        </Menu>
    );
    return (
        <TopContent className={className ? className : ""}>
            {routeActive ?
                <>
                    {routes?.map(item => (
                        <Text className='route-disable'>{item} / </Text>
                    ))}
                    <Text className='route-active'>{routeActive}</Text>
                </>
                :
                <></>
            }
            <Title level={4} className="title-component">{title}</Title>
            {onClickSearch ?
                <Row className='form-search'>
                    <Space>
                        <SearchStyled
                            placeholder="Tìm kiếm..."
                            enterButton={<Button type='primary' className='buttom-search' >Search</Button>}
                            size="large"
                            onSearch={handleSearch}
                        />
                        {props.dataLevel || props.dataTime ? (
                            <>
                        <Dropdown overlay={menuLevel}>
                            <div onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {selectedLevel ? <>{selectedLevel}</> : <>Tag</>}
                                    <DownOutlined />
                                </Space>
                            </div>
                        </Dropdown>
                        <Dropdown overlay={menuTime}>
                            <div onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {selectedTime ? <>{selectedTime} minutes</> : <>Time</>}
                                    <DownOutlined />
                                </Space>
                            </div>
                        </Dropdown>
                        </>
                        ): ''}
                    </Space>
                </Row>
                :
                <></>
            }
        </TopContent>
    )
}
const TopContent = styled.div`
background: #fff;
padding: 24px 16px;
.route-disable{
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    text-align: left;
    color: #00000073;
}
.route-active{
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    text-align: left;
}
.title-component {
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    text-align: left;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}
.form-search{
    display: flex;
    align-items: center;
}
`;
const SearchStyled = styled(Search)(({ }) => ({
    borderRadius: 0,
    height: '40px',
    width: '522px',
    '& input': {
        borderRadius: '0',
    },
    '& button': {
        borderRadius: '0 !important',
    }
}));