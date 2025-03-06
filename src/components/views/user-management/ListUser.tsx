import { Col, Row, Typography } from "antd";
import styled from "styled-components";
import { PageCustom } from "../../items/custom-item/PageCustom";
import { ItemUser } from "../../items/user-management/ItemUser";
import { Div } from "../../styles/Div";
import { UserInformationProps } from "../../../models/UserModel";
import { PageImpl } from "../../../models/PaginationModel";

interface ContentUserInformationProps {
  loading: boolean;
  currentPage: number;
  data: PageImpl<UserInformationProps>;
  onPageChange: (page: number, pageSize: number) => void;
}
const itemNumberInPage = 6;
export const ListUser = (props: ContentUserInformationProps) => {
  const { loading, currentPage, data, onPageChange } = props;
  return (
    <ListUserStyled>
      <Typography>{data.totalElements} Users</Typography>
      <Row>
        {!loading ? (
          data && data.totalElements > 0 ? (
            data.content.map((item) => (
              <Col span={8} className="item-area" key={item.userId}>
                <ItemUser
                  userId={item.userId}
                  totalChallenge={item.totalChallenge}
                  sumTotalScore={item.sumTotalScore? item.sumTotalScore.toLocaleString('en-US'): item.sumTotalScore + 0}
                  userInformation={item.userInformation}
                />
              </Col>
            ))
          ) : (
            <></>
          )
        ) : (
          ""
        )}
      </Row>
      <PageCustom
        total={data.totalElements}
        currentPage={currentPage}
        itemNumberInPage={itemNumberInPage}
        onPageChange={onPageChange}
      />
    </ListUserStyled>
  );
};
const ListUserStyled = styled(Div)(({}) => ({
  margin: "24px",
  padding: "24px",
  background: "#fff",
  "& .item-area": {
    paddingRight: "24px",
    marginTop: "24px",
  },
}));
