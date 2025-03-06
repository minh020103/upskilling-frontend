import styled from "styled-components";
import { PageCustom } from "../../items/custom-item/PageCustom";
import { ItemUserRank } from "../../items/leaderboard/ItemUserRank";
import { Div } from "../../styles/Div";
import { PageImpl } from "../../../models/PaginationModel";
import { UserInformationProps } from "../../../models/UserModel";
import moment from "moment";

interface ContentUserRating {
  data: PageImpl<UserInformationProps>;
  currentPage: number;
  loading: boolean;
  itemNumberInPage: number;
  onPageChange: (page: number, pageSize: number) => void;
}
export const UserRankTable = (props: ContentUserRating) => {
  const { loading, data, currentPage, itemNumberInPage, onPageChange } = props;
  return (
    <UserRankTableStyled>
      {!loading ? (
        data && data.totalElements > 0 ? (
          data?.content.map((item, index) => (
            <ItemUserRank
              avartar={item.userInformation.avatar}
              name={item.userInformation.fullName}
              rank={(currentPage *itemNumberInPage) - itemNumberInPage + index + 1}
              total={item.sumTotalScore}
              time={item.totalChallenge ? item.totalChallenge : 0}
              dateCompleted={moment(item.userInformation.createdAt).format("DD/MM/YY")}
              userIsLogged={item.userIsLogged ? item.userIsLogged : false}
            />
          ))
        ) : (
          <></>
        )
      ) : (
        ""
      )}
      <PageCustom
        total={data.totalElements}
        currentPage={currentPage}
        itemNumberInPage={itemNumberInPage}
        onPageChange={onPageChange}
      />
    </UserRankTableStyled>
  );
};
const UserRankTableStyled = styled(Div)(({}) => ({
  marginTop: "24px",
}));
