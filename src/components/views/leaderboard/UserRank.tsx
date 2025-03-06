import { Typography } from "antd";
import styled from "styled-components";
import { Div } from "../../styles/Div";
import { UserRankTable } from "./UserRankTable";
import { PageImpl } from "../../../models/PaginationModel";
import { UserInformationProps } from "../../../models/UserModel";

interface ContentUserInformationProps {
  loading: boolean;
  currentPage: number;
  itemNumberInPage:number;
  data: PageImpl<UserInformationProps>;
  onPageChange: (page: number, pageSize: number) => void;
}
export const UserRank = (props: ContentUserInformationProps) => {
    const { loading,data,currentPage, onPageChange,itemNumberInPage} = props;
  return (
    <UserRankStyled>
      <Typography className="title">
        Shopify API Integration Challenge
      </Typography>
      <UserRankTable
        data={data}
        loading={loading}
        currentPage={currentPage}
        itemNumberInPage={itemNumberInPage}
        onPageChange={onPageChange}
      />
    </UserRankStyled>
  );
};
const UserRankStyled = styled(Div)(({}) => ({
  margin: "24px",
  padding: "24px",
  background: "#fff",
  "& .title": {
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "28px",
    textAlign: "left",
  },
}));
