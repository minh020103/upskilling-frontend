import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PeerReviewInfo } from "../../../models/review";
import {
  getDataPeerReviewService,
  markNotification,
} from "../../../services/ChallengeService";
import { Div } from "../../styles/Div";
import { ContentReview } from "../../views/ContentReview";
import { TopContentSearch } from "../../views/TopContentSearch";
export const ReviewCode = () => {
  const { peerReviewId } = useParams();
  const [data, setData] = useState<PeerReviewInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getDataPeerReviewService(Number(peerReviewId));
      if (res.status == 200) {
        const success = res.data as PeerReviewInfo;
        setData(success);
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [peerReviewId]);
  return (
    <Spin spinning={loading}>
      <ReviewCodeStyled>
        <TopContentSearch
          routes={["Dashboard", "Available challenges"]}
          routeActive={data?.userChallengeStart.challenge.title}
          onClickSearch={null}
          title={data?.userChallengeStart.challenge.title}
          className={null}
        />
        <ContentReview data={data} />
      </ReviewCodeStyled>
    </Spin>
  );
};
const ReviewCodeStyled = styled(Div)(({}) => ({}));
