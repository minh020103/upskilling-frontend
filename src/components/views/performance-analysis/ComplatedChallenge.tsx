import styled from "styled-components";
import { ItemCompletedChallenge } from "../../items/performance-analysis/ItemCompletedChallenge";
import { Div } from "../../styles/Div";
import { ChallengeAndViewAll } from "../ChallengeAndViewAll";
import { PageImpl } from "../../../models/PaginationModel";
import { ContentChallengeCompletedProps } from "../../../models/usermanagement";
interface ComplatedChallengeProp {
  data?: PageImpl<ContentChallengeCompletedProps>;
  onClickLeft: () => void;
  onClickRight: () => void;
  onClickViewAll: () => void;
  loading: boolean;
}
export const ComplatedChallenge = (props: ComplatedChallengeProp) => {
  const { data,loading, onClickLeft, onClickRight, onClickViewAll } = props;
  
  return (
    <ComplatedChallengeStyled>
      {!loading ? (
        data && data.totalElements > 0 ? (
          <ChallengeAndViewAll
            className={"custom-challenge-view-all"}
            title="Completed challenge"
            onClickLeft={onClickLeft}
            onClickRight={onClickRight}
            onClickViewAll={onClickViewAll}
            description={null}
            render={data?.content.map((item) => (
              <ItemCompletedChallenge
                className={"custom-item-complated"}
                imgItem={item.challenge.image}
                title={item.challenge.title}
                status={item.status}
                score={item.totalScore}
                complatedDate={item.completedDate + ""}
                id={item.id}
              />
            ))}
            loadMoreActive={"active"}
          />
        ) : (
          <></>
        )
      ) : (
        ""
      )}
    </ComplatedChallengeStyled>
  );
};
const ComplatedChallengeStyled = styled(Div)(({}) => ({
  marginTop: "24px",
  "& .custom-challenge-view-all": {
    "& .custom-item-complated": {
      maxWidth: "284px",
      minWidth: "284px",
    },
  },
}));
