import { Flex, Row, Spin } from "antd";
import styled from "styled-components";
import { ItemInformation } from "../../../items/dashboard/ItemInformation";
import { UserInfo } from "../../../items/user-management/UserInfo";
import { Div } from "../../../styles/Div";
import { TopContentSearch } from "../../../views/TopContentSearch";
import { TabCustom } from "../../../views/user-management/TabCustom";
import { UserInformationProps } from "../../../../models/UserModel";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailUser } from "../../../../services/UserService";
import { FailResponseModel } from "../../../../models/ResponseModel";
import { notifyErr } from "../../../../utils/notify";
import moment from "moment";
const initUser: UserInformationProps = {
  userId: 0,
  sumTotalScore: 0,
  totalChallenge: 0,
  userInformation: {
    id: 0,
    avatar: "",
    email: "",
    fullName: "",
    phone: "",
    position: "",
    address: "",
    createdAt: "",
    company: "",
  },
};
export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserInformationProps>(initUser);
  const [loading, setLoading] = useState<boolean>(true);
  if(id!= undefined){
  useEffect(() => {
    getDetailChallenge();
  }, []);
}
  const getDetailChallenge = async () => {
    setLoading(true);
    try {
      const resp = await getDetailUser(Number(id));
      if (resp.status == 200) {
        const success = resp.data as UserInformationProps;
        setUser(success);
      } else {
        const fail = resp.data as FailResponseModel;
        notifyErr(fail.errorMessage);
      }
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };
  return (
    <UserDetailStyled>
      <Spin spinning={loading}>
        <>
          <TopContentSearch
            routes={["First-level Menu", "Second-level Menu"]}
            routeActive={"Current Page"}
            onClickSearch={null}
            title={"User details"}
            className={"custom-top-content"}
            onSelectedLevel={null}
            onSelectedTime={null}
            dataLevel={null}
            dataTime={null}
          />
          <Flex className="user-info">
            <UserInfo
              image={user.userInformation.avatar}
              name={user.userInformation.fullName}
              position={user.userInformation.position}
              size={72}
              distance={24}
            />
            <Row className="area">
              <ItemInformation
                title="Total score"
                value={user.sumTotalScore? user.sumTotalScore.toLocaleString('en-US') : 0 + ''}
                color="#52C41A"
                className={"right"}
              />
              <ItemInformation
                title="Challenges"
                value={user.totalChallenge + ""}
                color="#000"
                className={"right"}
              />
              <ItemInformation
                title="Joined"
                value={moment(user.userInformation.createdAt).format("MMMM yyyy")}
                color="#000"
                className={"right"}
              />
            </Row>
          </Flex>
          <TabCustom 
             user={user}
          />
        </>
      </Spin>
    </UserDetailStyled>
  );
};
const UserDetailStyled = styled(Div)(({}) => ({
  "& .custom-top-content": {
    padding: "24px 16px 15px 16px",
    "& .title-component": {
      marginTop: "15px !important",
    },
  },
  "& .user-info": {
    padding: "0 16px",
    background: "#fff",
    justifyContent: "space-between",
    "& .area": {
      display: "flex",
      alignItems: "center",
      "& .right": {
        marginLeft: "64px",
        "& article": {
          textAlign: "right",
        },
      },
    },
  },
}));
