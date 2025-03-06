import { Col, Flex, Row, Spin, Typography } from "antd";
import styled from "styled-components"
import { Div } from "../../styles/Div"
import { ModalCalender } from "../../items/performance-analysis/ModalCalender";
import { ItemProgressionOverTime } from "../../items/performance-analysis/ItemProgressionOverTime";
import { useEffect, useState } from "react";
import { getDataChartByUserService, getDataChartMyUserService } from "../../../services/ChallengeService";
import { useParams } from "react-router-dom";
import moment from "moment";
import { DataChartBySkill } from "../../../models/performance-analysis";

export const ProgressionOverTime = () => {
    const { id } = useParams();
    const [dataChart, setDataChart] = useState<DataChartBySkill[]>();
    const [loadingChart, setLoadingChart] = useState<boolean>(true);
    const [date, setDate] = useState<string>(moment(Date()).format("yyyy-MM-DD hh:mm:ss"));
    const getDataChart = async () => {
        setLoadingChart(true);
        try {
            if (id != undefined) {
                const response = await getDataChartByUserService(
                    Number(id),
                    date + ""
                );
                if (response.status == 200) {
                    setDataChart(response.data as DataChartBySkill[]);
                }
            } else {
                const response = await getDataChartMyUserService(
                    date + ""
                );
                if (response.status == 200) {
                    setDataChart(response.data as DataChartBySkill[]);
                }
            }
        } catch (error) {
            alert(error);
        }
        setLoadingChart(false);
    };
    useEffect(() => {
        getDataChart();
    }, [date])

    return (
        <ProgressionOverTimeStyled>
            <Flex className="content-top">
                <Typography className="title">Your skill progression over time</Typography>

                <ModalCalender
                    date={date}
                    setDate={setDate} />
            </Flex>
            <Spin spinning={loadingChart}>
                <Row className="content">
                    {dataChart?.map((item) => (

                        <Col span={8}>
                            <ItemProgressionOverTime
                                title={item.skillName}
                                numberBig={item.totalScoreBySkill}
                                data={item.data} />
                        </Col>
                    ))}
                </Row>
            </Spin>
        </ProgressionOverTimeStyled>
    )
}
const ProgressionOverTimeStyled = styled(Div)(({ }) => ({
    marginTop: '24px',
    padding: '24px',
    background: '#fff',
    '& .content-top': {
        justifyContent: 'space-between',
        '& .title': {
            fontFamily: 'Roboto',
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '28px',
            textAlign: 'left',
        }
    },
    '& .content': {
        marginTop: '5px'
    }
}));