import styled from "styled-components";
import { Div } from "../../styles/Div";
import { UserRank } from "../../views/leaderboard/UserRank";
import { TopContentSearch } from "../../views/TopContentSearch";
import { useEffect, useState } from "react";
import { PageImpl } from "../../../models/PaginationModel";
import { UserInformationProps } from "../../../models/UserModel";
import { searchUser } from "../../../services/UserService";
import { FailResponseModel } from "../../../models/ResponseModel";

const itemNumberInPage = 6;
const initData: PageImpl<UserInformationProps> = {
  size: 0,
  totalElements: 0,
  totalPages: 0,
  content: [],
};
const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<PageImpl<UserInformationProps>>(initData);
  const [loading, setLoading] = useState<boolean>(true);
  const [keySearch, setKeySearch] = useState<string>("");
  const onClickSearch = (key: string) => {
    setKeySearch(key);
  };
  useEffect(() => {
    getData();
  }, [currentPage, keySearch]);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await searchUser(
        currentPage - 1,
        itemNumberInPage,
        keySearch
      );
      const { status, data } = response;
      if (status == 200) {
        const success = data as PageImpl<UserInformationProps>;

        setData(success);
      } else {
        const fail = data as FailResponseModel;
        alert(fail.errorMessage);
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };
  const onPageChange = (page: number, _: number) => {
    setCurrentPage(page);
  };

  return (
    <LeaderboardStyled>
      <TopContentSearch
        className={null}
        routes={["Dashboard", "Name challenge"]}
        routeActive={"Leaderboard"}
        title={"Leaderboard"}
        onClickSearch={onClickSearch}
      />
      {!loading && (
        <UserRank
          loading={loading}
          data={data}
          currentPage={currentPage}
          itemNumberInPage={itemNumberInPage}
          onPageChange={onPageChange}
        />
      )}
    </LeaderboardStyled>
  );
};
export default Leaderboard;
const LeaderboardStyled = styled(Div)(({}) => ({
  width: "100%",
}));
