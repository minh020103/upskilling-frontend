import { Avatar, Col, Row, Typography } from "antd";
import styled from "styled-components";
import { ItemUserRankProps } from "../../../models/leaderboard";
import { Div } from "../../styles/Div";

export const ItemUserRank = (props: ItemUserRankProps) => {
  const { avartar, userIsLogged, name, rank, total, time, dateCompleted } =
    props;
  return (
    <ItemUserRankStyled>
      <Row>
        <Col span={6}>
          <Row className="content-area">
            <Avatar className="avatar" src={avartar} />
            <Typography className="name">{name}</Typography>
          </Row>
        </Col>
        <Col span={3}>
          <Row className="content-area">
            <Typography
              className="rank"
              style={{
                background:
                  rank == 1 || rank == 2 || rank == 3 ? "#FA541C" : "#1890FF",
              }}
            >
              Hạng {rank}
            </Typography>
            {userIsLogged == true && (
              <Typography className="userIsLogged">You</Typography>
            )}
          </Row>
        </Col>

        <Col span={4}>
          <Row className="content-area">
            <Typography className="title">Total score</Typography>
            <Typography className="total">{total ? total.toLocaleString('en-US') : 0}</Typography>
          </Row>
        </Col>
        <Col span={5}>
          <Row className="content-area">
            <Typography className="title">Total challenge</Typography>
            <Typography className="time">{time}</Typography>
          </Row>
        </Col>
        <Col span={6}>
          <Row className="content-area">
            <Typography className="title">Joined on</Typography>
            <Typography className="date">{dateCompleted}</Typography>
          </Row>
        </Col>
      </Row>
    </ItemUserRankStyled>
  );
};
const ItemUserRankStyled = styled(Div)(({}) => ({
  padding: "24px 14px",
  border: "1px solid #0000000F",
  marginBottom: "16px",
  "& .content-area": {
    alignItems: "center",
    "& .avatar": {
      marginRight: "8px",
    },
    "& .name": {
      //styleName: H5/medium;
      fontFamily: "Roboto",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "24px",
      textAlign: "left",
      marginRight: "8px",
    },
    "& .rank": {
      color: "#fff",
      padding: "1px 8px",
    },
    "& .userIsLogged": {
      fontFamily: "Roboto",
      width: "40.6px",
      height: "23.6px",
      lineHeight: "20px",
      fontSize: "12px",
      padding: "1px 8px 1px 8px",
      fontWeight: "400",
      textAlign: "center",
      borderRadius: "2px 0px 0px 0px",
      border: "1px solid #FFBB96",
      color: "#FA541C",
      backgroundColor: "#FFF2E8",
      marginLeft: "8px",
    },
    "& .title": {
      fontFamily: "Roboto",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "22px",
      textAlign: "left",
      color: "#00000073",
      marginRight: "8px",
    },
    "& .total": {
      fontFamily: "Roboto",
      fontSize: "24px",
      fontWeight: "400",
      lineHeight: "28px",
      textAlign: "left",
      color: "#52C41A",
    },
    "& .time": {
      fontFamily: "Roboto",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "24px",
      textAlign: "left",
    },
    "& .date": {
      fontFamily: "Roboto",
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "24px",
      textAlign: "left",
    },
  },
}));
